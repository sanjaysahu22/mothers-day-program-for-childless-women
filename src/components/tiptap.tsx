import React, { useCallback, useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import DOMPurify from "dompurify";
import {
  AlignCenter, AlignJustify, AlignLeft, AlignRight,
  Bold, Italic, Link2, Link2Off, List, ListOrdered, 
  Images, PenLine, ChevronDown, ChevronUp
} from "lucide-react";

// Import all necessary Tiptap extensions
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import ListItem from "@tiptap/extension-list-item";
import Link from "@tiptap/extension-link";
import TextStyle from '@tiptap/extension-text-style';
import Color from "@tiptap/extension-color";
import Image from "@tiptap/extension-image";
import Highlight from "@tiptap/extension-highlight";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";

import Saveblog from "./save";
import { Button } from "@/components/ui/button";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

// Define extensions with consistent configuration
const extensions = [
  StarterKit.configure({}),
  Underline,
  TextAlign.configure({
    types: ["heading", "paragraph"],
    alignments: ["left", "center", "right", "justify"],
  }),
  ListItem,
  BulletList,
  OrderedList,
  Highlight,
  TextStyle,
  Link.configure({
    openOnClick: true,
    autolink: true,
    defaultProtocol: 'https',
  }),
  Image.configure({
    HTMLAttributes: {
      class: "mx-auto max-h-[30rem] w-full max-w-[90%] object-contain", 
    }
  }),
  Color
];

// Utility function to get button active state
const getActiveClass = (isActive: boolean) => 
  `p-1 rounded-lg transition-colors ${
    isActive ? "bg-primary text-primary-foreground" : "bg-secondary hover:bg-secondary/80"
  }`;

export default function Editors() {
  const [isFocused, setIsFocused] = useState(false);
  const [isToolbarExpanded, setIsToolbarExpanded] = useState(false);

  // Create editor instance
  const editor = useEditor({
    extensions,
    content: "",
    onUpdate: ({ editor }) => {
      setIsFocused(editor.isFocused);
    },
  });

  // Prevent render if editor is not ready
  if (!editor) return null;

  // Image addition handler
  const addImage = useCallback(() => {
    const url = window.prompt('Enter image URL');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  // HTML generation and sanitization
  const generateHtml = useCallback(() => {
    const rawHtml = editor.getHTML();
    const sanitizedHtml = DOMPurify.sanitize(rawHtml);
    console.log("Sanitized HTML:", sanitizedHtml);
    return sanitizedHtml;
  }, [editor]);

  // Link setting handler
  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('Enter URL', previousUrl);

    if (url === null) return;
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  }, [editor]);

  // Render toolbar buttons with tooltips
  const renderToolbarButton = (
    icon: React.ReactNode, 
    onClick: () => void, 
    isActive?: boolean, 
    tooltip?: string,
    disabled?: boolean
  ) => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClick}
            disabled={disabled}
            className={getActiveClass(!!isActive)}
          >
            {icon}
          </Button>
        </TooltipTrigger>
        <TooltipContent>{tooltip}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );

  return (
    <div className="relative w-full">
      {/* Responsive Toolbar */}
      <div className="flex flex-col w-full">
        {/* Mobile/Responsive Toolbar Toggle */}
        <div className="flex justify-center md:hidden mb-2">
          <Button 
            variant="outline" 
            onClick={() => setIsToolbarExpanded(!isToolbarExpanded)}
            className="flex items-center gap-2"
          >
            {isToolbarExpanded ? (
              <>Close Toolbar <ChevronUp /></>
            ) : (
              <>Open Toolbar <ChevronDown /></>
            )}
          </Button>
        </div>

        {/* Toolbar Container */}
        <div className={`
          w-full overflow-x-auto 
          ${isToolbarExpanded ? 'block' : 'hidden md:block'}
        `}>
          <div className="flex items-center justify-center gap-2 p-2 bg-secondary/10 rounded-lg flex-wrap">
            {/* Formatting Buttons */}
            {renderToolbarButton(
              <Bold />, 
              () => editor.chain().focus().toggleBold().run(), 
              editor.isActive("bold"),
              "Bold",
              !editor.can().chain().focus().toggleBold().run()
            )}

            {renderToolbarButton(
              <Italic />, 
              () => editor.chain().focus().toggleItalic().run(), 
              editor.isActive("italic"),
              "Italic"
            )}

            {renderToolbarButton(
              <PenLine />, 
              () => editor.chain().focus().toggleUnderline().run(), 
              editor.isActive("underline"),
              "Underline"
            )}

            {/* Color Picker */}
            <input
              type="color"
              onChange={(e) => editor.chain().focus().setColor(e.target.value).run()}
              value={editor.getAttributes('textStyle').color || '#000000'}
              className="w-10 h-10 p-1 rounded-full border"
              title="Text Color"
            />

            {/* Link Buttons */}
            {renderToolbarButton(
              <Link2 />, 
              setLink, 
              editor.isActive("link"),
              "Add Link"
            )}

            {renderToolbarButton(
              <Link2Off />, 
              () => editor.chain().focus().unsetLink().run(), 
              false,
              "Remove Link"
            )}

            {/* Image Button */}
            {renderToolbarButton(
              <Images />, 
              addImage, 
              false,
              "Add Image"
            )}

            {/* Alignment Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <AlignCenter />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem 
                  onClick={() => editor.chain().focus().setTextAlign("left").run()}
                >
                  <AlignLeft className="mr-2" /> Left
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => editor.chain().focus().setTextAlign("center").run()}
                >
                  <AlignCenter className="mr-2" /> Center
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => editor.chain().focus().setTextAlign("right").run()}
                >
                  <AlignRight className="mr-2" /> Right
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => editor.chain().focus().setTextAlign("justify").run()}
                >
                  <AlignJustify className="mr-2" /> Justify
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* List Buttons */}
            {renderToolbarButton(
              <List />, 
              () => editor.chain().focus().toggleBulletList().run(), 
              editor.isActive("bulletList"),
              "Bullet List"
            )}

            {renderToolbarButton(
              <ListOrdered />, 
              () => editor.chain().focus().toggleOrderedList().run(), 
              editor.isActive("orderedList"),
              "Ordered List"
            )}

            {/* Save Button */}
            <Saveblog generateHtml={() => generateHtml()} />
          </div>
        </div>
      </div>

      {/* Editor Content */}
      <div className="relative mt-4">
        {!isFocused && editor.getText().trim() === "" && (
          <div className="absolute top-4 left-4 text-muted-foreground pointer-events-none">
            Start creating something new...
          </div>
        )}

        <EditorContent
          editor={editor}
          className="p-4 min-h-[300px] border rounded-lg"
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            if (editor.getHTML() === "<p></p>") {
              setIsFocused(false);
            }
          }}
        />
      </div>
    </div>
  );
}
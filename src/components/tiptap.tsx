import React, { useCallback, useEffect, useRef, useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import DOMPurify from "dompurify";
import {
  AlignCenter, AlignJustify, AlignLeft, AlignRight,
  Bold, Italic, Link2, Link2Off, List, ListOrdered, 
  Images, PenLine, ChevronDown, ChevronUp, Type
} from "lucide-react";
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
import FontFamily from '@tiptap/extension-font-family';
import Placeholder from '@tiptap/extension-placeholder';
import Saveblog from "./save";
import { Button } from "@/components/ui/button";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";
import Heading from '@tiptap/extension-heading'
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

// Define extensions with consistent configuration
const extensions = [
  StarterKit.configure({}),  // Includes Document, Paragraph, and Text by default
  Placeholder.configure({
          emptyEditorClass: "min-h-[300px]",
  }),
  Underline,
  TextAlign.configure({
    types: ["heading", "paragraph"],
    alignments: ["left", "center", "right", "justify"],
  }),
  ListItem,
  Heading.configure({
    levels: [1, 2, 3 , 4 ,5 ,6],
  }),
  BulletList,
  OrderedList,
  Highlight,
  TextStyle,
  Link.configure({
    openOnClick: true,
    autolink: true,
    defaultProtocol: "https",
  }),
  Image.configure({
    HTMLAttributes: {
      class: "mx-auto max-h-[30rem] w-full max-w-[90%] object-contain",
    },
  }),
  Color,
  FontFamily.configure({
    types: ["textStyle"],
  }),
];

// Utility function to get button active state
const getActiveClass = (isActive: boolean) => 
  `p-1 rounded-lg transition-colors ${
    isActive ? "bg-secondary/10 text-black " : " hover:bg-secondary/80"
  }`;

// Font options
const fontOptions = [
  { name: 'Default', value: 'Inter, sans-serif' },
  { name: 'Serif', value: 'Georgia, serif' },
  { name: 'Monospace', value: 'Consolas, monospace' },
  { name: 'Comic Sans', value: 'Comic Sans MS, cursive' },
  { name: 'Arial', value: 'Arial, sans-serif' },
  { name: 'Times New Roman', value: 'Times New Roman, serif' },
];

// Text size options with proper CSS values
const textSizeOptions = [
  { name: 'Small', value: '12px' },
  { name: 'Normal', value: '16px' },
  { name: 'Medium', value: '20px' },
  { name: 'Large', value: '24px' },
  { name: 'Extra Large', value: '32px' },
];

export default function Editors() {
  const [isFocused, setIsFocused] = useState(false);
  const [isToolbarExpanded, setIsToolbarExpanded] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);  
  // Create editor instance
  const editor = useEditor({
    extensions,
    content: "",
    onUpdate: ({ editor }) => {
      setIsFocused(editor.isFocused);
    },
    
  });
  useEffect(() => {
    if (editor) {
      editor.commands.focus(); // Automatically focuses on mount
    }
  }, [editor]);
  
  // Prevent render if editor is not ready
  if (!editor) return null;


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

  // Image addition handler
  const addImage = useCallback(() => {
    if (!editor) return;
    
    // Open file input dialog
    fileInputRef.current?.click();
  }, [editor]);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!editor || !event.target.files || event.target.files.length === 0) return;
    
    const file = event.target.files[0];
    const reader = new FileReader();
    
    reader.onload = (e) => {
      if (e.target?.result && typeof e.target.result === 'string') {
        editor.chain().focus().setImage({ src: e.target.result }).run();
      }
    };
    
    reader.readAsDataURL(file);
    
    // Reset file input so the same file can be selected again
    event.target.value = '';
  };

  return (
    <div className="relative w-full">
      <div className="flex flex-col w-full">
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
            {/* Heading Dropdown */}
            <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="mr-2">
              <Type />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem
              onClick={() => editor.chain().focus().setParagraph().run()}
              className={editor.isActive('paragraph') ? 'bg-primary/20' : ''}
            >
              Paragraph
            </DropdownMenuItem>
            {[1, 2, 3, 4, 5, 6].map(level => (
              <DropdownMenuItem
                key={level}
                onClick={() => editor.chain().focus().toggleHeading({ level: level as 1 | 2 | 3 | 4 | 5 | 6 }).run()}
                className={editor.isActive('heading', { level }) ? 'bg-primary/20' : ''}
              >
                Heading {level}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

            {/* Font Family Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-sm font-medium flex gap-2 h-10 px-3">
                  Font <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {fontOptions.map((font) => (
                  <DropdownMenuItem 
                    key={font.value}
                    onClick={() => {
                      // Set font family with the extension
                      editor.chain().focus().setFontFamily(font.value).run();
                    }}
                    style={{ fontFamily: font.value }}
                    className={editor.isActive('textStyle', { fontFamily: font.value }) ? 'bg-primary/20' : ''}
                  >
                    {font.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Font Size Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-sm font-medium flex gap-2 h-10 px-3">
                  Size <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {textSizeOptions.map((size) => (
                  <DropdownMenuItem 
                    key={size.value}
                    onClick={() => {
                      // Apply fontSize using inline CSS through the HTML attribute
                      editor.chain().focus().setMark('textStyle', { fontSize: size.value }).run();
                    }}
                    style={{ fontSize: size.value }}
                  >
                    {size.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

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
          <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
      />
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
          className="min-h-[400px] border rounded-lg p-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
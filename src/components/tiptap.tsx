import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Italic,
  Link2,
  Link2Off,
  List,
  ListOrdered,
  NotepadText,
  PenLine,
} from "lucide-react";
import {  useCallback, useState } from "react";
import Underline from "@tiptap/extension-underline";
import Text from "@tiptap/extension-text";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import TextAlign from "@tiptap/extension-text-align";
import ListItem from "@tiptap/extension-list-item";
import Link from "@tiptap/extension-link";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";

const extensions = [
  StarterKit,
  Underline,
  TextAlign.configure({
    types: ["heading", "paragraph"],
    alignments: ["left", "center", "right", "justify"],
  }),
  ListItem,
  BulletList,
  OrderedList,
  Document,
  Paragraph,
  Text,
  Link.configure({
    openOnClick: true,
    autolink: true,
    defaultProtocol: 'https',
  }),
];

function Editors() {
  const [isFocused, setIsFocused] = useState(false);
  const [url , seturl] = useState<string>(" ");

  
  const editor  = useEditor({
    extensions: extensions,
    content: "",
    onUpdate: ({ editor }) => {
      setIsFocused(editor.isFocused);
    },
  });
  if (!editor) {
    return null;
  }


 
  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes('link').href
    const url = window.prompt('URL', previousUrl)

    // cancelled
    if (url === null) {
      return
    }

    // empty
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink()
        .run()

      return
    }

    // update link
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
      const isLinkActive = editor.isActive('link');
      if (isLinkActive) {
        console.log("Text is successfully converted into a link!");
      } else {
        console.log("Failed to convert text into a link.");
      }
  }, [editor])


  
  return (
    <div className="relative">
      <div className="bg-zinc-200 p-2 flex gap-2">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={`p-1 rounded-lg ${
            editor.isActive("bold") ? "bg-[#8642CB] text-white" : "bg-white"
          }`}
        >
          <Bold />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={`p-1 rounded-lg ${
            editor.isActive("italic") ? "bg-[#8642CB] text-white" : "bg-white"
          }`}
        >
          <Italic />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          disabled={!editor.can().chain().focus().toggleUnderline().run()}
          className={`p-1 rounded-lg ${
            editor.isActive("underline")
              ? "bg-[#8642CB] text-white"
              : "bg-white"
          }`}
        >
          <PenLine />
        </button>
        
        <button onClick={setLink} className={`p-1 rounded-lg ${
            editor.isActive("link")
              ? "bg-[#8642CB] text-white"
              : "bg-white"
          }`}>
            <Link2 />
          </button>
          <button
            onClick={() => editor.chain().focus().unsetLink().run()}
            className={`p-1 rounded-lg ${
              editor.isActive("link ")
                ? "bg-[#8642CB] text-white"
                : "bg-white"
            }`}
          >
           <Link2Off />
          </button>
        <button
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={`p-1 rounded-lg ${
            editor.isActive("paragraph")
              ? "bg-[#8642CB] text-white"
              : "bg-white"
          }`}
        >
          <NotepadText />
        </button>

        {/* Alignment buttons */}
        <button
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          disabled={!editor.can().chain().focus().setTextAlign("center").run()}
          className={`p-1 rounded-lg ${
            editor.isActive({ textAlign: "center" })
              ? "bg-[#8642CB] text-white"
              : "bg-white"
          }`}
        >
          <AlignCenter />
        </button>

        <button
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          disabled={!editor.can().chain().focus().setTextAlign("right").run()}
          className={`p-1 rounded-lg ${
            editor.isActive({ textAlign: "right" })
              ? "bg-[#8642CB] text-white"
              : "bg-white"
          }`}
        >
          <AlignRight />
        </button>

        <button
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          disabled={!editor.can().chain().focus().setTextAlign("left").run()}
          className={`p-1 rounded-lg ${
            editor.isActive({ textAlign: "left" })
              ? "bg-[#8642CB] text-white"
              : "bg-white"
          }`}
        >
          <AlignLeft />
        </button>

        <button
          onClick={() => editor.chain().focus().setTextAlign("justify").run()}
          disabled={!editor.can().chain().focus().setTextAlign("justify").run()}
          className={`p-1 rounded-lg ${
            editor.isActive({ textAlign: "justify" })
              ? "bg-[#8642CB] text-white"
              : "bg-white"
          }`}
        >
          <AlignJustify />
        </button>

        {/* List Buttons */}
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-1 rounded-lg ${
            editor.isActive("bulletList")
              ? "bg-[#8642CB] text-white"
              : "bg-white"
          }`}
        >
          <List />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-1 rounded-lg ${
            editor.isActive("orderedList")
              ? "bg-[#8642CB] text-white"
              : "bg-white"
          }`}
        >
          <ListOrdered />
        </button>
      </div>

      {!isFocused && editor.getHTML() === "<p></p>" && (
        <div className="absolute top-12 left-2 text-gray-500 pointer-events-none">
          Start typing something new...
        </div>
      )}

      <EditorContent
        editor={editor}
        onFocus={() => setIsFocused(true)}
        onBlur={() => {
          if (editor.getHTML() === "<p></p>") {
            setIsFocused(false);
          }
        }}
      />
    </div>
  );
}

export default Editors;

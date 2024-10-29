import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Bold, Italic } from "lucide-react";
import { useState } from "react";

const extensions = [StarterKit];

function Editors() {
  const [isFocused, setIsFocused] = useState(false);
  const [selectedHeading, setSelectedHeading] = useState<string>("");

  const editor = useEditor({
    extensions,
    content: "",
    onUpdate: ({ editor }) => {
      setIsFocused(editor.isFocused);
    },
  });

  if (!editor) {
    return null;
  }
  

  const handleHeadingChange = (level:any ) => {
    editor.chain().focus().toggleHeading({ level }).run();
    setSelectedHeading(`Heading ${level}`);
  };

  return (
    <div className="relative">
      <div className="bg-zinc-200 p-2 flex gap-2">
        <select
          onChange={(e) =>
            handleHeadingChange(parseInt(e.target.value) as 1 | 2 | 3 | 4 | 5 | 6)
          }
          value={selectedHeading}
          className="p-1 rounded-md border bg-white"
        >
          <option value="">Heading</option>
          <option value="1">Heading 1</option>
          <option value="2">Heading 2</option>
          <option value="3">Heading 3</option>
          <option value="4">Heading 4</option>
          <option value="5">Heading 5</option>
          <option value="6">Heading 6</option>
        </select>

        {/* Bold button */}
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={`p-1 rounded-lg ${
            editor.isActive("bold") ? "bg-[#8642CB] text-white" : "bg-white"
          }`}
        >
          <Bold />
        </button>

        {/* Italic button */}
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={`p-1 rounded-lg ${
            editor.isActive("italic") ? "bg-[#8642CB] text-white" : "bg-white"
          }`}
        >
          <Italic />
        </button>
      </div>

      {/* Placeholder text when editor is empty */}
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
        className="border mt-2 p-2"
      />
    </div>
  );
}

export default Editors;

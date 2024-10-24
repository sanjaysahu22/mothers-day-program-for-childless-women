import Header from "@/components/header";
import { useRef, useState, useEffect } from "react";
import ReactQuill, { Quill } from "react-quill";
import 'react-quill/dist/quill.snow.css';

// Import Delta from Quill
const Delta = Quill.import('delta');

export default function Create() {
  const quillRef = useRef<any>(null);
  
  // Default content using Delta
  const defaultDelta = new Delta()
    .insert('Hello from Delta!\n')
    .insert('This is an example of default content with Delta.\n', { bold: true })
    .insert({ image: 'https://via.placeholder.com/150' })
    .insert('\n');

  const [editorHtml, setEditorHtml] = useState('');

  useEffect(() => {
    if (quillRef.current) {
      const editor = quillRef.current.getEditor();
      editor.setContents(defaultDelta); // Set the content in the editor using Delta
    }
  }, [quillRef]);

  const handleSave = () => {
    if (quillRef.current) {
      const editor = quillRef.current.getEditor();
      const deltaContent = editor.getContents(); // Get content as Delta
      console.log('Delta:', deltaContent);
      const htmlContent = editor.root.innerHTML; // Get content as HTML
      setEditorHtml(htmlContent);
      console.log('HTML:', htmlContent);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-100 flex flex-col">
      <Header />
      <div className="w-2/3 pt-20 bg-white h-screen items-center m-auto">
        <ReactQuill
          ref={quillRef}
          theme="snow"
          value={editorHtml} 
          onChange={setEditorHtml}
          style={{ height: '80vh' }} 
        />
        <button onClick={handleSave}>Save Content</button>       
      </div>
    </div>
  );
}

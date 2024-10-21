import Header from "@/components/header"
import { useRef, useState } from "react";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css'
export default function Create() {

    const [editorHtml, setEditorHtml] = useState('');
    const quillRef = useRef(null);
    const handleSave = () => {
      const htmlContent:any= quillRef.current;
      const x=htmlContent.editor.root.innerHTML;    
      setEditorHtml(x);
      console.log(x);  
    };
    
  return (
    <div className="min-h-screen bg-zinc-100 flex flex-col">
      <Header />
      <div className="w-2/3 pt-20 bg-white h-screen items-center m-auto">
      <ReactQuill ref={quillRef} theme="snow" />
      <button onClick={handleSave}>Save Content</button>
      <div>
        <h3>HTML Content:</h3>
        <div dangerouslySetInnerHTML={{ __html: editorHtml }}></div>
      </div>
        <div className="text-4xl font-light scale-x-90">+ ADD TITLE</div>
        <div className="mt-4 ml-16 font-semibold text-xl">
          Description:
          <div>Eg: 
          <span className=" font-normal  ml-2 break-words">
            Another day, another, "Is Google going to kill Flutter post?" It's almost comical at this point
          </span>
          </div>
        </div>
        <div className="mt-4 ml-16 font-semibold ">
          Subject:
          <div>Eg: 
          <span className=" font-normal  ml-2 break-words">
            Another day, another, "Is Google going to kill Flutter post?" It's almost comical at this point
          </span>
          </div>
        </div>
      </div>
    </div>
  );
}

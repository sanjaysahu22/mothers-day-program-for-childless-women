import Header from "@/components/header";
import Editor from "@/components/tiptap";
export default function Create() {
  return (
    <div className="min-h-screen bg-zinc-100 flex flex-col">
      <Header />
      <div className="w-2/3 pt-20 bg-white h-screen items-center m-auto">
      <Editor />
      </div>
     
    </div>
  );
}

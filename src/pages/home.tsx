import Blog from "@/components/blog";
import Navbar from "@/components/navbar";
import Suggest from "@/components/suggest";

const Home = () => {
  return (
    <div className="flex bg-zinc-300 h-screen justify-between gap-10  ">
    
      <div className="w-[30%]">
        < Suggest/>
      </div>
      <div className="flex flex-col w-3/5  gap-2 mt-2  ">
        <Blog  />
        <Blog  />
        <Blog  />
        
      </div>
      <div className=" w-[15%] bg-white flex flex-row-reverse">
            <Navbar />        </div>
    </div>
  );
};

export default Home;

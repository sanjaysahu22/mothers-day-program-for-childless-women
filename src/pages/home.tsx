import Blog from "@/components/blog";
import Navbar from "@/components/navbar";

const Home = () => {
  return (
    <div className="flex">
      {/* Sidebar with fixed Navbar */}
      <div className="w-1/5">
        <Navbar />
      </div>
      {/* Blog list */}
      <div className="flex flex-col w-4/5 gap-4 pl-2 ">
        <Blog />
        
      </div>
    </div>
  );
};

export default Home;

import Blog from "@/components/blog";
import Navbar from "@/components/navbar";

const Home = () => {
  return (
    <div className="flex">
      <Navbar />
      <div className="flex-col align-center justify-center ">
        <Blog />
        <Blog />
        <Blog />
      </div>
    </div>
  );
};
export default Home;

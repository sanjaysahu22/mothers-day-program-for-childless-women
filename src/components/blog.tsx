import AxiosInstance from "@/utils/axios";
import { useState } from "react";

const Blog = () => {
  let title = "this is the blog title to check the limit ";
  title = title.toUpperCase();
  const [state, setstate] = useState(null);

  const loadblog = () => {
    console.log("props");
    
  };

  return (
    <div className="h-[40%] rounded-lg w-full p-3 bg-white">
      <div
        className="font-normal text-[2em] pl-3  w-2/3 max-h-[35%]  leading-8 "
        style={{
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        }}
      >
        Google Doesn't Appreciate Flutter
      </div>
      <div className="text-xl w-2/3 pt-2 pl-3">
        Another day, another, “Is Google going to kill Flutter post?” It’s
        almost comical at this point:
      </div>
      <div className="flex gap-5 items-center">
        <div className="h-12 w-12 rounded-[50%] bg-blue-300 ml-3 mt-3"></div>
        <div>Andrew Zuo</div>
      </div>
      <div className="flex w-2/3 justify-around mt-3">
        <div>Published On: 6th june  ,2024</div>
        <div>Likes : 100k</div>
        <div>Comments : 100k</div>
      </div>
    </div>
  );
};

export default Blog;

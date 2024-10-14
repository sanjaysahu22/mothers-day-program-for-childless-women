const Blog = () => {
  let title = "this is the blog title to check the limit ";
  title = title.toUpperCase();

  const loadblog =()=>{

  }

  return (
    <div className="min-h-[25%] w-full p-1 flex-col bg-zinc-200 flex rounded-md  justify-center ">
      <div className="text-l  text-black font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
       <span className="text-zinc-400">title :</span> {title.length >  50? title.slice(0, 50  ) : title}
     </div>
      <div className="text-black p-1">
       

        <button onClick={loadblog} ></button>
      </div>
    </div>
  );
};

export default Blog;

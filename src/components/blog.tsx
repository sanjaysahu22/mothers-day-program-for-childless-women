const Blog = () => {
    let title = "this is the blog title to check the limit";
    title = title.toUpperCase();
  
    return (
      <div className="max-h-[25%] w-3/4 bg-sky-100 flex flex-col m-auto justify-center"> 
        <div className="text-[2em] text-black font-bold " style={{ fontFamily: "'Playfair Display', serif" }}>
          {title.length > 20 ? title.slice(0, 28) : title}
        </div>
        <div className="text-black p-1">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi obcaecati
          iure vero impedit. Dolorem, odio iusto unde placeat officiis odit
          doloribus dolores expedita ab perspiciatis temporibus vel sit nihil!
          Quas. Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi obcaecati
          iure vero impedit. Dolorem, odio iusto unde placeat officiis odit
          doloribus dolores expedita ab perspiciatis temporibus vel sit nihil!
          Quas. Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi obcaecati
          iure vero impedit. Dolorem, odio iusto unde placeat officiis odit
          doloribus dolores expedita ab perspiciatis temporibus vel sit nihil!
          Quas.     
        </div>
      </div>
    );
  };
  
  export default Blog;
  
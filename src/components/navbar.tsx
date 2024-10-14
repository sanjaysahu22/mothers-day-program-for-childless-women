const Navbar = () => {
    return (
      <div className="h-screen w-1/5 bg-blue-100 fixed flex justify-between flex-col">
        <div className="flex flex-col p-10 gap-6">
          <div>Blogs of yours</div>
          <div>Types of blogging</div>
          <div>Create blogs</div>
          <div>All comments</div>
          <div>Random blogs</div>
        </div>
        <div className="pb-10 pl-10">Profile page</div>
      </div>
    );
  };
  
  export default Navbar;
  
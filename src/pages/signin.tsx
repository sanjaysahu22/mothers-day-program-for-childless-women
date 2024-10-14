import Auth from "@/components/auth";
import Quote from "@/components/quote";

const Signin = () => {
  return (
    <div className="flex flex-col md:flex-row h-screen fixed bg-zinc-200 w-full">
      {/* Auth Section */}
      <div className="flex w-full md:w-1/2 justify-center  items-center">
        <Auth type="signin" />
      </div>
      
      {/* Quote Section: Hidden on small screens */}
      <div className="hidden md:flex w-1/2 h-5/6 justify-center items-center">
        <Quote />
      </div>
    </div>
  );
};

export default Signin;

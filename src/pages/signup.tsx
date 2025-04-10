import Auth from "@/components/auth";

const Signup = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-zinc-200 overflow-hidden">
      <div className="flex w-full md:w-1/2 justify-center items-center p-4 md:p-0">
        <Auth type="signup" />
      </div>
      
       </div>
  );
};

export default Signup;
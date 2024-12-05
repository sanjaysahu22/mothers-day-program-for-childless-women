import { BrowserRouter ,Route ,Routes } from "react-router-dom";
import Signin from "@/pages/signin";
import Signup from "@/pages/signup";
import Home   from  "@/pages/home"
import Blog from "@/pages/blog";
import Create from "@/pages/create";
import { Profile } from "@/pages/profile";
import Myblogs from "@/pages/myblogs";

const Routers = () => {
    return (
        <>
          <BrowserRouter>
            <Routes>
              <Route path="/signup" element={<Signup />} />
              <Route path="/signin" element={<Signin />} />
              <Route path="/home" element={<Home />} />
              <Route path="/create" element={<Create />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/blog/:id" element={<Blog />} />
              <Route path="/myblogs" element={<Myblogs />} /> 
            </Routes>
          </BrowserRouter>
        </>
      );
};
export default Routers
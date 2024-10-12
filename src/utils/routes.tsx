import { BrowserRouter ,Route ,Routes } from "react-router-dom";
import Signin from "@/pages/signin";
import Signup from "@/pages/signup";
import Home   from  "@/pages/home"

const Routers = () => {
    return (
        <>
          <BrowserRouter>
            <Routes>
              <Route path="/signup" element={<Signup />} />
              <Route path="/signin" element={<Signin />} />
              <Route path="/home" element={<Home />} />
            </Routes>
          </BrowserRouter>
        </>
      );
};
export default Routers
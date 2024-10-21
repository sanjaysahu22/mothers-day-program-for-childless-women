import { BrowserRouter ,Route ,Routes } from "react-router-dom";
import Signin from "@/pages/signin";
import Signup from "@/pages/signup";
import Home   from  "@/pages/home"
import Create from "@/pages/create";

const Routers = () => {
    return (
        <>
          <BrowserRouter>
            <Routes>
              <Route path="/signup" element={<Signup />} />
              <Route path="/signin" element={<Signin />} />
              <Route path="/home" element={<Home />} />
              <Route path="/create" element={<Create />} />
            </Routes>
          </BrowserRouter>
        </>
      );
};
export default Routers
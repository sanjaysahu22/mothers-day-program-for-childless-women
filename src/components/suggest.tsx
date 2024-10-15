import { useState } from "react";
import Category from "./category";
import Followuser from "./followuser";

 const Suggest = () => {

    const [state , setState] = useState(null); 
        return (
            <div className="h-screen w-1/4 bg-white fixed  flex-col">
               <Category/>
               <Followuser />
              </div>
             
          );
    
};
export default Suggest;

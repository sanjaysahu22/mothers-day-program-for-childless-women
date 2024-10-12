import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import {BACKEND_URL} from '../config';  // Aliased path  

import axios from "axios";

const Auth = ({ type }: { type: "signup" | "signin" }) => {
  type userinputs = {
    email?: string | undefined;
    username: string;
    password: string;
  };
  const navigate = useNavigate();

  const [inputs, setinputs] = useState<userinputs>({
    username: "",
    password: "",
    email: "",
  });
  const submitData = async()=>{
    try {
        const response =await  axios.post(`${BACKEND_URL}/api/v1/user/${type =='signin'?'signin':'signup'}` , inputs);
        const token = response.headers.authourization;
        
        if(token){
            document.cookie = `accessToken=${token}; path=/; max-age=36000`;
            navigate('/blogs');      
        }  
        else{
            
            console.log("error while signing up");
        }
                                    
        

    } catch (error) {
       alert("error while signing in");
    }

  }
  return (
    <div className="flex h-screen w-full bg-sky-100">
      <div className="flex h-screen ">
        <div className="flex text-sky-200 ">
          {type == "signin" ? (
            <div>Welcome back</div>
          ) : (
            <div>Create account</div>
          )}
          <div>Start sharing your story today</div>
        </div>
        <div className="flex flex-col text-blue-300">
          {type == "signin" ? (
            <div>Don't have an account</div>
          ) : (
            <div>Already hve an account</div>
          )}
          <Link to={type == 'signin' ? '/signin' : '/signup'}>
            {type == 'signin' ? 'signin' : 'signup'}
          </Link>
        </div>
        <div>
          <LabelledInput
            label="username"
            type="text"
            placeholder="eg:sanjaysahu22"
            onchange={(e) => {
              setinputs({ ...inputs, username: e.target.value });
            }}
          />
          {type === "signup" ? (
            <LabelledInput
              label="email"
              type="email"
              placeholder="eg: sanjaysahu@gmail.com"
              onchange={(e) => {
                setinputs({ ...inputs, email: e.target.value });
              }}
            />
          ) : null}
          <LabelledInput type="password" label="passowrd" placeholder="eg: sanJAY2004"  onchange={(e) => {
                setinputs({ ...inputs, password: e.target.value });
              }} />
            <Button onClick={submitData} type="button"  className="bg-sky-400 w-3/5 justify-center">{type==="signin"?'SIGN IN':'SIGN UP'}</Button>
        </div>
      </div>
    </div>
  );
};

interface LabelledInputtype {
  type: string;
  label: string;
  onchange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}

const LabelledInput = ({
  type,
  label,
  onchange,
  placeholder,
}: LabelledInputtype) => {
  return (
    <div>
      <label>{label}</label>
      <input onChange={onchange} placeholder={placeholder} type={type}></input>
    </div>
  );
};
export default Auth;

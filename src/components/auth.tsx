import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { BACKEND_URL } from "../config"; // Aliased path
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

  const submitData = async () => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/${type == "signin" ? "signin" : "signup"}`,
        inputs
      );
      const token = response.headers.authourization;

      if (token) {
        document.cookie = `accessToken=${token}; path=/; max-age=36000`;
        navigate("/blogs");
      } else {
        console.log("error while signing up");
      }
    } catch (error) {
      alert("error while signing in");
    }
  };

  return (
    <div className="flex flex-col h-full md:h-3/4 w-full md:w-3/4 rounded-md items-center bg-white  md:p-8">
    
      <div className="flex-col flex  justify-center items-center text-center">
        {type == "signin" ? (
          <div
            className="font-thin text-3xl md:text-5xl"
            style={{
              fontFamily:
                '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
            }}
          >
            WELCOME BACK
          </div>
        ) : (
          <div
            className="font-thin text-3xl md:text-5xl"
            style={{
              fontFamily:
                '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
            }}
          >
            CREATE ACCOUNT
          </div>
        )}
        <div className="text-zinc-400 text-sm md:text-base">
          Start Sharing Your Story Today ...
        </div>
      </div>
      <div className="w-full md:w-3/4 flex flex-col justify-around items-center space-y-4 md:space-y-8">
        <LabelledInput
          label="USERNAME :"
          type="text"
          placeholder="LizDoesBiz"
          onchange={(e) => {
            setinputs({ ...inputs, username: e.target.value });
          }}
        />
        {type === "signup" && (
          <LabelledInput
            label="EMAIL :"
            type="email"
            placeholder="xyz@gmail.com"
            onchange={(e) => {
              setinputs({ ...inputs, email: e.target.value });
            }}
          />
        )}
        <LabelledInput
          type="password"
          label="PASSWORD :"
          placeholder="password"
          onchange={(e) => {
            setinputs({ ...inputs, password: e.target.value });
          }}
        />
        <Button
          onClick={submitData}
          type="button"
          className="bg-black w-full md:w-4/5 justify-center hover:bg-zinc-700 hover:w-full hover:h-12 text-white py-2 md:py-3"
        >
          {type === "signin" ? "SIGN IN" : "SIGN UP"}
        </Button>
        <div className="flex flex-col  w-full justify-center items-center text-zinc-600 mt-4 md:mt-8">
        {type == "signin" ? (
          <div>Don't Have An Account?</div>
        ) : (
          <div>Already Have An Account?</div>
        )}
        <Link
          className="text-black font-semibold hover:text-xl"
          to={type == "signin" ? "/signup" : "/signin"}
        >
          {type == "signin" ? "SignUp" : "SignIn"}
        </Link>
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
    <div className="flex flex-col text-lg md:text-2xl space-y-2 md:space-y-4 w-full">
      <label>{label}</label>
      <input
        onChange={onchange}
        placeholder={placeholder}
        className="placeholder-gray-500 text-base md:text-lg border-2 border-gray-300 focus:border-blue-500 focus:placeholder-gray-700 rounded-lg p-2 w-full"
        type={type}
      />
    </div>
  );
};

export default Auth;

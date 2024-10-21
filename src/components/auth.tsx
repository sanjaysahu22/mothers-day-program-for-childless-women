import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { BACKEND_URL } from "../config";
import axios from "axios";

interface UserInputs {
  email?: string;
  username: string;
  password: string;
}

interface LabelledInputProps {
  type: string;
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState<UserInputs>({
    username: "",
    password: "",
    email: "",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitData = async () => {
    try {
      const endpoint = `${BACKEND_URL}/user/${type}`;
      const response = await axios.post(endpoint, inputs, { withCredentials: true });
      const token = response.headers["authorization"];
      document.cookie = `accessToken=${token}; path=/; max-age=3600`;
      navigate("/home");
    } catch (error) {
      console.error("Error during authentication:", error);
      alert("Error while signing in/up"); 
    }
  };

  return (
    <div className="flex flex-col h-full md:h-4/5 w-full md:w-3/4 rounded-md items-center bg-white md:p-8">
      <div className="flex flex-col justify-center mb-10 items-center text-center">
        <div
          className="font-thin text-3xl md:text-5xl"
          style={{
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
          }}
        >
          {type === "signin" ? "WELCOME BACK" : "CREATE ACCOUNT"}
        </div>
        <div className="text-zinc-400 text-sm md:text-base">
          Start Sharing Your Story Today...
        </div>
      </div>

      <div className="w-full md:w-3/4 flex flex-col justify-around items-center  space-y-4 md:space-y-8">
        <LabelledInput
          label="USERNAME"
          type="text"
          placeholder="LizDoesBiz"
          value={inputs.username}
          onChange={handleInputChange}
        />
        {type === "signup" && (
          <LabelledInput
            label="EMAIL"
            type="email"
            placeholder="xyz@gmail.com"
            value={inputs.email ?? ""}
            onChange={handleInputChange}
          />
        )}
        <LabelledInput
          label="PASSWORD"
          type="password"
          placeholder="password"
          value={inputs.password}
          onChange={handleInputChange}
        />
        <Button
          onClick={submitData}
          className="bg-black w-full md:w-4/5 justify-center hover:bg-zinc-700 text-white py-2 md:py-3"
        >
          {type === "signin" ? "SIGN IN" : "SIGN UP"}
        </Button>
        <div className="flex flex-col w-full justify-center  items-center text-zinc-600 mt-4 md:mt-8">
          {type === "signin" ? "Don't Have An Account?" : "Already Have An Account?"}
         <span> <Link className="text-black font-semibold hover:text-xl" to={type === "signin" ? "/signup" : "/signin"}>
            {type === "signin" ? "SignUp" : "SignIn"}
          </Link></span>
        </div>
      </div>
    </div>
  );
};

const LabelledInput = ({ type, label, placeholder, onChange, value }: LabelledInputProps) => (
  <div className="flex flex-col text-lg md:text-2xl space-y-2 md:space-y-4 w-full">
    <label>{label}</label>
    <input
      name={label.toLowerCase()}
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      className="placeholder-gray-500 text-base md:text-lg border-2 border-gray-300 focus:border-blue-500 rounded-lg p-2 w-full"
    />
  </div>
);

export default Auth;

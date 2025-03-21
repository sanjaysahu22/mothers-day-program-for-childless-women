import   { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Loader2, AlertCircle } from "lucide-react";
import AxiosInstance from "@/utils/axios";
import { useUser } from "@/utils/usercontext";

interface UserInputs {
  email?: string;
  username: string;
  password: string;
}

interface LabelledInputProps {
  type: string;
  label: string;
  name: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
  error?: string;
}
const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const { updateUserDetails  , userDetails } = useUser();
  const navigate = useNavigate();
  const [inputs, setInputs] = useState<UserInputs>({
    username: "",
    password: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{
    username?: string;
    email?: string;
    password?: string;
    general?: string;
  }>({});

  const validateInputs = (): boolean => {
    const newErrors: typeof errors = {};

    // Username validation
    if (!inputs.username.trim()) {
      newErrors.username = "Username is required";
    } else if (inputs.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters long";
    }

    // Email validation (only for signup)
    if (type === "signup" && (!inputs.email || !inputs.email.trim())) {
      newErrors.email = "Email is required";
    } else if (type === "signup" && !/\S+@\S+\.\S+/.test(inputs.email || "")) {
      newErrors.email = "Invalid email format";
    }

    // Password validation
    if (!inputs.password.trim()) {
      newErrors.password = "Password is required";
    } else if (inputs.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
    
    // Clear specific error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const submitData = async () => {
    

    setErrors({});
  
    if (!validateInputs()) {
      return;
    }
  
    setLoading(true);
  
    try {
      const response = await AxiosInstance.post(`/user/${type}`, inputs, { 
        withCredentials: true 
      });
  
      const token = response.headers["authorization"];
      document.cookie = `accessToken=${token}; path=/; max-age=3600; SameSite=Strict; Secure`;
      const { id, username, email } = response.data.user;
      console.log(response.data.user , "line 96");
     
      updateUserDetails({
        id,
        username,
        email,
        isAuthenticated: true,
      }); 
      navigate("/home");
    } catch (error: any) {
      console.error("Error during authentication:", error);
  
      if (error.response) {
        switch (error.response.status) {
          case 400:
            setErrors({ general: "Invalid input. Please check your details." });
            break;
          case 401:
            setErrors({ general: type === "signin" 
              ? "Invalid username or password" 
              : "Username or email already exists" 
            });
            break;
          case 500:
            setErrors({ general: "Server error. Please try again later." });
            break;
          default:
            setErrors({ general: "An unexpected error occurred" });
        }
      } else {
        setErrors({ general: "Network error. Please check your connection." });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen md:h-4/5 w-full md:w-3/4 rounded-md items-center bg-white p-4 md:p-8">
      <div className="flex flex-col justify-center mb-6 md:mb-10 items-center text-center">
        <div 
          className="font-thin text-2xl md:text-5xl mb-2"
          style={{
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
          }}
        >
          {type === "signin" ? "WELCOME BACK" : "CREATE ACCOUNT"}
        </div>
        <div className="text-zinc-400 text-xs md:text-base">
          Start Sharing Your Story Today...
        </div>
      </div>

      {errors.general && (
       <div className="w-full md:w-3/4 flex items-center justify-center mb-4 text-red-500">
          <AlertCircle className="mr-2 shrink-0" size={20} />
          <span className="text-sm">{errors.general}</span>
        </div>
      )}

      <div className="w-full md:w-3/4 flex flex-col justify-around items-center space-y-6 md:space-y-8">
        <LabelledInput
          label="USERNAME"
          name="username"
          type="text"
          placeholder="Username"
          value={inputs.username}
          onChange={handleInputChange}
          error={errors.username}
        />

        {type === "signup" && (
          <LabelledInput
            label="EMAIL"
            name="email"
            type="email"
            placeholder="Email"
            value={inputs.email ?? ""}
            onChange={handleInputChange}
            error={errors.email}
          />
        )}

        <LabelledInput
          label="PASSWORD"
          name="password"
          type="password"
          placeholder="Password"
          value={inputs.password}
          onChange={handleInputChange}
          error={errors.password}
        />

        <Button
          onClick={submitData}
          disabled={loading}
          className="bg-black w-full md:w-4/5 justify-center hover:bg-zinc-700 text-white py-2 md:py-3 flex items-center"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 animate-spin" size={20} />
              {type === "signin" ? "SIGNING IN..." : "SIGNING UP..."}
            </>
          ) : (
            type === "signin" ? "SIGN IN" : "SIGN UP"
          )}
        </Button>
      </div>

      <div className="flex flex-col w-full justify-center items-center text-zinc-600 mt-6 md:mt-10 text-sm md:text-base space-y-2">
        <span>{type === "signin" ? "Don't Have An Account?" : "Already Have An Account?"}</span>
        <Link 
          className="text-black font-semibold hover:text-zinc-700 transition-colors" 
          to={type === "signin" ? "/signup" : "/signin"}
        >
          {type === "signin" ? "SignUp" : "SignIn"}
        </Link>
      </div>
    </div>
  );
};

const LabelledInput = ({ 
  type, 
  label, 
  name,
  placeholder, 
  onChange, 
  value, 
  error 
}: LabelledInputProps) => (
  <div className="flex flex-col text-lg md:text-2xl space-y-2 w-full">
    <label className="text-sm md:text-base">{label}</label>
    <input
      name={name}
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      className={`
        placeholder-gray-500 
        text-base md:text-lg 
        border-2 
        rounded-lg 
        p-2 
        w-full 
        ${error 
          ? 'border-red-500 focus:border-red-700 bg-red-50' 
          : 'border-gray-300 focus:border-blue-500'
        }
      `}
    />
    {error && (
      <p className="text-red-500 text-xs md:text-sm mt-1 flex items-center">
        <AlertCircle className="mr-1 shrink-0" size={14} />
        {error}
      </p>
    )}
  </div>
);

export default Auth;

import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Loader2, AlertCircle } from "lucide-react";
import AxiosInstance from "@/utils/axios";
import { useUser } from "@/utils/usercontext";
import { motion } from "framer-motion";

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
  index: number; // For staggered animations
}

const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const { updateUserDetails } = useUser();
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
    
    if (!inputs.username.trim()) {
      newErrors.username = "Username is required";
    } else if (inputs.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters long";
    }
    
    if (type === "signup") {
      if (!inputs.email || !inputs.email.trim()) {
        newErrors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(inputs.email || "")) {
        newErrors.email = "Invalid email format";
      }
    }
    
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
      
      });
      
      const token = response.headers["authorization"];
      document.cookie = `accessToken=${token}; path=/; max-age=3600; SameSite=Strict; Secure`;
      
      const { id, username, email } = response.data.user;
      
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
            if (error.response.data.errors) {
              const serverErrors = error.response.data.errors;
              const newErrors: typeof errors = {};
              
              if (serverErrors.username) {
                newErrors.username = serverErrors.username;
              }
              if (serverErrors.email) {
                newErrors.email = serverErrors.email;
              }
              if (serverErrors.password) {
                newErrors.password = serverErrors.password;
              }
              
              setErrors(newErrors);
            } else {
              setErrors({ general: "Invalid input. Please check your details." });
            }
            break;
          
          case 401:
            if (type === "signin") {
              setErrors({ 
                general: error.response.data.message || "Invalid username or password" 
              });
            } else {
              if (error.response.data.message?.includes('username')) {
                setErrors({ username: "Username is already taken" });
              } else if (error.response.data.message?.includes('email')) {
                setErrors({ email: "Email is already registered" });
              } else {
                setErrors({ 
                  general: "Username or email already exists" 
                });
              }
            }
            break;
          
          case 403:
            setErrors({ 
              general: "Access forbidden. Please check your credentials." 
            });
            break;
          
          case 500:
            setErrors({ 
              general: error.response.data.message || "Server error. Please try again later." 
            });
            break;
          
          default:
            setErrors({ 
              general: error.response.data.message || "An unexpected error occurred" 
            });
        }
      } else {
        setErrors({ general: "Network error. Please check your connection." });
      }
    } finally {
      setLoading(false);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    }
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.98, transition: { duration: 0.1 } },
  };

  return (
    <motion.div 
      className="flex flex-col w-full max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="px-6 py-8 sm:px-8  sm:py-10">
        <motion.div 
          className="flex flex-col justify-center mb-6 items-center text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <motion.div 
            className="font-thin text-2xl sm:text-3xl md:text-4xl mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            style={{
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
            }}
          >
            {type === "signin" ? "WELCOME BACK" : "CREATE ACCOUNT"}
          </motion.div>
          <motion.div 
            className="text-zinc-400 text-xs sm:text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Start Sharing Your Story Today...
          </motion.div>
        </motion.div>

        {errors.general && (
          <motion.div 
            className="w-full flex items-center justify-center mb-4 text-red-500"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.3 }}
          >
            <AlertCircle className="mr-2 shrink-0" size={18} />
            <span className="text-sm">{errors.general}</span>
          </motion.div>
        )}

        <motion.div 
          className="w-full flex flex-col justify-around items-center space-y-5"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <LabelledInput
            label="USERNAME"
            name="username"
            type="text"
            placeholder="Username"
            value={inputs.username}
            onChange={handleInputChange}
            error={errors.username}
            index={0}
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
              index={1}
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
            index={2}
          />

          <motion.div 
            className="w-full flex justify-center mt-2"
            variants={itemVariants}
          >
            <motion.div
              className="w-full"
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
            >
              <Button
                onClick={submitData}
                disabled={loading}
                className="bg-black w-full justify-center hover:bg-zinc-700 text-white py-2 flex items-center rounded-md"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 animate-spin" size={18} />
                    <span className="text-sm sm:text-base">
                      {type === "signin" ? "SIGNING IN..." : "SIGNING UP..."}
                    </span>
                  </>
                ) : (
                  <span className="text-sm sm:text-base">
                    {type === "signin" ? "SIGN IN" : "SIGN UP"}
                  </span>
                )}
              </Button>
            </motion.div>
          </motion.div>

          <motion.div 
            className="flex flex-col w-full justify-center items-center text-zinc-600 mt-4 text-sm space-y-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <span className="text-xs sm:text-sm">
              {type === "signin" ? "Don't Have An Account?" : "Already Have An Account?"}
            </span>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                className="text-black font-semibold hover:text-zinc-700 transition-colors text-xs sm:text-sm" 
                to={type === "signin" ? "/signup" : "/signin"}
              >
                {type === "signin" ? "SignUp" : "SignIn"}
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

const LabelledInput = ({ 
  type, 
  label, 
  name,
  placeholder, 
  onChange, 
  value, 
  error,
  index
}: LabelledInputProps) => (
  <motion.div 
    className="flex flex-col space-y-1 w-full"
    variants={{
      hidden: { y: 20, opacity: 0 },
      visible: { 
        y: 0, 
        opacity: 1,
        transition: { 
          type: "spring",
          stiffness: 300,
          damping: 24,
          delay: 0.2 + (index * 0.1) 
        }
      }
    }}
  >
    <motion.label 
      className="text-xs sm:text-sm font-medium"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 + (index * 0.1), duration: 0.5 }}
    >
      {label}
    </motion.label>
    <motion.input
      name={name}
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      className={`
        placeholder-gray-400
        text-sm
        border-2 
        rounded-lg 
        p-2.5
        w-full 
        focus:outline-none
        transition-all
        duration-300
        ${error 
          ? 'border-red-500 focus:border-red-700 bg-red-50' 
          : 'border-gray-300 focus:border-blue-500 focus:shadow-md'
        }
      `}
      whileFocus={{ scale: 1.01, borderWidth: '2px' }}
    />
    {error && (
      <motion.p 
        className="text-red-500 text-xs mt-1 flex items-center"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <AlertCircle className="mr-1 shrink-0" size={12} />
        {error}
      </motion.p>
    )}
  </motion.div>
);

export default Auth;
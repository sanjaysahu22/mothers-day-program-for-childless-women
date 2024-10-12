import Auth from "@/components/auth";
import Quote from "@/components/quote";


const Signup = () => {
    return (
        <div>
            <Auth type='signup' />  
            <Quote />
        </div>
    );  
};
export default Signup;
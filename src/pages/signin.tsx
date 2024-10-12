 import Auth from "@/components/auth";
import Quote from "@/components/quote";
 const Signin = () => {
    return (
        <div>
            <Auth type='signin' />  
            <Quote />
        </div>
    );
};
export default Signin;
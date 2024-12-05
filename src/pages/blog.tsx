import Header from "@/components/header"
import { useNavigate, useParams } from "react-router-dom"
import AxiosInstance from "@/utils/axios"
import { useEffect, useState } from "react"

import CommentSheet from "@/components/comment"
import { Heart } from "lucide-react"

interface BlogPostType {
  title: string;
  description: string;
  imageUrl: string;
  content: string;
}

export default function Blog() {
  // Initialize state with the correct type
  const [blog, setBlog] = useState<BlogPostType | null>(null);
  const [like , setlike]= useState(false)
  const { id } = useParams();
  
  const navigate  = useNavigate()
  const token = document.cookie.split("=")[1];
    
  const likeblog =async()=>{
    try {
        const response = await AxiosInstance.post(
          '/blog/like',
          { id },
          {
            headers: {
              'Authorization': `${token}`,
              "Content-Type": "application/json",
            }
          }
        );
        console.log(response.data)
       setlike(true)

      } catch (error) {
        console.error("Error fetching blog:", error);
      }
  }

  
  const getBlog = async () => {
    try {
      const response = await AxiosInstance.post(
        '/blog/getblog',
        { id }, // Send as an object
        {
          headers: {
            'Authorization': `${token}`,
            "Content-Type": "application/json",
          }
        }
      );
      setBlog(response.data.result.BlogData);
    } catch (error:any) {
        if (error.response && error.response.status === 401) {
            navigate('/signin')
          }
          console.log(error)
    }
  };

  useEffect(() => {
    getBlog();
  }, []); 

  const defaultBlog: BlogPostType = {
    title: "THIS IS TITLE OF BLOG",
    description: "this is the short description about blogs of 1-3 lines",
    imageUrl: "https://images.unsplash.com/photo-1719937050446-a121748d4ba0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8",
    content: "I've used NextJS for static websites because the experience with amplify hosting is so insanely easy. The fact that I go on the AWS console and connect a github repo and it just works, and runs with lambda, and is super cheap (unless I get DDOS'd)... that's just too good to say no to in some cases."
  };

  // Use blog data if available, otherwise use default values
  const displayBlog = blog || defaultBlog;

  return (
    <div className="min-h-screen flex flex-col bg-zinc-200">
      <Header />
      <article className="max-w-4xl mx-auto p-6 bg-background">
        <header className="space-y-4 mb-8 ">
          <h1 className="text-4xl mt-[10%] font-bold tracking-tight  sm:text-5xl">
            {displayBlog.title}
          </h1>
          <p className="text-xl  text-muted-foreground">
            {displayBlog.description}
          </p>
          <div className="bg-zinc-200 flex rounded-lg justify-around p-2">
            <div className="flex items-center hover:bg-white px-2 rounded-lg">Author:<div className="h-6 ml-2 mr-1 w-6 rounded-full  bg-red-300"></div> sanjay</div>
            <button className={`hover:bg-white py-1 px-2 rounded-md  ${like? "bg-red-300 ":""} flex items-center gap-2`} onClick={likeblog}> <Heart size={15} /> 100k</button>
           {id? <CommentSheet comments={42} id={id} />:"null"}
          </div>
        </header>
        <div className="relative aspect-[4/3] mb-8">
          <img
            src={displayBlog.imageUrl == null?defaultBlog.imageUrl: displayBlog.imageUrl}
            alt="Blog post cover image"
            className="object-cover rounded-lg w-full h-full" 
          />
        </div>
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <p>{displayBlog.content == null?defaultBlog.content: displayBlog.content}</p>
        </div>
      </article>
    </div>
  );
}
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import AxiosInstance from "@/utils/axios";
import { useEffect, useState } from "react";

 
interface blog  {
  id    :     String     
  userid :     String
  created_at : string
}
export default function BlogPosts() {
  const blogs = [
    {
      title: "Google Doesn't Appreciate Flutter",
      description:
        'Another day, another, "Is Google going to kill Flutter post?" It\'s almost comical at this point :',
      author: "Andrew Zuo",
      authorImage: "/placeholder.svg?height=40&width=40",
      date: "6th december , 2024",
      likes: "100k",
      comments: "300k",
      image:
        "https://images.unsplash.com/photo-1612873346068-1d4b76372235?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Z29vZ2xlfGVufDB8fDB8fHww",
      id: "2",  
    },
    {
      title: "Google Doesn't Appreciate Flutter",
      description:
        'Another day, another, "Is Google going to kill Flutter post?" It\'s almost comical at this point:',
      author: "Andrew Zuo",
      authorImage: "/placeholder.svg?height=40&width=40",
      date: "6th december , 2024",
      likes: "100k",
      comments: "300k",
      image:
        "https://images.unsplash.com/photo-1612873346068-1d4b76372235?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Z29vZ2xlfGVufDB8fDB8fHww",
      id: "1",
    },
    // Add more posts here as needed
  ];
  const [blog , setblog] = useState<blog>({
    id    :      ""     ,
    userid :     ""    ,
    created_at : ""
  }) ;
  let token = document.cookie.split('=')[1];
  console.log(token ,"line 49");
  const getblogs = async () => {
    try {
      const response = await AxiosInstance.post(
        'blog/myblogs',
        {}, 
        {
          headers: {
            'Authorization': `${token}`,   
            'Content-Type': 'application/json',
          },
        }
      );
    
      setblog(response.data.blogs);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=>{
    getblogs()
  } , [])
  console.log(blog)
  return (
    <div className="space-y-8">
      {blogs.map((blog, index) => (
        <Card key={index} className="overflow-hidden">                  
        <Link  to={`/blog/${blog.id}`} >
          <CardContent className="p-4">
            <div className="flex items-start space-x-4">
              <div className="flex-grow ">
                <h3 className="text-xl font-bold mb-1">{blog.title}</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  {blog.description}
                </p>
                <div className="flex items-center space-x-2 mb-2">
                  <Avatar className="w-6 h-6">
                    <AvatarImage src={blog.authorImage} alt={blog.author} />
                    <AvatarFallback>{blog.author.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium">{blog.author}</span>
                </div>
                <div className="flex items-center text-xs text-muted-foreground space-x-4">
                  <span > <span  className="font-semibold text-black">Published on: </span> {blog.date}</span>
                  <span><span  className="font-semibold text-black">Likes:</span> {blog.likes}</span>
                  <span><span className="font-semibold text-black">Comments:</span> {blog.comments}</span>
                </div>
              </div>
              <img
                src={blog.image}
                alt={blog.title}
                className="rounded-md w-1/4 h-32   object-cover"
              />
            </div>
          </CardContent>
          </Link>

        </Card>
      ))}
    </div>
  );
}

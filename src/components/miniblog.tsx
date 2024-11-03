import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link, useNavigate } from "react-router-dom";
import AxiosInstance from "@/utils/axios";
import { useEffect, useState } from "react";

interface Blog {
  id: string;
  userid: string;
  created_at: string;
  BlogData: {
    title: string;
    description: string;
    image: string;
  };
  likes: string;
  comments: string;
}

export default function BlogPosts() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const navigate = useNavigate();
  let token = document.cookie.split("=")[1];

  const getBlogs = async () => {
    try {
      const response = await AxiosInstance.post(
        "blog/myblogs",
        {},
        {
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      setBlogs(response.data.blogs);
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        navigate("/signin");
      }
      console.log(error);
    }
  };

  useEffect(() => {
    getBlogs();
  }, []);

  return (
    <div className="space-y-8 ml-[5%] md:ml-[10%]">
      {blogs.map((blog, index) => (
        <Card key={index} className="overflow-hidden">
          <Link to={`/blog/${blog.id}`}>
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row items-start md:space-x-4 space-y-4 md:space-y-0">
                <div className="flex-grow">
                  <div className=" md:!text-xl font-bold mb-1">
                    {blog.BlogData !== null
                      ? blog.BlogData.title
                      : "AUTHOR NAME"}
                  </div>

                  <p className=" text-muted-foreground mb-2">
                    {blog.BlogData !== null
                      ? blog.BlogData.description
                      : "short description about the blogs"}
                  </p>
                  <div className="flex items-center space-x-2 mb-2">
                    <Avatar className="w-6 h-6">
                      <AvatarImage
                        src="/placeholder.svg?height=40&width=40"
                        alt="Author Image"
                      />
                      <AvatarFallback>{blog.userid.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="text-xl font-medium">{blog.userid}</span>
                  </div>
                  <div className="flex items-center  text-muted-foreground justify-between  space-x-4 w-4/5">
                    <span>
                      <span className="font-semibold text-black">
                        Published on:
                      </span>{" "}
                      {new Date(blog.created_at).toLocaleDateString()}
                    </span>
                    <span>
                      <span className="font-semibold text-black">Likes:</span>{" "}
                      {blog.likes != null ? blog.likes.length : "300k"}
                    </span>
                    <span>
                      <span className="font-semibold text-black">
                        Comments:
                      </span>{" "}
                      {blog.comments}
                    </span>
                  </div>
                </div>
                <img
                  src={
                    blog.BlogData.image !== null
                      ? blog.BlogData.image
                      : "https://images.unsplash.com/photo-1631038591095-8660f2bd6734?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZmlsZSUyMHdpdGglMjBubyUyMGltYWdlfGVufDB8fDB8fHww"
                  }
                  alt={blog.BlogData.image}
                  className="rounded-md w-full h-40 object-cover md:w-1/4 md:h-32"
                />
              </div>
            </CardContent>
          </Link>
        </Card>
      ))}
    </div>
  );
}

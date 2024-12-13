import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import AxiosInstance from "@/utils/axios";

import Header from "@/components/header";
import CommentSheet from "@/components/comment";
import { Heart } from "lucide-react";
import Loading from "@/components/loading";

interface BlogPostType {
  title: string;
  description: string;
  imageUrl: string;
  content: string;
  userId: string;
  id: string;
}
interface Comment {
  commentById: string;
  comment: string;
  time: string;
}

export default function Blog() {
  const [blog, setBlog] = useState<BlogPostType | null>(null);
  const [like, setLike] = useState(false);
  const [likeCount, setLikeCount] = useState<number>(0);
  const [comments, setComments] = useState<Array<Comment>>([]);
  const [loading, setLoading] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();
  const token = document.cookie.split("=")[1];

  const defaultBlog: BlogPostType = {
    title: "THIS IS TITLE OF BLOG",
    id: "1",
    description: "this is the short description about blogs of 1-3 lines",
    imageUrl: "https://images.unsplash.com/photo-1719937050446-a121748d4ba0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8",
    content:
      "I've used NextJS for static websites because the experience with amplify hosting is so insanely easy...",
    userId: "Anonymous",
  };

  const likeBlog = async () => {
    try {
      setLoading(true);
       await AxiosInstance.post(
        "/blog/like",
        { id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setLike(true);
    } catch (error) {
      console.error("Error liking blog:", error);
    } finally {
      setLoading(false);
    }
  };

  const getBlog = async () => {
    try {
      setLoading(true);
      const response = await AxiosInstance.post(
        "/blog/getblog",
        { id },
        {
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const fetchedBlog = response.data.result.blog;
      setBlog({
        title: fetchedBlog.BlogData.title || defaultBlog.title,
        description: fetchedBlog.BlogData.description || defaultBlog.description,
        imageUrl: fetchedBlog.imageUrl || defaultBlog.imageUrl,
        content: fetchedBlog.content || defaultBlog.content,
        userId: fetchedBlog.userid || defaultBlog.userId,
        id: fetchedBlog.id || defaultBlog.id,
      });

      setLikeCount(response.data.result.likes);
      setComments(response.data.result.comments);
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        navigate("/signin");
      }
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBlog();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-zinc-200">
      <Header />
      {loading ? (
        <Loading />
      ) : blog ? (
        <article className="max-w-4xl mx-auto p-6 bg-background">
          <header className="space-y-4 mb-8">
            <h1 className="text-4xl mt-[10%] font-bold tracking-tight sm:text-5xl">
              {blog.title}
            </h1>
            <p className="text-xl text-muted-foreground">{blog.description}</p>
            <div className="bg-zinc-200 flex rounded-lg justify-around p-2">
              <Link to={`/profile/${blog.userId}`} className="flex items-center hover:bg-white px-2 rounded-lg">
                Author:
                <div className="h-6 ml-2 mr-1 w-6 rounded-full bg-red-300"></div>
                {blog.userId}
              </Link>
              <button
                className={`hover:bg-white py-1 px-2 rounded-md ${like ? "bg-red-300" : ""} flex items-center gap-2`}
                onClick={(e) => {
                  e.preventDefault();
                  likeBlog();
                }}
              >
                <Heart size={15} />
                {likeCount}
              </button>
              <CommentSheet comments={comments} id={blog.id} />
            </div>
          </header>
          <div className="relative aspect-[4/3] mb-8">
            <img
              src={blog.imageUrl || ""}
              alt="Blog post cover image"
              className="object-cover rounded-lg w-full h-full"
            />
          </div>
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <p>{blog.content || ""}</p>
          </div>
        </article>
      ) : (
        <div className="flex justify-center items-center min-h-[50vh]">
          <p>No Blog Data Found</p>
        </div>
      )}
    </div>
  );
}

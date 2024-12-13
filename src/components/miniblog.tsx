import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import AxiosInstance from "@/utils/axios";

interface BlogPostType {
  title: string;
  description: string;
  imageUrl: string;
  content: string;
  userId: string;
  id: string;
  created_at?: string;
}

interface Comment {
  commentById: string;
  comment: string;
  time: string;
}

export default function BlogPostCard({ id }: { id: string }) {
  const [blog, setBlog] = useState<BlogPostType | null>(null);
  const [likeCount, setLikeCount] = useState<number>(0);
  const [comments, setComments] = useState<Array<Comment>>([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const token = document.cookie.split("=")[1] || "";

  const defaultBlog: BlogPostType = {
    title: "THIS IS TITLE OF BLOG",
    id: "1",
    description: "This is a short description about blogs of 1-3 lines.",
    imageUrl:
      "https://images.unsplash.com/photo-1719937050446-a121748d4ba0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8",
    content:
      "I've used NextJS for static websites because the experience with amplify hosting is so insanely easy...",
    userId: "Anonymous",
  };

  const getBlog = async () => {
    try {
      setLoading(true);
      const response = await AxiosInstance.post(
        "/blog/getblog",
        { id:id },
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
        userId: fetchedBlog.userId || defaultBlog.userId,
        id: fetchedBlog.id || defaultBlog.id,
        created_at: fetchedBlog.created_at,
      });

      setLikeCount(response.data.result.likes);
      setComments(response.data.result.comments);
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        navigate("/signin");
      } else {
        console.error("Error fetching blog:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBlog();
  }, [id]);

  if (!blog) return null;

  return (
    <Card
      key={blog.id}
      className="overflow-hidden duration-300 transition-all hover:shadow-lg"
    >
      <Link to={`/blog/${blog.id}`}>
        <CardContent className="p-4 sm:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2 order-2 sm:order-1">
              <h2 className="text-2xl sm:text-3xl mb line-clamp-1">
                {blog.title}
              </h2>
              <p className="text-muted-foreground mb-4 line-clamp-2 text-base sm:text-lg">
                {blog.description}
              </p>
              <div className="flex items-center space-x-3 mb-4">
                <Avatar className="w-8 h-8">
                  <AvatarImage
                    src="/placeholder.svg?height=40&width=40"
                    alt="Author"
                  />
                  <AvatarFallback>
                    {blog.userId.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className="font-medium text-sm sm:text-base">
                  {blog.userId}
                </span>
              </div>
              <div className="flex flex-wrap justify-between text-xs sm:text-sm text-muted-foreground">
                <span>
                  Published:{" "}
                  {blog.created_at
                    ? new Date(blog.created_at).toLocaleDateString()
                    : "N/A"}
                </span>
                <span>Likes: {likeCount}</span>
                <span>Comments: {comments.length}</span>
              </div>
            </div>
            <div className="sm:col-span-1 order-1 sm:order-2 mb-4 sm:mb-0">
              <img
                src={blog.imageUrl}
                alt={blog.title}
                className="w-full h-40 sm:h-48 object-cover rounded-md"
              />
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}

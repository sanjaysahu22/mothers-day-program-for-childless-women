import { useEffect, useState } from "react";
import AxiosInstance from "@/utils/axios";
import BlogPostCard from "@/components/miniblog";
import Header from "@/components/header";
import BlogPostsSkeleton from "@/components/shimmers/blogpostskleton";

interface BlogDataType {
  title: string;
  description: string;
  content: string;
  created_at: Date;
}

interface BlogCardType {
  blogData: BlogDataType;
  likes: number;
  comments: number; // Fix the property name from "comment" to "comments" to match the response
  id: string;
  userId: string;
}

interface ApiResponse {
  blogs: BlogCardType[];
}

async function fetchBlogs() {
  try {
    const token = document.cookie.split("=")[1];
    if (!token) {
      throw new Error("No authentication token found");
    }
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
    console.log("Fetched Blogs:", response.data);

    // Ensure correct structure
    return { blogs: response.data.blogs.map((blog: any) => ({
      id: blog.id,
      userId: blog.userId,
      likes: blog.likes,
      comments: blog.comments, // Ensure this matches API response
      blogData: {
        title: blog.blogData.title,
        description: blog.blogData.description,
        content: blog.blogData.content,
        created_at: blog.blogData.created_at,
      }
    })) };
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return { blogs: [] };
  }
}

export default function HomePage() {
  const [blogData, setBlogData] = useState<ApiResponse>({ blogs: [] });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadBlogs = async () => {
      setIsLoading(true);
      try {
        const data = await fetchBlogs();
        setBlogData(data);
      } catch (error) {
        console.error("Failed to load blogs", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadBlogs();
  }, []);

  return (
    <div className="container mx-auto px-4">
      <Header />
      <div className="lg:col-span-3 mt-20 space-y-6">
        {isLoading ? (
          <BlogPostsSkeleton />
        ) : (
          <div className="space-y-4 md:space-y-6">
            {blogData.blogs.length ? (
              blogData.blogs.map((blog: BlogCardType) => (
                <BlogPostCard key={blog.id} blog={blog} />
              ))
            ) : (
              <p className="text-center text-muted-foreground">
                No blogs currently in profile
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

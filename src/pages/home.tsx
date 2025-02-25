import { useEffect, useState } from "react";
import CategorySuggestions from "../components/category";
import PeopleSuggestions from "../components/suggest";
import AxiosInstance from "@/utils/axios";
import BlogPostsSkeleton from "@/components/shimmers/blogpostskleton";
import BlogPostCard from "@/components/miniblog";
import Header from "@/components/header";

// Define interfaces
interface BlogPostType {
  title: string;
  description: string;
  imageUrl: string;
  content: string;
  userId: string;
  id: string;
  created_at?: string;
}

interface BlogData {
  BlogData: BlogPostType;
  likes: Array<any>;
  comment: Array<any>;
}

interface ApiResponse {
  blogs: BlogData[];
}

async function fetchBlogs() {
  try {
    const token = document.cookie.split("=")[1];
    if (!token) {
      throw new Error('No authentication token found');
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
    console.log(response.data);
    return response.data;
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
      <div className="grid grid-cols-1 mt-20 md:grid-cols-4 gap-4 md:gap-8">
        <div className="md:col-span-1 space-y-8 md:sticky md:top-20 md:max-h-screen md:overflow-y-auto">
          <CategorySuggestions />
          <PeopleSuggestions />
        </div>
        <div className="md:col-span-3 space-y-4 md:max-h-screen md:overflow-y-auto">
          {isLoading ? (
            <BlogPostsSkeleton />
          ) : (
            <div className="space-y-4 md:space-y-6">
              {blogData.blogs && blogData.blogs.length > 0 ? (
                blogData.blogs.map((blog) => (
                  <BlogPostCard
                    key={blog.BlogData.id}
                    blog={blog.BlogData}
                    likeCount={blog.likes?.length || 0}
                    comments={blog.comment || []}
                  />
                ))
              ) : (
                <p className="text-center text-muted-foreground">
                  No blogs in your preferred categories
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
import { useEffect, useState } from "react";
import CategorySuggestions from "../components/category";
import PeopleSuggestions from "../components/suggest";
import AxiosInstance from "@/utils/axios";
import BlogPostsSkeleton from "@/components/shimmers/blogpostskleton";
import BlogPostCard from "@/components/miniblog";
import Header from "@/components/header";

// Define interfaces

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
      throw new Error('No authentication token found');
    }
    const response = await AxiosInstance.post(
      "act/getuser_liked_cat_blogs",
      {},
      {
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response.data.updatedBlogs)
    return { blogs: response.data.updatedBlogs.map((blog: any) => ({
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
    </div>
  );
}
import { useEffect, useState } from "react";
import CategorySuggestions from "../components/category";
import PeopleSuggestions from "../components/suggest";
import AxiosInstance from "@/utils/axios";
import BlogPostsSkeleton from "@/components/shimmers/blogpostskleton";
import BlogPostCard from "@/components/miniblog";
import Header from "@/components/header";

// Define interfaces


interface BlogCardType {
  title: string;
  description: string;
  imageUrl: string;
  likes: string[]; // Assuming likes are user IDs
  comment: string[]; // Assuming comments are user IDs or text
  id: string;
  created_at: Date;
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
    console.log(response.data.deleteuser);
    return response.data.deleteuser;
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
              {blogData?.blogs?.length ? (
  blogData.blogs.map((blog: BlogCardType) => (
    <BlogPostCard key={blog.id} blog={blog} />
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
import { useEffect, useState } from "react";
import CategorySuggestions from "../components/category";
import PeopleSuggestions from "../components/suggest";
import AxiosInstance from "@/utils/axios";
import BlogPostsSkeleton from "@/components/shimmers/blogpostskleton";
import BlogPostCard from "@/components/miniblog";
import Header from "@/components/header";

// Blog interface (same as before)
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
    return response.data.blogs;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return [];
  }
}

export default function HomePage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadBlogs = async () => {
      setIsLoading(true);
      try {
        const fetchedBlogs = await fetchBlogs();
        setBlogs(fetchedBlogs);
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
      <div className="grid grid-cols-1 lg:grid-cols-4 p-2 gap-8">
        <div className="lg:col-span-1 space-y-12 mt-20 ">
            <CategorySuggestions />        
            <PeopleSuggestions />
        </div>
        <div className="lg:col-span-3 space-y-6">
          {isLoading ? (        <BlogPostsSkeleton />):(  <div className="space-y-6 mt-20">
            {blogs.map((blog) => (
              <BlogPostCard key={blog.id} blog={blog} />
            ))}
          </div>)}
        
        </div>
      </div>
    </div>
  );
}

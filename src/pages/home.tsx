import { useEffect, useState } from "react";
import CategorySuggestions from "../components/category";
import PeopleSuggestions from "../components/suggest";
import AxiosInstance from "@/utils/axios";
import BlogPostsSkeleton from "@/components/shimmers/blogpostskleton";
import BlogPostCard from "@/components/miniblog";
import Header from "@/components/header";

// Blog interface (same as before)

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
    const blogIds = response.data.blogs.map((blog:any) => blog.id);
    return blogIds;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return [];
  }
}
export default function HomePage() {
  const [ids, setids] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadBlogs = async () => {
      setIsLoading(true);
      try {
        const fetchedBlogs = await fetchBlogs();
        setids(fetchedBlogs);
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
       
        <div className="md:col-span-1 space-y-8   md:sticky md:top-20 md:max-h-screen md:overflow-y-auto">
          <CategorySuggestions />
          <PeopleSuggestions />
        </div>
        <div className="md:col-span-3 space-y-4 md:max-h-screen md:overflow-y-auto">
          {isLoading ? (
            <BlogPostsSkeleton />
          ) : (
            <div className="space-y-4 md:space-y-6">
              {ids ? (
                ids.map((id) => (
                  <BlogPostCard key={id} id={id} />
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
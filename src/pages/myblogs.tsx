import { useEffect, useState } from "react";
import AxiosInstance from "@/utils/axios";
import BlogPostCard from "@/components/miniblog";
import Header from "@/components/header";
import Loading from "@/components/loading";

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
        console.log(fetchedBlogs)
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
        <div className="lg:col-span-3 space-y-6">
          {isLoading ? (        <Loading />):(  <div className="space-y-6 w-3/5 m-auto mt-20">
            {ids ? (
                ids.map((id) => (
                  <BlogPostCard key={id} id={id} />
                ))
              ) : (
                <p className="text-center text-muted-foreground">
                  NO BLOGS YET!!
                </p>
              )}
          </div>)}
        
        </div>
      </div>
  );
}

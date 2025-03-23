import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
interface BlogCardType {
  blogData:{
    title: string;
    description: string;
    content: string;
    created_at: Date;
  }
  likes: number; 
  comments: number; // Assuming comments are user IDs or text
  id: string;
  userId: string;
}

interface BlogPostCardProps {
  blog: BlogCardType;
}



export default function BlogPostCard({blog}: BlogPostCardProps) {
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
                {blog.blogData.title  ? blog.blogData.title :"couldnt fetch blog title successfully"}
              </h2>
              <p className="text-muted-foreground mb-4 line-clamp-2 text-base sm:text-lg">
                { blog.blogData.description  ? blog.blogData.description:"couldnt fetch blog description successfully"}
              </p>
              <div className="flex items-center space-x-3 mb-4">
                <Avatar className="w-8 h-8">
                  <AvatarImage
                    src="/placeholder.svg?height=40&width=40"
                    alt="Author"
                  />
                  <AvatarFallback>
                    {blog.userId?blog.userId.charAt(0).toUpperCase():"U"}
                  </AvatarFallback>
                </Avatar>
                <span className="font-medium text-sm sm:text-base">
                  {blog.userId}
                </span>
              </div>
              <div className="flex flex-wrap justify-between text-xs sm:text-sm text-muted-foreground">
                <span>
                  Published:{" "}
                  {blog.blogData.created_at
                    ? new Date(blog.blogData.created_at).toLocaleDateString()
                    : "N/A"}
                </span>
                <span>Likes: {blog.likes}</span>
                <span>Comments: {blog.comments}</span>
              </div>
            </div>
            <div className="sm:col-span-1 order-1 sm:order-2 mb-4 sm:mb-0">
              <img
                src={'https://images.unsplash.com/photo-1612873346068-1d4b76372235?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGdvb2dsZSUyMGNvbXBhbnl8ZW58MHx8MHx8fDA%3D'}
                alt={blog.blogData.title}
                className="w-full h-40 sm:h-48 object-cover rounded-md"
              />
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}
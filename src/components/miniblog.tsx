import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface BlogPostType {
  title: string|null|undefined;
  description: string|null|undefined;
  imageUrl: string|null;
  content: string|null;
  userId: string|null;
  id: string|null;
  created_at?: string|null;
}

interface Comment {
  commentById: string;
  comment: string;
  time: string;
}

interface BlogPostCardProps {
  blog: BlogPostType;
  likeCount: number;
  comments: Array<Comment>;
}

export default function BlogPostCard({ blog, likeCount, comments }: BlogPostCardProps) {
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
                {blog.title || blog.title == undefined ? blog.title :"this is the demo title of the blog"}
              </h2>
              <p className="text-muted-foreground mb-4 line-clamp-2 text-base sm:text-lg">
                {blog.description || blog.description == undefined ? blog.description:"this is the demo description of the blog"}
              </p>
              <div className="flex items-center space-x-3 mb-4">
                <Avatar className="w-8 h-8">
                  <AvatarImage
                    src="/placeholder.svg?height=40&width=40"
                    alt="Author"
                  />
                  <AvatarFallback>
                    {blog.title.charAt(0).toUpperCase()}
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
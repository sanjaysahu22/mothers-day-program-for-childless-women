import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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

export default function BlogPostCard({ blog }: { blog: Blog }) {
  const title = blog.BlogData?.title || "Untitled Blog";
  const description = blog.BlogData?.description || "No description available";
  const image = blog.BlogData?.image || "https://images.unsplash.com/photo-1631038591095-8660f2bd6734?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZmlsZSUyMHdpdGglMjBubyUyMGltYWdlfGVufDB8fDB8fHww";

  return (
    <Card key={blog.id} className="overflow-hidden transition-all h-1/2 hover:shadow-lg lg:space-y-8 ">
      <Link to={`/blog/${blog.id}`}>
        <CardContent className="py-3 px-6  lg:p-4">
          <div className="grid md:grid-cols-3 gap-4  lg:flex lg:flex-col lg:space-y-4">
            <div className="md:col-span-2 flex-grow">
              <h2 className="text-4xl font-semibold mb-2">{title}</h2>
              <p className="text-muted-foreground mb-4 line-clamp-2 text-xl">{description}</p>
              
              <div className="flex items-center space-x-3 mb-4">
                <Avatar className="w-8 h-8">
                  <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Author" />
                  <AvatarFallback>{blog.userid.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                <span className="font-medium">{blog.userid}</span>
              </div>
              
              <div className="flex flex-wrap justify-between w-3/4 text-sm text-black">
                <span>Published: {new Date(blog.created_at).toLocaleDateString()}</span>
               
                  <span >Likes: {blog.likes?.length || 0}</span>
                  <span>Comments: {blog.comments?.length || 0}</span>
              </div>
            </div>
            
            <div className="md:col-span-1 mb-4 md:mb-0">
              <img 
                src={image} 
                alt={title} 
                className="w-full h-48 object-cover rounded-md" 
              />
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}
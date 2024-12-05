import { useState } from "react";
import { MessageSquare } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import AxiosInstance from "@/utils/axios";
import { useNavigate } from "react-router-dom";

interface CommentSheetProps {
  comments: number;
  id: string;
}

const formatNumber = (num: number) => {
  return new Intl.NumberFormat("en-US", { notation: "compact" }).format(num);
};

export default function CommentSheet({ comments, id }: CommentSheetProps) {
  const [open, setIsOpen] = useState(false);
  const [comment, setcomment] = useState(" ");
  const navigate = useNavigate();   
  const token = document.cookie.split("=")[1];
  const commentblog = async () => {
    try {
      const response = await AxiosInstance.post(
        "/blog/comment",
        { id: id, comment: "good blog" },
        {
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      setcomment(" ");
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        navigate("/signin");
      }
      console.log(error);
    }
  };
  return (
    <Sheet open={open} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-2">
          <MessageSquare className="h-4 w-4" />
          <span>{formatNumber(comments)}</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>Comments ({formatNumber(comments)})</SheetTitle>
        </SheetHeader>
        <div className="mt-8">
          <div className="space-y-4">
            <div className="">
              <div className="bg-zinc-100 hover:bg-zinc-200 pb-2 p-1 mb-1 ">Share Your Thoughts</div>
              <textarea 
    className='h-32 w-full border border-gray-300 rounded p-2 resize-none' 
    placeholder="Write a comment..."
  ></textarea>
            </div>

            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex gap-4 hover:bg-zinc-200 p-2 rounded-lg">
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src="/api/placeholder/40/40"
                    alt={`User ${i + 1}`}
                  />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">User {i + 1}</span>
                      <span className="text-sm text-muted-foreground">
                        2 hours ago
                      </span>
                    </div>
                  </div>
                  <p className="mt-2 text-sm">
                    This is a sample comment. Great post!
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

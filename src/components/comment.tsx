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
import { Link, useNavigate } from "react-router-dom";

// Updated interface to match server response
interface CommentDetail {
  comment: string;
  time: Date;
}

interface CommentType {
  comments: CommentDetail[]; // Changed from comment to comments
  commentById: string;
}

interface CommentSheetProps {
  comments: CommentType[];
  id: string;
}

export default function CommentSheet({ comments, id }: CommentSheetProps) {
  const [open, setIsOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [commentList, setCommentList] = useState<CommentType[]>(comments || []);
  const navigate = useNavigate();
  const token = document.cookie.split("=")[1];

  const writeComment = async () => {
    if (!comment.trim()) return;
    try {
      const response = await AxiosInstance.post(
        "/blog/comment",
        { id, comment },
        {
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const newComment: CommentType = {
        commentById: "You", // Replace with actual username
        comments: [{ // Changed from comment to comments
          comment, 
          time: new Date() 
        }],
      };

      setCommentList((prev: CommentType[]) => [...prev, newComment]); 
      setComment(""); 
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        navigate("/signin");
      }
      console.error("Error writing comment:", error);
    }
  };

  // Calculate total comments count
  const totalComments = commentList.reduce((acc, c) => acc + (c.comments?.length || 0), 0);

  return (
    <Sheet open={open} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-2">
          <MessageSquare className="h-4 w-4" />
          <span>{totalComments}</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>Comments ({totalComments})</SheetTitle>
        </SheetHeader>
        <div className="mt-8">
          <div className="space-y-4">
            {/* Comment Input */}
            <div className="p-2">
              <textarea
                className="h-32 w-full border border-gray-300 rounded p-2 resize-none"
                placeholder="Write a comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <Button className="mt-2 w-full" variant="default" onClick={writeComment}>
                Submit Comment
              </Button>
            </div>

            {/* Scrollable Comments List */}
            <div className="max-h-[400px] overflow-y-auto space-y-4 p-2 border-t border-gray-200">
              {commentList.map((commentItem, index) =>
                (commentItem.comments || []).map((detail, detailIndex) => (
                  <div key={`${index}-${detailIndex}`} className="flex gap-4 hover:bg-zinc-200 p-2 rounded-lg">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="/api/placeholder/40/40" alt={commentItem.commentById} />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Link to={`/profile/${commentItem.commentById}`}>
                            <span className="font-semibold">{commentItem.commentById || "Unknown"}</span>
                          </Link>
                          <span className="text-sm text-muted-foreground">
                            {new Date(detail.time).toLocaleString()}
                          </span>
                        </div>
                      </div>
                      <p>{detail.comment}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
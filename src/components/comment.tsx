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

interface Comment {
  comment: string;
  commentById: string;
  time: string;
}
  
interface CommentSheetProps {
  comments: Array<Comment>;
  id: string;
}

export default function CommentSheet({ comments, id }: CommentSheetProps) {
  const [open, setIsOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [commentList, setCommentList] = useState(comments || []);
  const navigate = useNavigate();
  const token = document.cookie.split("=")[1];

  // Write comment function
  const writeComment = async () => {
    if (!comment.trim()) return; // Prevent empty comments
    try {
 await AxiosInstance.post(
        "/blog/comment",
        { id, comment },
        {
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const now = new Date();
      const formattedTime = now.toLocaleString("en-US", {
        dateStyle: "short", // Only date
        timeStyle: "short", // Hour and minute
      });
      const newComment: Comment = {
        comment,
        commentById: "You", // Replace with actual username from your context/auth
        time: formattedTime,
      };
      setCommentList((prev) => [newComment, ...prev]); // Add the new comment to the list
      setComment(""); // Clear the input
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        navigate("/signin");
      }
      console.error("Error writing comment:", error);
    }
  };
  
  return (
    <Sheet open={open} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-2">
          <MessageSquare className="h-4 w-4" />
          <span>{commentList.length}</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>Comments ({commentList.length})</SheetTitle>
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
              <Button
                className="mt-2 w-full"
                variant="default"
                onClick={writeComment}
              >
                Submit Comment
              </Button>
            </div>

            {/* Scrollable Comments List */}
            <div className="max-h-[400px] overflow-y-auto space-y-4 p-2 border-t border-gray-200">
              {commentList.map((comment, i) =>
                comment ? (
                  <div
                    key={i}
                    className="flex gap-4 hover:bg-zinc-200 p-2 rounded-lg"
                  >
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src="/api/placeholder/40/40"
                        alt={comment.commentById}
                      />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Link to={`/profile/${comment.commentById}`}>
                            <span className="font-semibold">
                              {comment.commentById || "Unknown"}
                            </span>
                          </Link>
                          <span className="text-sm text-muted-foreground">
                            {comment.time}
                          </span>
                        </div>
                      </div>
                      <p>{comment.comment}</p>
                    </div>
                  </div>
                ) : null
              )}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

import { useState } from "react";
import { Heart } from "lucide-react";
import AxiosInstance from "@/utils/axios";

interface LikeBlogProps {
  blogId: string;
  initialLikes: number;
}

export default function LikeBlog({ blogId, initialLikes }: LikeBlogProps) {
  const [like, setLike] = useState(false);
  const [likeCount, setLikeCount] = useState(initialLikes);
  const [loading, setLoading] = useState(false);
  console.log(likeCount);
  const token = document.cookie.split("=")[1];

  const handleLike = async () => {
    if (loading) return; 
    setLoading(true);
    try {
      await AxiosInstance.post(
        "/blog/like",
        { id: blogId },
        {
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setLike(true);
      setLikeCount((prev) => prev + 1);
    } catch (error) {
      console.error("Error liking blog:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      className={`py-2 px-3 rounded-md flex items-center gap-2 transition-colors `}
      onClick={(e) => {
        e.preventDefault();
        handleLike();
      }}
    >
      <Heart size={18} fill={like ? "red" : "none"} stroke="black" />
      <span>{likeCount}</span>
    </button>
  );
}

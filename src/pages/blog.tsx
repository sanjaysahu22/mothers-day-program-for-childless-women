import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import AxiosInstance from "@/utils/axios";
import Header from "@/components/header";
import CommentSheet from "@/components/comment";
import Loading from "@/components/loading";
import LikeBlog from "@/components/likeblog";
import { useUser } from "@/utils/usercontext";

interface CommentDetail {
  comment: string;
  time: Date;
}

interface CommentType {
  comments: CommentDetail[];
  commentById: string;
}

interface BlogDetailsType {
  id: string;
  imageUrl: string | undefined;
  blogData:{
    title: string | undefined;
    description: string | undefined;
    created_at: string;
    content:string;
  } ;
  comment: CommentType[]; 
  userid: string;
  _count?: {
    likes: number;  
    comment: number;
  };
}


export default function Blog() {
  const [blog, setBlog] = useState<BlogDetailsType | null>(null);
  const [likeCount, setLikeCount] = useState<number>(0);
  const [commentsState, setComments] = useState<Array<CommentType>>([]);
  const [loading, setLoading] = useState(false);
 const { userDetails } = useUser();

  const { id } = useParams();
  const navigate = useNavigate();
  const token = document.cookie.split("=")[1];

  const getBlog = async () => {
    try {
      setLoading(true);
      const response = await AxiosInstance.post(
        "/blog/getblog",
        { id },
        {
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const fetchedBlog = response.data.result;
      setBlog(fetchedBlog);
      console.log(fetchedBlog);
      
      const likes = fetchedBlog._count.likes;
      setLikeCount(likes);
      console.log(likes)
      // Correctly set comments based on server response
      setComments(fetchedBlog.comment || []);
      console.log("Comments:", fetchedBlog.comment);
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        navigate("/signin");
      }
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBlog();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-zinc-200">
      <Header />
      {loading ? (
        <div className="flex-grow flex justify-center items-center">
          <Loading />
        </div>
      ) : blog ? (
        <div className="w-full flex justify-center mt-20 py-8">
          <article className="w-full max-w-4xl mx-4 bg-white rounded-lg shadow-md overflow-hidden">
            <header className="p-6 space-y-4">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                {blog.blogData.title ? blog.blogData.title : " A PROJECT TITLE "}
              </h1>
              <p className="text-lg text-gray-600">{blog.blogData.description ? blog.blogData.description : " SHORT DESCRIPTION ABOUT PROJECT IN TWO THREE LINES"}</p>
              <div className="bg-zinc-100 flex rounded-lg justify-around p-3">
                <Link to={`/profile/${blog.userid}`} className="flex items-center hover:bg-white px-3 py-2 rounded-lg transition-colors">
                  <span>Author:</span>
                  <div className="h-6 ml-2 mr-1 w-6 rounded-full bg-red-300"></div>
                  <span className="text-sm font-medium">{blog.userid ? blog.userid : "sanjay sahu"}</span>
                </Link>
                
                <LikeBlog blogId={blog.id} initialLikes={likeCount} />
                <CommentSheet comments={commentsState} id={id || "f00471b8-0c8e-499d-ba67-377fdfd22d16"} />
              </div>
            </header>
            <div className="p-6 prose prose-gray max-w-none">
              <p className="text-gray-800 whitespace-pre-line">{blog.blogData.content || ""}</p>
            </div>
          </article>
        </div>
      ) : (
        <div className="flex-grow flex justify-center items-center">
          <p className="text-lg text-gray-600">No Blog Data Found</p>
        </div>
      )}
    </div>
  );
}
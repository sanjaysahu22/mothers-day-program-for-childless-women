import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import AxiosInstance from "@/utils/axios";
import Header from "@/components/header";
import CommentSheet from "@/components/comment";
import Loading from "@/components/loading";
import LikeBlog from "@/components/likeblog";

interface BlogDetailsType {
  id: string;
  title:string|undefined;
  description:string|undefined;
  imageUrl:string|undefined;
  BlogData: string | null;
  created_at: Date;
  likes:  likesType[];
  comment: [];
  userId: string;
}
interface likesType{
    time: Date;
    likeById: string;
    likeOnId: string;
  }
 interface CommentType{

    comment:commentDetailType[];
    commentOnId: string;
    commentById: string;
 } 
 interface commentDetailType{
    comment: string;
    time: Date;

 }

export default function Blog() {
  const [blog, setBlog] = useState<BlogDetailsType | null>(null);
  const [likeCount, setLikeCount] = useState<number>(0);
  const [commentsstate, setComments] = useState<Array<CommentType>>([]);
  const [loading, setLoading] = useState(false);

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
      console.log(fetchedBlog) 
      const likes =response.data.result.likes;

      setLikeCount(likes.length);
      setComments(response.data.result.comment);
      console.log( "line 68" ,response.data.result.comment.comments);
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
                {blog.title?blog.title:" A PROJECT TITLE "}
              </h1>
              <p className="text-lg text-gray-600">{blog.description?blog.description:" SHORT DESCRIPTION ABOUT PROJECT IN TWO THREE LINES"}</p>
              <div className="bg-zinc-100 flex rounded-lg justify-around p-3">
                <Link to={`/profile/${blog.userId}`} className="flex items-center hover:bg-white px-3 py-2 rounded-lg transition-colors">
                  <span>Author:</span>
                  <div className="h-6 ml-2 mr-1 w-6 rounded-full bg-red-300"></div>
                  <span className="text-sm font-medium">{blog.userId?blog.userId:"sanjay sahu"}</span>
                </Link>
                <LikeBlog blogId={blog.id} initialLikes={likeCount} />
                <CommentSheet comments={commentsstate} id={id?id:"f00471b8-0c8e-499d-ba67-377fdfd22d16"} />
              </div>
            </header>
            <div className="relative aspect-video">
              <img
                src={blog.imageUrl || ""}
                alt="Blog post cover image"
                className="object-cover w-full h-full"
              />
            </div>
            <div className="p-6 prose prose-gray max-w-none">
              <p className="text-gray-800 whitespace-pre-line">{blog.description || ""}</p>
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
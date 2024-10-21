import { Link, useLocation } from "react-router-dom";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Input } from "./ui/input";
import { BookText, Pencil } from "lucide-react";

export default function CategorySuggestions({}) {
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 bg-background z-10 border-b">
      {location.pathname == "/create" ? (
        <div className="container mx-auto p-4 flex justify-between items-center">
          <div className="font-light  text-2xl ">VACUUM</div>
          <div>
            Creating Draft In{" "}
            <span className=" font-light  text-black text-xl  bg-zinc-200 py-1 px-2 text-center rounded-lg justify-center  items-center    ">
              Sanjay Sahu
            </span>
          </div>
          <Link to="/profile">
            <Avatar>
              <AvatarImage src="/placeholder.svg" alt="User" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </Link>
        </div>
      ) : (
        <div className="container mx-auto p-4 flex justify-between items-center">
          <div className="font-light  text-2xl ">VACUUM</div>
          <Input className="max-w-md" placeholder="Search blogs" />
          <div className="flex items-center gap-3">
            <Link to="/create">
              <Pencil />
            </Link>
            <Link to="/category/blogs">
              <BookText />
            </Link>
            <Link to="/profile">
              <Avatar>
                <AvatarImage src="/placeholder.svg" alt="User" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

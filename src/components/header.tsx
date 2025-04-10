import { Link, useLocation } from "react-router-dom";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Input } from "./ui/input";
import { BookText, Pencil, Menu, Search, X } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { useUser } from "@/utils/usercontext";

export default function Header() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const userdetails  = useUser();
  console.log(userdetails)
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  const renderCreateDraftHeader = () => (
    <div className="container mx-auto px-4 py-3 flex justify-between items-center">
      <div className="font-light text-xl md:text-2xl">VACUUM</div>
      <div className="text-sm md:text-base">
        Creating Draft {" "}
     
      </div>
      <Link to={`/profile/${userdetails.userDetails.username}`}>
        <Avatar className="w-8 h-8 md:w-10 md:h-10">
          <AvatarImage src="/placeholder.svg" alt="User" />
          <AvatarFallback>{userdetails.userDetails.username.charAt(0)}</AvatarFallback>
        </Avatar>
      </Link>
    </div>
  );

  const renderDefaultHeader = () => (
    <>
      {/* Mobile and Desktop Logo */}
      <div className="flex items-center justify-between px-4 py-3">
        <div className="font-light text-xl md:text-2xl">VACUUM</div>
        
        {/* Mobile Search and Menu Toggles */}
        <div className="flex items-center gap-3 md:hidden">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleSearch}
          >
            <Search className="h-5 w-5" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-4 lg:gap-6">
          <Input 
            className="max-w-md" 
            placeholder="Search blogs" 
          />
          <div className="flex items-center gap-3 lg:gap-4">
            <Link to="/create" className="hover:bg-secondary p-2 rounded-md">
              <Pencil className="h-5 w-5" />
            </Link>
            <Link to="/myblogs" className="hover:bg-secondary p-2 rounded-md">
              <BookText className="h-5 w-5" />
            </Link>
            <Link to={`/profile/${userdetails.userDetails.username}`}>
              <Avatar className="w-8 h-8 lg:w-10 lg:h-10">
                <AvatarImage src="/placeholder.svg" alt="User" />
                <AvatarFallback>{userdetails.userDetails.username.charAt(0)}</AvatarFallback>
              </Avatar>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Search */}
      {isSearchVisible && (
        <div className="md:hidden px-4 pb-3">
          <Input 
            className="w-full" 
            placeholder="Search blogs" 
          />
        </div>
      )}

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background border-t px-4 py-3 space-y-3">
          <div className="flex flex-col gap-3">
            <Link 
              to="/create" 
              className="flex items-center gap-2 p-2 hover:bg-secondary rounded-md"
              onClick={toggleMobileMenu}
            >
              <Pencil className="h-5 w-5" /> Create Blog
            </Link>
            <Link 
              to="/myblogs" 
              className="flex items-center gap-2 p-2 hover:bg-secondary rounded-md"
              onClick={toggleMobileMenu}
            >
              <BookText className="h-5 w-5" /> My Blogs
            </Link>
            <Link 
              to="/profile" 
              className="flex items-center gap-2 p-2 hover:bg-secondary rounded-md"
              onClick={toggleMobileMenu}
            >
              Profile
            </Link>
          </div>
        </div>
      )}
    </>
  );

  return (
    <header className="fixed top-0 left-0 right-0 bg-background z-50 border-b">
      {location.pathname === "/create" 
        ? renderCreateDraftHeader() 
        : renderDefaultHeader()}
    </header>
  );
}
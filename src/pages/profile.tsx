'use client'
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Header from "@/components/header"
import { SecuritySettings } from "@/components/changepassword"
import AxiosInstance from "@/utils/axios"
import Loading from "@/components/loading"

interface Followtype {
  email: string; 
  username: string;
  followersCount: number;
  followingCount: number;
}

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

async function fetchBlogs() {
  try {
    const token = document.cookie.split("=")[1];
    if (!token) {
      throw new Error("No authentication token found");
    }
    const response = await AxiosInstance.post(
      "blog/myblogs",
      {},
      {
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data.blogs;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return [];
  }
}

async function fetchuser() {
  try {
    const token = document.cookie.split("=")[1];
    if (!token) {
      throw new Error("No authentication token found");
    }
    const response = await AxiosInstance.post(
      "user/getuser",
      {},
      {
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching user details:", error);
    return null;
  }
}

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [blogs, setBlogs] = useState<Array<Blog>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userdetails, setuserdetails] = useState<Followtype | null>(null);
  
  useEffect(() => {
    const loadBlogs = async () => {
      setIsLoading(true);
      try {
        const fetchedBlogs = await fetchBlogs();
        setBlogs(fetchedBlogs);
        const fetcheduserdetails: Followtype | null = await fetchuser();
        if (fetcheduserdetails) setuserdetails(fetcheduserdetails);
      } catch (error) {
        console.error("Failed to load data", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadBlogs();
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex-grow w-3/4 bg-zinc-100 mx-auto p-4 pt-20">
        <div className="relative h-48 rounded-t-lg overflow-visible mb-16 w-full bg-gradient-to-r from-purple-300 to-purple-800">
          <div className="absolute -bottom-12 left-8 z-10">
            <Avatar className="w-24 h-24 border-4 border-white">
              <AvatarImage
                src="https://plus.unsplash.com/premium_photo-1709311452215-496c6740ca59?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8"
                alt="Profile picture"
              />
              <AvatarFallback>UN</AvatarFallback>
            </Avatar>
          </div>
        </div>
        
        <div className="flex justify-between items-center mb-6">
          {userdetails ? (
            <div className="flex items-center gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold">{userdetails.followersCount}</div>
                <div className="text-sm text-muted-foreground">Following</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{userdetails.followingCount}</div>
                <div className="text-sm text-muted-foreground">Followers</div>
              </div>
            </div>
          ) : (
            <Loading />
          )}
          <Button onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? "Save Changes" : "Edit Profile"}
          </Button>
        </div>

        <Tabs defaultValue="details" className="w-full">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="details">My Details</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="blogs">Blogs</TabsTrigger>
          </TabsList>
          <TabsContent value="details">
            <Card>
              <CardContent className="space-y-4 pt-6">
                {userdetails ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <Input id="username" defaultValue={userdetails.username} readOnly={!isEditing} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="role">Current Role</Label>
                      <Input defaultValue="Software Engineer" readOnly={!isEditing} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input defaultValue={userdetails.email} readOnly={!isEditing} />
                    </div>
                  </div>
                ) : (
                  <Loading />
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <SecuritySettings />
          </TabsContent>

          <TabsContent value="blogs">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {isLoading ? (
                    <p>Loading blogs...</p>
                  ) : blogs.length > 0 ? (
                    blogs.map((blog, index) => (
                      <div className="border rounded-lg p-4 hover:bg-muted/50 cursor-pointer" key={index}>
                        <h3 className="font-semibold">
                          {blog.BlogData.title ? blog.BlogData.title : "This is a demo blog title"}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Published on {new Date(blog.created_at).toISOString().split('T')[0]}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p>No blogs available</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

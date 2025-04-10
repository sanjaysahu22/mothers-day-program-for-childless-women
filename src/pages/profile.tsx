import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Header from "@/components/header";
import { SecuritySettings } from "@/components/changepassword";
import AxiosInstance from "@/utils/axios";
import { useUser } from "@/utils/usercontext";
import { Link, useParams } from "react-router-dom";
import { profile } from "node:console";

interface User {
  id: string;
  username: string;
  email: string;
  blogs: {
    id: string;
    userId: string;
    blogData: {
      title: string;
      description: string;
      created_at: string;
    }
  }[];
  _count: {
    followers: number;
    following: number;
  };
}

async function fetchUser(id: string) {
  try {
    const token = document.cookie.split("=")[1];
    if (!token) {
      throw new Error("No authentication token found");
    }
    const response = await AxiosInstance.post(
      "user/getuser_details",
      { id: id },
      {
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response.data.user);
    return response.data.user;
  } catch (error) {
    console.error("Error fetching user details:", error);
    return null;
  }
}

async function followUser(userId: string) {
  try {
    const token = document.cookie.split("=")[1];
    if (!token) {
      throw new Error("No authentication token found");
    }
    const response = await AxiosInstance.post(
      "act/follow",
      { followingId: userId },
      {
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error following user:", error);
    return null;
  }
}

async function unfollowUser(userId: string) {
  try {
    const token = document.cookie.split("=")[1];
    if (!token) {
      throw new Error("No authentication token found");
    }
    const response = await AxiosInstance.post(
      "act/unfollow",
      { followingId: userId },
      {
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error unfollowing user:", error);
    return null;
  }
}

async function checkFollowStatus(userId: string) {
  try {
    const token = document.cookie.split("=")[1];
    if (!token) {
      throw new Error("No authentication token found");
    }
    console.log(userId)
    const response = await AxiosInstance.post(
      "act/is_following",
      { followingId: userId },
      {
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data.is_following;
  } catch (error) {
    console.error("Error checking follow status:", error);
    return false;
  }
}
export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userdetails, setUserDetails] = useState<User | null>(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followLoading, setFollowLoading] = useState(false);
  const { userDetails } = useUser();

  // Get userId from URL params (assuming you'll implement this)
  const { id } = useParams<{ id: string }>(); // Extracting id from params
  
  // Check if viewing own profile
  const isOwnProfile = id === userDetails.id;
const  profileID= userDetails.id;
  useEffect(() => {
    const loadUser = async () => {
      setIsLoading(true);
      try {
        if (profileID ) {
          const fetchedUser = await fetchUser(profileID);
          setUserDetails(fetchedUser);
          
          // Check follow status if viewing someone else's profile
          if (!isOwnProfile && id) {
            const followStatus = await checkFollowStatus(id);
            setIsFollowing(followStatus);
          }
        }
      } catch (error) {
        console.error("Failed to load data", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadUser();
  }, [id, userDetails.id]);



  const handleFollowToggle = async () => {
    if (!userdetails) return;
    
    setFollowLoading(true);
    try {
      if (isFollowing) {
        await unfollowUser(userdetails.id);
        setIsFollowing(false);
        // Update follower count
        setUserDetails(prev => prev ? {
          ...prev,
          _count: {
            ...prev._count,
            followers: prev._count.followers - 1
          }
        } : null);
      } else {
        await followUser(userdetails.id);
        setIsFollowing(true);
        // Update follower count
        setUserDetails(prev => prev ? {
          ...prev,
          _count: {
            ...prev._count,
            followers: prev._count.followers + 1
          }
        } : null);
      }
    } catch (error) {
      console.error("Error toggling follow status:", error);
    } finally {
      setFollowLoading(false);
    }
  };
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
                <div className="text-2xl font-bold">{userdetails._count.following}</div>
                <div className="text-sm text-muted-foreground">Following</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{userdetails._count.followers}</div>
                <div className="text-sm text-muted-foreground">Followers</div>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold">0</div>
                <div className="text-sm text-muted-foreground">Following</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">0</div>
                <div className="text-sm text-muted-foreground">Followers</div>
              </div>
            </div>
          )}
          {/* Show Edit button only on own profile, Follow button on others' profiles */}
          {isOwnProfile ? (
            <Button onClick={() => setIsEditing(!isEditing)}>
              {isEditing ? "Save Changes" : "Edit Profile"}
            </Button>
          ) : (
            <Button 
              onClick={handleFollowToggle}
              disabled={followLoading}
              variant={isFollowing ? "outline" : "default"}
            >
              {followLoading ? "Loading..." : isFollowing ? "Following" : "Follow"}
            </Button>
          )}
        </div>
        <Tabs defaultValue="details" className="w-full">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="details">My Details</TabsTrigger>
            {/* Only show Security tab on own profile */}
            {isOwnProfile && <TabsTrigger value="security">Security</TabsTrigger>}
            <TabsTrigger value="blogs">Blogs</TabsTrigger>
          </TabsList>

          <TabsContent value="details">
            <Card>
              <CardContent className="space-y-4 pt-6">
                {userdetails ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <Input 
                        id="username" 
                        defaultValue={userdetails.username} 
                        readOnly={!isEditing || !isOwnProfile} 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="role">Current Role</Label>
                      <Input 
                        defaultValue="Software Engineer" 
                        readOnly={!isEditing || !isOwnProfile} 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        defaultValue={userdetails.email} 
                        readOnly={!isEditing || !isOwnProfile} 
                      />
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[...Array(3)].map((_, index) => (
                      <div className="space-y-2" key={index}>
                        <div className="h-4 w-24 bg-gray-300 animate-pulse rounded" />
                        <div className="h-10 w-full bg-gray-200 animate-pulse rounded" />
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Only render Security tab content on own profile */}
            {isOwnProfile && (
              <TabsContent value="security">
                <SecuritySettings />
              </TabsContent>
            )}

          <TabsContent value="blogs">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {isLoading ? (
                    <div className="space-y-4">
                      {[...Array(3)].map((_, index) => (
                        <div className="border rounded-lg p-4 bg-gray-100 animate-pulse" key={index}>
                          <div className="h-4 w-3/4 bg-gray-300 animate-pulse rounded mb-2"></div>
                          <div className="h-3 w-1/2 bg-gray-200 animate-pulse rounded"></div>
                        </div>
                      ))}
                    </div>
                  ) : userdetails?.blogs?.length ? (
                    userdetails.blogs.map((blog) => (
                      <Link to={`/blog/${blog.id}`} className="m-1">
                      <div className="border rounded-lg p-4 hover:bg-muted/50 cursor-pointer" key={blog.id}>
                        <h3 className="font-semibold">
                         Title: {blog.blogData.title || "This is a demo blog title"}
                        </h3>
                        <h3 className="font-semibold">
                        Subject: {blog.blogData.description || "This is a demo blog title"}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                        Published on {new Date(blog.blogData.created_at).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                        })}
                        </p>
                      </div>
                      </Link>
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
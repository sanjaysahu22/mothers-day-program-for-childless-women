import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AxiosInstance from "@/utils/axios";
import { useState, useEffect } from "react";
import FollowComponent from "./followuser";
import PeopleSuggestionsSkeleton from "./shimmers/peoplesuggestskeleton";

interface UserInterface {
  username: string;
  image: string;
  id: string;
}

async function fetchSuggestedUsers() {
  const token = document.cookie.split("=")[1];
  try {
    const response = await AxiosInstance.post(
      "/act/suggestuser",
      {},
      {
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const usersArray = response.data.result;
    return Array.isArray(usersArray) ? usersArray : [];
  } catch (error: any) {
    console.error("Error fetching suggested users:", error);
    return [];
  }
}

export default function PeopleSuggestions() {
  const [users, setUsers] = useState<UserInterface[]>([]); 
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadSuggestedUsers = async () => {
      setIsLoading(true);
      try {
        const fetchedUsers = await fetchSuggestedUsers();
        setUsers(fetchedUsers);
      } catch (error) {
        console.error("Failed to load suggested users", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadSuggestedUsers();
  }, []); 

  if (isLoading) {
    return <PeopleSuggestionsSkeleton />;
  }

  if (users.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-8">
        No suggested users at the moment.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl lg:text-2xl font-bold">Suggesting peoples:</h2>
      <div className="space-y-4">
        {users.map((user: UserInterface, index: number) => (
          <div
            key={index}
            className="flex items-center space-x-4 bg-secondary p-3 lg:p-4 rounded-lg"
          >
            <Avatar className="w-10 h-10 lg:w-12 lg:h-12">
              <AvatarImage src={user.image} alt={user.username} />
              <AvatarFallback className="bg-white">
                {user.username.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-grow">
              <h3 className="font-semibold text-sm lg:text-base">
                {user.username}
              </h3>
              <p className="text-xs lg:text-sm text-muted-foreground">
                SDE:2 google
              </p>
            </div>
            <FollowComponent id={user.id} />
          </div>
        ))}
      </div>
    </div>
  );
}

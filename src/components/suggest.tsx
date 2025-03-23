import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AxiosInstance from "@/utils/axios";
import { useState, useEffect } from "react";
import FollowComponent from "./followuser";
import PeopleSuggestionsSkeleton from "./shimmers/peoplesuggestskeleton";
import {toast} from 'sonner';
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
      <h2 className="text-lg sm:text-xl md:text-2xl font-bold">Suggested People:</h2>
      <div className="space-y-3 sm:space-y-4">
        {users.map((user: UserInterface, index: number) => (
          <div
            key={index}
            className="flex items-center space-x-3 sm:space-x-4 bg-secondary p-3 sm:p-4 hover:bg-zinc-200 hover:shadow-md transition-all duration-300 rounded-lg"
          >
            <Avatar className="w-8 h-8 sm:w-10 sm:h-10">
              <AvatarImage src={user.image} alt={user.username} />
              <AvatarFallback className="bg-white">
                {user.username.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-grow">
              <h3 className="font-semibold text-xs sm:text-sm md:text-base">
                {user.username}
              </h3>
              <p className="text-[10px] sm:text-xs text-muted-foreground">
                SDE:2 Google
              </p>
            </div>
            <FollowComponent id={user.username} />
          </div>
        ))}
      </div>
    </div>
  );
}
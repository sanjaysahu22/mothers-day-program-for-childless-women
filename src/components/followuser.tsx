import AxiosInstance from "@/utils/axios";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const unfollowuserapi = async ({ id, navigate }: { id: string; navigate: Function }) => {
  try {
    const token = document.cookie.split("=")[1];
    const response = await AxiosInstance.post(
      "blog/unfollow",
      { id },
      {
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      navigate("/signin");
    }
    console.error("Error unfollowing user:", error);
    return null;
  }
};

const followuserapi = async ({ id, navigate }: { id: string; navigate: Function }) => {
  try {
    const token = document.cookie.split("=")[1];
    const response = await AxiosInstance.post(
      'act/follow',
      { id },
      {
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response.data)
    return response;
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      navigate("/signin");
    }
    console.error("Error following user:", error);
    return null;
  }
};

const FollowComponent = ({ id }: { id: string }) => {
  const [follow, setFollow] = useState(false);
  const navigate = useNavigate();

  const followButtonHandler = async () => {
    if (!follow) {
      const response = await followuserapi({ id, navigate });
      if (response && response.status === 200) {
        setFollow(true);
        console.log("Followed successfully");
      } else {
        console.error("Failed to follow:", response);
      }
    } else {
      const response = await unfollowuserapi({ id, navigate });
      if (response && response.status === 200) {
        setFollow(false);
        console.log("Unfollowed successfully");
      } else {
        console.error("Failed to unfollow:", response);
      }
    }
  };

  return (
    <div>
      <Button
        variant="outline"
        className="hover:bg-zinc-500 hover:text-white"
        size="sm"
        onClick={followButtonHandler}
      >
        {follow ? "Unfollow" : "Follow"}
      </Button>
    </div>
  );
};

export default FollowComponent;

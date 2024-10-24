import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import AxiosInstance from "@/utils/axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PeopleSuggestions() {
  const people = [
    {
      name: "sanjay sahu",
      role: "ui/ux , web developer , currently as google ceo",
      image: "/placeholder.svg",
      id:"1"
    },
    {
      name: "sanjay sahu",
      role: "ui/ux , web developer , currently as google ceo",
      image: "/placeholder.svg",
      id:'2'
    },
  ];
  const [peoples, setpeoples] = useState(people);
  const suggestuser = async () => {
    try {
      let token = document.cookie.split("=")[1];
      const response = await AxiosInstance.post(
      '/act/suggestuser',
        {},
        {  params:{
          id:'1'
         } ,
          headers: {
            'Authorization': `${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setpeoples(response.data);
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        const nav = useNavigate();
        nav("/signin");
      }
      console.log(error);
    }
  };
  useEffect(() => {
    suggestuser();
  }, []);
  console.log(peoples);
  const id = 1;
  const followuser = async()=>{
    try {
      let token = document.cookie.split("=")[1];
      const response = await AxiosInstance.post(
        "/act/follow",
        {id},
        {
          headers: {
            'Authorization': `${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data , response.data.status);
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        const nav = useNavigate();
        nav("/signin");
      }
      console.log(error);
    }
  }
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Suggesting peoples:</h2>
      <div className="space-y-4">
        {peoples !== null ? (
          people.map((person, index) => (
            <div
              key={index}
              className="flex items-center space-x-4 bg-secondary p-4 rounded-lg"
            >
              <Avatar className="w-12 h-12 ">
                <AvatarImage src={person.image} alt={person.name} />
                <AvatarFallback className="bg-white">
                  {person.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-grow">
                <h3 className="font-semibold">{person.name}</h3>
                <p className="text-sm text-muted-foreground ">{person.role}</p>
              </div>
              <Button
                variant="outline"
                className=" hover:bg-zinc-500 hover:text-white"
                size="sm"
                onClick={followuser}
              >
                Follow
              </Button>
            </div>
          ))
        ) : (
          <div>Loading ...</div>
        )}
      </div>
    </div>
  );
}

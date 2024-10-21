import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

export default function PeopleSuggestions() {
  const people = [
    {
      name: "sanjay sahu",
      role: "ui/ux , web developer , currently as google ceo",
      image: "/placeholder.svg",
    },
      
  ]

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Suggesting peoples:</h2>
      <div className="space-y-4">
        {people.map((person, index) => (
          <div key={index} className="flex items-center space-x-4 bg-secondary p-4 rounded-lg">
            <Avatar className="w-12 h-12 ">
              <AvatarImage src={person.image}  alt={person.name} />
              <AvatarFallback className="bg-white">{person.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-grow">
              <h3 className="font-semibold">{person.name}</h3>
              <p className="text-sm text-muted-foreground ">{person.role}</p>
            </div>
            <Button variant="outline" className=" hover:bg-zinc-500 hover:text-white" size="sm">
              Follow
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}
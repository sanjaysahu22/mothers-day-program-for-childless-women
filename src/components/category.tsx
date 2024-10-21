import { Button } from "@/components/ui/button"

export default function CategorySuggestions() {
  const categories = [
    "Google",
    "Entertainment",
    "Car",
    "Drugs",
    "Technology",
    "Politics",
    "Relationships",
    "finance" ,
    "stocks"  
  ]

  return (
    <div className="space-y-4 bg">
      <h2 className="text-2xl font-bold">Choose your types:</h2>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button key={category} variant="secondary" className="rounded-full">
            {category}
          </Button>
        ))}
      </div>
    </div>
  )
}

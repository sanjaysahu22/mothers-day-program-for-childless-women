import { Button } from "@/components/ui/button"
import AxiosInstance from "@/utils/axios";
  
export default function CategorySuggestions() {
  const token = document.cookie.split('=')[1]; 
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
  const addcategory = async (category: string) => {
    try {
      const response = await AxiosInstance.post(
        "/blog/category",  // Dynamically insert the category into the URL
       category ,  // Request body (can be an object if needed)
        {
          headers: {
            'Authorization': `${token}`,  // Ensure token is formatted correctly with 'Bearer'
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('Category added:', response.data);
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };
   
  
  return (
    <div className="space-y-4 bg">
      <h2 className="text-2xl font-bold">Choose your types:</h2>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button key={category} variant="secondary" onClick={()=>addcategory(category)} className="rounded-full">
            {category} 
          </Button>
        ))}
      </div>
    </div>
  )
}

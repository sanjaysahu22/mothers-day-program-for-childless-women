import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner"; // ✅ Import Sonner
import AxiosInstance from "@/utils/axios";

export default function CategorySuggestions() {
  const token = document.cookie.split("=")[1];

  const categories = [
    "Google",
    "Entertainment",
    "Car",
    "Drugs",
    "Technology",
    "Politics",
    "Relationships",
    "Finance",
    "Stocks",
  ];

  const [loadingCategory, setLoadingCategory] = useState<string | null>(null);

  const addCategory = async (category: string) => {
    setLoadingCategory(category);
    try {
      const response = await AxiosInstance.post(
        "/act/addcategory",
        { category },
        {
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      toast.success(`${category} added successfully!`);
      return response.data;
    } catch (error) {
      console.error("Error adding category:", error);
      toast.error(`Failed to add ${category}. Try again.`);
    } finally {
      setLoadingCategory(null);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Choose your types:</h2>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category}
            variant="secondary"
            onClick={() => addCategory(category)}
            className="rounded-full hover:bg-zinc-400 flex items-center gap-2"
            disabled={loadingCategory === category}
          >
            {category}
            {loadingCategory === category && (
              <div className="w-4 h-4 border-2 border-current border-opacity-25 border-t-current rounded-full animate-spin" />
            )}
          </Button>
        ))}
      </div>
    </div>
  );
}

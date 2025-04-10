import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import AxiosInstance from '@/utils/axios'
import { useNavigate } from 'react-router-dom'

type Category = 'technology' | 'lifestyle' | 'travel' | 'food' | 'other'
type CustomCategory = Category | string

type FormData = {
  title: string;
  description: string;
  categories: CustomCategory[];
  otherCategory: string;
};

const CATEGORIES: { value: Category; label: string }[] = [
  { value: 'technology', label: 'Technology' },
  { value: 'lifestyle', label: 'Lifestyle' },
  { value: 'travel', label: 'Travel' },
  { value: 'food', label: 'Food' },
  { value: 'other', label: 'Other' },
]

  export default function Saveblog({ generateHtml }: any) {
    const [isOpen, setIsOpen] = useState(false)
    const { register, handleSubmit, reset, control, watch } = useForm<FormData>({
      defaultValues: {
        title: '',
        description: '',
        categories: [],
        otherCategory: ''
      }
    })
    const navigate = useNavigate();
    const selectedCategories = watch('categories')
    console.log(generateHtml)
    const onSubmit = (data: FormData) => {
      const categories = data.categories.includes('other') && data.otherCategory
        ? [...data.categories.filter((cat): cat is CustomCategory => cat !== 'other'), data.otherCategory as CustomCategory]
      : data.categories;
  
    const submissionData = {
      ...data,
      categories
    };
    console.log(submissionData) 
    Send_data(submissionData)
    setIsOpen(false);
    generateHtml();
    reset();
  };
  const Send_data = async (form_Data: FormData) => {
    try {
      // Prepare blog creation data
      const create_json = { 
        title: form_Data.title, 
        description: form_Data.description, 
        content: generateHtml() ,
        category: form_Data.categories 
      };
  
      // Create blog first
      const blogResponse = await AxiosInstance.post('blog/create_blog', {
        title: create_json.title,
        description: create_json.description,
        content: create_json.content  ,
        category:create_json.category
      }, {
        headers: {
          'Authorization': `${document.cookie.split("=")[1]}`,
          "Content-Type": "application/json",
        },
      });
  
      const blogId = blogResponse.data.blog.id;
 
  
      console.log('Blog Creation Response:', blogResponse.data);
  
      return {
        blogId,
        blogResponse: blogResponse.data,
      };
  
    } catch (error: any) {
      // Centralized error handling
      if (error.response) {
        switch (error.response.status) {
          case 401:
            // Unauthorized - redirect to signin
            navigate('/signin');
            break;
          case 400:
            // Bad request - log specific errors
            console.error('Bad Request:', error.response.data);
            break;
          case 500:
            // Server error
            console.error('Server Error:', error.response.data);
            break;
          default:
            console.error('Unexpected Error:', error.response.data);
        }
      } else if (error.request) {
        // Request made but no response received
        console.error('No response received:', error.request);
      } else {
        // Error in setting up the request
        console.error('Error setting up request:', error.message);
      }
  
      // Optionally rethrow or handle error as needed
      throw error;
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Save</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Blog Post</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              {...register("title", { required: "Title is required" })}
              placeholder="Enter blog post title"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Short Description</Label>
            <Textarea
              id="description"
              {...register("description", { required: "Description is required" })}
              placeholder="Enter a short description"
            />
          </div>
          <div className="space-y-2">
            <Label>Categories</Label>
            <div className="space-y-2">
              {CATEGORIES.map((category) => (
                <div key={category.value} className="flex items-center space-x-2">
                  <Controller
                    control={control}
                    name="categories"
                    render={({ field: { onChange, value } }) => (
                      <Checkbox
                        id={category.value}
                        checked={value?.includes(category.value) || false}
                        onCheckedChange={(checked: boolean) => {
                          onChange(
                            checked
                              ? [...value, category.value]
                              : value.filter((c: CustomCategory) => c !== category.value)
                          )
                        }}
                      />
                    )}
                  />
                  <Label htmlFor={category.value}>{category.label}</Label>
                </div>
              ))}
            </div>
          </div>
          {selectedCategories?.includes('other') && (
            <div className="space-y-2">
              <Label htmlFor="otherCategory">Specify Other Category</Label>
              <Input
                id="otherCategory"
                {...register("otherCategory", { required: "Please specify the other category" })}
                placeholder="Enter custom category"
              />
            </div>
          )}
          <Button type="submit" className="w-full">Submit</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
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
    const create_json = { title: form_Data.title, description: form_Data.description , content:generateHtml() }
    const category_json = { category: form_Data.categories }
    let token = document.cookie.split("=")[1]
    console.log(create_json  ,"line 63")
    console.log
    try {
      const response = await AxiosInstance.post('blog/create_blog', {create_json}, {
        headers: {
          'Authorization': `${token}`,
          "Content-Type": "application/json",
        },
      })
      console.log(response.data)
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        navigate('/signin')
      }
      console.log(error)
    }

    try {
      const response = await AxiosInstance.post('blog/category', {category_json}, {
        headers: {
          'Authorization': `${token}`,
          "Content-Type": "application/json",
        },
      })
      console.log(response.data)
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        navigate('/signin')
      }
      console.log(error)
    }
  }

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
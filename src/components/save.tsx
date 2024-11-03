'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

type Category = 'technology' | 'lifestyle' | 'travel' | 'food' | 'other'

type FormData = {
  title: string;
  description: string;
  categories: Category[];
  otherCategory: string;
}

const CATEGORIES: { value: Category; label: string }[] = [
  { value: 'technology', label: 'Technology' },
  { value: 'lifestyle', label: 'Lifestyle' },
  { value: 'travel', label: 'Travel' },
  { value: 'food', label: 'Food' },
  { value: 'other', label: 'Other' },
]

export default function Component({generateHtml}:any) {
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    categories: [],
    otherCategory: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const submissionData = {
      ...formData,
      categories: formData.categories.includes('other')
        ? [...formData.categories.filter(cat => cat !== 'other'), formData.otherCategory]
        : formData.categories
    }
    console.log('Form submitted:', submissionData)

    setIsOpen(false)
    generateHtml()
    setFormData({ title: '', description: '', categories: [], otherCategory: '' })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleCategoryChange = (category: Category, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      categories: checked
        ? [...prev.categories, category]
        : prev.categories.filter(c => c !== category)
    }))
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
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter blog post title"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Short Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter a short description"
              required
            />
          </div>
          <div className="space-y-2">
            <Label>Categories</Label>
            <div className="space-y-2">
              {CATEGORIES.map((category) => (
                <div key={category.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={category.value}
                    checked={formData.categories.includes(category.value)}
                    onCheckedChange={(checked: boolean) => handleCategoryChange(category.value, checked as boolean)}
                  />
                  <Label htmlFor={category.value}>{category.label}</Label>
                </div>
              ))}
            </div>
          </div>
          {formData.categories.includes('other') && (
            <div className="space-y-2">
              <Label htmlFor="otherCategory">Specify Other Category</Label>
              <Input
                id="otherCategory"
                name="otherCategory"
                value={formData.otherCategory}
                onChange={handleInputChange}
                placeholder="Enter custom category"
                required
              />
            </div>
          )}
          <Button type="submit" className="w-full">Submit</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
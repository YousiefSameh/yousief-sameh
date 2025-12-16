import { BlogForm } from "@/components/admin/blog-form"

export default function NewBlogPostPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">New Blog Post</h1>
        <p className="text-muted-foreground mt-1">Create a new blog article</p>
      </div>
      <BlogForm />
    </div>
  )
}

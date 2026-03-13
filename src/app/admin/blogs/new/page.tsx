import AdminShell from '@/components/admin/admin-shell'
import BlogForm from '@/components/admin/blog-form'

export default function NewBlogPage() {
  return (
    <AdminShell>
      <BlogForm mode="create" />
    </AdminShell>
  )
}

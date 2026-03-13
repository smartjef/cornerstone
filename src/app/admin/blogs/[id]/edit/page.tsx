'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import AdminShell from '@/components/admin/admin-shell'
import BlogForm from '@/components/admin/blog-form'

export default function EditBlogPage() {
  const { id } = useParams<{ id: string }>()
  const [blog, setBlog] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`/api/admin/blogs/${id}`)
      .then(r => r.json())
      .then(d => { setBlog(d); setLoading(false) })
  }, [id])

  return (
    <AdminShell>
      {loading ? (
        <div className="p-8 text-center text-slate-400 text-sm">Loading…</div>
      ) : blog ? (
        <BlogForm mode="edit" initial={blog} />
      ) : (
        <div className="p-8 text-center text-red-500 text-sm">Post not found.</div>
      )}
    </AdminShell>
  )
}

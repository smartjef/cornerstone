'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import {
  Plus,
  Pencil,
  Trash2,
  FileText,
  MoreHorizontal,
  ExternalLink,
} from 'lucide-react'
import AdminShell from '@/components/admin/admin-shell'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { cn } from '@/lib/utils'

interface Tag {
  id: string
  name: string
}

interface Blog {
  id: string
  title: string
  slug: string
  status: string
  category: { id: string; name: string } | null
  tags: Tag[]
  publishedAt: string | null
  createdAt: string
  author: { name: string | null; email: string } | null
}

function StatusBadge({ status }: { status: string }) {
  return (
    <span className={cn(
      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold',
      status === 'PUBLISHED'
        ? 'bg-emerald-100 text-emerald-700'
        : 'bg-slate-100 text-slate-600'
    )}>
      {status === 'PUBLISHED' ? 'Published' : 'Draft'}
    </span>
  )
}

function SkeletonRows() {
  return (
    <>
      {Array.from({ length: 5 }).map((_, i) => (
        <tr key={i} className="border-b border-slate-100">
          <td className="px-6 py-4">
            <Skeleton className="h-4 w-48 mb-1.5" />
            <Skeleton className="h-3 w-32" />
          </td>
          <td className="px-4 py-4 hidden md:table-cell">
            <Skeleton className="h-5 w-20 rounded-full" />
          </td>
          <td className="px-4 py-4 hidden lg:table-cell">
            <div className="flex gap-1">
              <Skeleton className="h-5 w-14 rounded-full" />
              <Skeleton className="h-5 w-14 rounded-full" />
            </div>
          </td>
          <td className="px-4 py-4 hidden md:table-cell">
            <Skeleton className="h-5 w-16 rounded-full" />
          </td>
          <td className="px-4 py-4 hidden lg:table-cell">
            <Skeleton className="h-4 w-24" />
          </td>
          <td className="px-4 py-4 hidden xl:table-cell">
            <Skeleton className="h-4 w-20" />
          </td>
          <td className="px-4 py-4">
            <Skeleton className="h-7 w-7 rounded ml-auto" />
          </td>
        </tr>
      ))}
    </>
  )
}

export default function BlogsPage() {
  const router = useRouter()
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)
  const [deleteTarget, setDeleteTarget] = useState<Blog | null>(null)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    fetch('/api/admin/blogs')
      .then(r => r.json())
      .then(d => { setBlogs(Array.isArray(d) ? d : []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  async function confirmDelete() {
    if (!deleteTarget) return
    setDeleting(true)
    try {
      const res = await fetch(`/api/admin/blogs/${deleteTarget.id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Delete failed')
      setBlogs(prev => prev.filter(b => b.id !== deleteTarget.id))
      toast.success(`"${deleteTarget.title}" deleted`)
      setDeleteTarget(null)
    } catch {
      toast.error('Failed to delete post')
    } finally {
      setDeleting(false)
    }
  }

  return (
    <AdminShell>
      <div className="max-w-6xl mx-auto">
        {/* Page header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Blog Posts</h1>
            <p className="text-slate-500 text-sm mt-0.5">
              {loading ? 'Loading…' : `${blogs.length} post${blogs.length !== 1 ? 's' : ''} total`}
            </p>
          </div>
          <Link href="/admin/blogs/new">
            <Button size="sm" className="gap-2 bg-primary hover:bg-primary/90 text-sm">
              <Plus className="w-4 h-4" />
              New Post
            </Button>
          </Link>
        </div>

        {/* Table card */}
        <div className="bg-white rounded-none border border-slate-200 overflow-hidden">
          {!loading && blogs.length === 0 ? (
            <div className="py-16 flex flex-col items-center justify-center text-center">
              <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center mb-4">
                <FileText className="w-7 h-7 text-slate-400" />
              </div>
              <p className="text-slate-700 font-semibold text-base mb-1">No blog posts yet</p>
              <p className="text-slate-500 text-sm mb-5 max-w-xs">
                Start creating content for your audience by publishing your first post.
              </p>
              <Link href="/admin/blogs/new">
                <Button size="sm" className="bg-primary hover:bg-primary/90 gap-2">
                  <Plus className="w-4 h-4" />
                  Create your first post
                </Button>
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/70">
                    <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">
                      Title / Slug
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden md:table-cell whitespace-nowrap">
                      Category
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden lg:table-cell">
                      Tags
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden md:table-cell">
                      Status
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden lg:table-cell">
                      Author
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden xl:table-cell">
                      Date
                    </th>
                    <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {loading ? (
                    <SkeletonRows />
                  ) : (
                    blogs.map(blog => (
                      <tr key={blog.id} className="hover:bg-slate-50/60 transition-colors group">
                        <td className="px-6 py-4 max-w-[240px]">
                          <p className="font-medium text-slate-900 line-clamp-1 leading-snug">{blog.title}</p>
                          <p className="text-slate-400 text-xs mt-0.5 font-mono truncate">{blog.slug}</p>
                        </td>
                        <td className="px-4 py-4 hidden md:table-cell">
                          {blog.category ? (
                            <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                              {blog.category.name}
                            </Badge>
                          ) : (
                            <span className="text-slate-400 text-xs">—</span>
                          )}
                        </td>
                        <td className="px-4 py-4 hidden lg:table-cell">
                          <div className="flex items-center gap-1 flex-wrap max-w-[160px]">
                            {blog.tags?.slice(0, 2).map(tag => (
                              <Badge key={tag.id} variant="outline" className="text-xs bg-slate-100 text-slate-600 border-slate-200 px-1.5 py-0">
                                {tag.name}
                              </Badge>
                            ))}
                            {blog.tags?.length > 2 && (
                              <span className="text-xs text-slate-400 font-medium">+{blog.tags.length - 2}</span>
                            )}
                            {(!blog.tags || blog.tags.length === 0) && (
                              <span className="text-slate-400 text-xs">—</span>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-4 hidden md:table-cell">
                          <StatusBadge status={blog.status} />
                        </td>
                        <td className="px-4 py-4 text-slate-500 text-sm hidden lg:table-cell truncate max-w-[120px]">
                          {blog.author?.name || blog.author?.email || <span className="text-slate-400">—</span>}
                        </td>
                        <td className="px-4 py-4 text-slate-500 text-sm hidden xl:table-cell whitespace-nowrap">
                          {new Date(blog.createdAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex justify-end">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <button className="p-1.5 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100">
                                  <MoreHorizontal className="w-4 h-4" />
                                </button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="w-44">
                                <DropdownMenuItem
                                  onClick={() => router.push(`/admin/blogs/${blog.id}/edit`)}
                                  className="gap-2 text-sm cursor-pointer"
                                >
                                  <Pencil className="w-3.5 h-3.5" />
                                  Edit post
                                </DropdownMenuItem>
                                {blog.status === 'PUBLISHED' && (
                                  <DropdownMenuItem asChild className="gap-2 text-sm cursor-pointer">
                                    <Link href={`/blog/${blog.slug}`} target="_blank">
                                      <ExternalLink className="w-3.5 h-3.5" />
                                      View live
                                    </Link>
                                  </DropdownMenuItem>
                                )}
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  onClick={() => setDeleteTarget(blog)}
                                  className="gap-2 text-sm cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                  Delete post
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Delete confirmation dialog */}
      <Dialog open={!!deleteTarget} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                <Trash2 className="w-4 h-4 text-red-600" />
              </div>
              Delete Post
            </DialogTitle>
            <DialogDescription className="pt-1">
              Are you sure you want to delete{' '}
              <span className="font-semibold text-slate-700">&ldquo;{deleteTarget?.title}&rdquo;</span>?
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="outline"
              onClick={() => setDeleteTarget(null)}
              disabled={deleting}
              className="border-slate-200"
            >
              Cancel
            </Button>
            <Button
              onClick={confirmDelete}
              disabled={deleting}
              className="gap-2 bg-red-600 hover:bg-red-700 text-white"
            >
              <Trash2 className="w-4 h-4" />
              {deleting ? 'Deleting…' : 'Delete Post'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminShell>
  )
}

'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import {
  Plus,
  Pencil,
  Trash2,
  ImageIcon as ImageIcon,
  MoreHorizontal,
  GalleryHorizontalEnd,
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

interface GalleryItem {
  id: string
  title: string
  category: { id: string; name: string } | null
  images: unknown[]
  createdAt: string
}

function SkeletonRows() {
  return (
    <>
      {Array.from({ length: 5 }).map((_, i) => (
        <tr key={i} className="border-b border-slate-100">
          <td className="px-6 py-4"><Skeleton className="h-4 w-48" /></td>
          <td className="px-4 py-4 hidden md:table-cell"><Skeleton className="h-5 w-24 rounded-full" /></td>
          <td className="px-4 py-4 hidden md:table-cell"><Skeleton className="h-4 w-10" /></td>
          <td className="px-4 py-4 hidden lg:table-cell"><Skeleton className="h-4 w-28" /></td>
          <td className="px-4 py-4"><Skeleton className="h-7 w-7 rounded ml-auto" /></td>
        </tr>
      ))}
    </>
  )
}

export default function GalleryPage() {
  const router = useRouter()
  const [items, setItems] = useState<GalleryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [deleteTarget, setDeleteTarget] = useState<GalleryItem | null>(null)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    fetch('/api/admin/gallery')
      .then(r => r.json())
      .then(d => { setItems(Array.isArray(d) ? d : []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  async function confirmDelete() {
    if (!deleteTarget) return
    setDeleting(true)
    try {
      const res = await fetch(`/api/admin/gallery/${deleteTarget.id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Delete failed')
      setItems(prev => prev.filter(i => i.id !== deleteTarget.id))
      toast.success(`"${deleteTarget.title}" deleted`)
      setDeleteTarget(null)
    } catch {
      toast.error('Failed to delete gallery item')
    } finally {
      setDeleting(false)
    }
  }

  return (
    <AdminShell>
      <div className="max-w-5xl mx-auto">
        {/* Page header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Gallery</h1>
            <p className="text-slate-500 text-sm mt-0.5">
              {loading ? 'Loading…' : `${items.length} item${items.length !== 1 ? 's' : ''}`}
            </p>
          </div>
          <Link href="/admin/gallery/new">
            <Button size="sm" className="gap-2 bg-primary hover:bg-primary/90 text-sm">
              <Plus className="w-4 h-4" />
              New Item
            </Button>
          </Link>
        </div>

        {/* Table card */}
        <div className="bg-white rounded-none border border-slate-200 overflow-hidden">
          {!loading && items.length === 0 ? (
            <div className="py-16 flex flex-col items-center justify-center text-center">
              <div className="w-14 h-14 rounded-none bg-slate-100 flex items-center justify-center mb-4 overflow-hidden">
                <GalleryHorizontalEnd className="w-7 h-7 text-slate-400" />
              </div>
              <p className="text-slate-700 font-semibold text-base mb-1">No gallery items yet</p>
              <p className="text-slate-500 text-sm mb-5 max-w-xs">
                Add photo collections to your gallery to showcase your work and events.
              </p>
              <Link href="/admin/gallery/new">
                <Button size="sm" className="bg-primary hover:bg-primary/90 gap-2">
                  <Plus className="w-4 h-4" />
                  Add your first item
                </Button>
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/70">
                    <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden md:table-cell">
                      Category
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden md:table-cell">
                      Images
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden lg:table-cell">
                      Date Added
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
                    items.map(item => {
                      const imageCount = Array.isArray(item.images) ? item.images.length : 0
                      return (
                        <tr key={item.id} className="hover:bg-slate-50/60 transition-colors group">
                          <td className="px-6 py-4 max-w-[200px]">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-none bg-slate-100 flex items-center justify-center shrink-0 overflow-hidden">
                                <ImageIcon className="w-4 h-4 text-slate-400" />
                              </div>
                              <p className="font-medium text-slate-900 leading-snug truncate">{item.title}</p>
                            </div>
                          </td>
                          <td className="px-4 py-4 hidden md:table-cell">
                            {item.category ? (
                              <Badge
                                variant="outline"
                                className="text-xs bg-violet-50 text-violet-700 border-violet-200"
                              >
                                {item.category.name}
                              </Badge>
                            ) : (
                              <span className="text-slate-400 text-xs">—</span>
                            )}
                          </td>
                          <td className="px-4 py-4 hidden md:table-cell">
                            <span className="inline-flex items-center gap-1 text-slate-600 text-sm">
                              <ImageIcon className="w-3.5 h-3.5 text-slate-400" />
                              {imageCount}
                            </span>
                          </td>
                          <td className="px-4 py-4 text-slate-500 text-sm hidden lg:table-cell whitespace-nowrap">
                            {new Date(item.createdAt).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            })}
                          </td>
                          <td className="px-4 py-4">
                            <div className="flex justify-end">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <button className="p-1.5 rounded-none text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100">
                                    <MoreHorizontal className="w-4 h-4" />
                                  </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-40">
                                  <DropdownMenuItem
                                    onClick={() => router.push(`/admin/gallery/${item.id}/edit`)}
                                    className="gap-2 text-sm cursor-pointer"
                                  >
                                    <Pencil className="w-3.5 h-3.5" />
                                    Edit item
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem
                                    onClick={() => setDeleteTarget(item)}
                                    className="gap-2 text-sm cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                    Delete item
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </td>
                        </tr>
                      )
                    })
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
              <div className="w-8 h-8 rounded-none bg-red-100 flex items-center justify-center shrink-0">
                <Trash2 className="w-4 h-4 text-red-600" />
              </div>
              Delete Gallery Item
            </DialogTitle>
            <DialogDescription className="pt-1">
              Are you sure you want to delete{' '}
              <span className="font-semibold text-slate-700">&ldquo;{deleteTarget?.title}&rdquo;</span>?
              This will permanently remove the item and all associated images.
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
              {deleting ? 'Deleting…' : 'Delete Item'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminShell>
  )
}

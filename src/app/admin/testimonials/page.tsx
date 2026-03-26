'use client'

import { useState, useEffect } from 'react'
import AdminShell from '@/components/admin/admin-shell'
import Image from 'next/image'
import { toast } from 'sonner'
import { Plus, Pencil, Trash2, MessageSquareQuote, Star, User as UserIcon } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog'

interface Testimonial {
  id: string
  name: string
  role: string | null
  text: string
  stars: number
  isPublic: boolean
  order: number
  image: string | null
  createdAt: string
}

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-3.5 h-3.5 ${
            i < count ? 'fill-amber-400 text-amber-400' : 'text-slate-200'
          }`}
        />
      ))}
    </div>
  )
}

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)

  // Delete dialog state
  const [deleteTarget, setDeleteTarget] = useState<Testimonial | null>(null)
  const [deleting, setDeleting] = useState(false)

  async function load() {
    try {
      const res = await fetch('/api/admin/testimonials')
      if (!res.ok) return
      const data = await res.json()
      setTestimonials(Array.isArray(data) ? data : [])
    } catch {
      /* ignore */
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  async function confirmDelete() {
    if (!deleteTarget) return
    setDeleting(true)
    try {
      const res = await fetch(`/api/admin/testimonials/${deleteTarget.id}`, { method: 'DELETE' })
      if (res.ok) {
        setTestimonials(prev => prev.filter(t => t.id !== deleteTarget.id))
        toast.success('Testimonial deleted.')
      } else {
        toast.error('Failed to delete testimonial.')
      }
    } catch {
      toast.error('Failed to delete testimonial.')
    } finally {
      setDeleting(false)
      setDeleteTarget(null)
    }
  }

  return (
    <AdminShell title="Testimonials">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Testimonials</h1>
            <p className="text-slate-500 text-sm mt-1">{testimonials.length} testimonials</p>
          </div>
          <Link href="/admin/testimonials/new">
            <Button className="gap-2 bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4" />
              Add Testimonial
            </Button>
          </Link>
        </div>

        {/* Table */}
        <div className="bg-white rounded-none border border-slate-200 overflow-hidden">
          {loading ? (
            <div className="p-5 space-y-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-14 w-full" />
              ))}
            </div>
          ) : testimonials.length === 0 ? (
            <div className="p-12 text-center">
              <MessageSquareQuote className="w-10 h-10 text-slate-200 mx-auto mb-3" />
              <p className="text-slate-500 font-medium">No testimonials yet</p>
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Stars
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    User
                  </th>

                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden sm:table-cell">
                    Role
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden lg:table-cell">
                    Preview
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Public
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider w-12">
                    Order
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {testimonials
                  .slice()
                  .sort((a, b) => a.order - b.order)
                  .map(t => (
                    <tr key={t.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-3">
                        <StarRating count={t.stars} />
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-none bg-slate-100 border border-slate-200 overflow-hidden shrink-0 relative">
                            {t.image ? (
                              <Image 
                                src={t.image} 
                                alt={t.name} 
                                fill 
                                className="w-full h-full object-cover" 
                                unoptimized={true} 
                              />
                            ) : (

                              <div className="w-full h-full flex items-center justify-center text-slate-400">
                                <UserIcon className="w-4 h-4" />
                              </div>
                            )}
                          </div>
                          <span className="font-medium text-slate-900">{t.name}</span>
                        </div>
                      </td>

                      <td className="px-4 py-3 text-slate-500 hidden sm:table-cell">
                        {t.role || <span className="text-slate-300">—</span>}
                      </td>
                      <td className="px-4 py-3 text-slate-500 hidden lg:table-cell max-w-xs">
                        <span className="truncate block">
                          {t.text.length > 60 ? t.text.slice(0, 60) + '…' : t.text}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {t.isPublic ? (
                          <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 hover:bg-emerald-100 text-xs">
                            Public
                          </Badge>
                        ) : (
                          <Badge
                            variant="outline"
                            className="text-slate-500 border-slate-200 bg-slate-50 text-xs"
                          >
                            Hidden
                          </Badge>
                        )}
                      </td>
                      <td className="px-4 py-3 text-slate-500 font-mono text-xs text-center">
                        {t.order}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-1">
                          <Link href={`/admin/testimonials/${t.id}`}>
                            <button className="p-1.5 rounded-none text-slate-400 hover:text-primary hover:bg-primary/10 transition-colors">
                              <Pencil className="w-4 h-4" />
                            </button>
                          </Link>
                          <button
                            onClick={() => setDeleteTarget(t)}
                            className="p-1.5 rounded-none text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Delete confirmation dialog */}
      <Dialog open={!!deleteTarget} onOpenChange={() => setDeleteTarget(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Delete Testimonial</DialogTitle>
            <DialogDescription>
              Delete the testimonial from{' '}
              <span className="font-semibold">{deleteTarget?.name}</span>? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteTarget(null)} disabled={deleting}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete} disabled={deleting}>
              {deleting ? 'Deleting…' : 'Delete'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminShell>
  )
}

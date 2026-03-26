'use client'

import { useState, useEffect } from 'react'
import AdminShell from '@/components/admin/admin-shell'
import { toast } from 'sonner'
import { Plus, Pencil, Trash2, Presentation } from 'lucide-react'
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

interface CarouselSlide {
  id: string
  image: string
  label: string
  title: string | null
  subtitle: string | null
  link: string | null
  isActive: boolean
  order: number
}

export default function CarouselPage() {
  const [slides, setSlides] = useState<CarouselSlide[]>([])
  const [loading, setLoading] = useState(true)

  // Delete dialog
  const [deleteTarget, setDeleteTarget] = useState<CarouselSlide | null>(null)
  const [deleting, setDeleting] = useState(false)

  async function load() {
    try {
      const res = await fetch('/api/admin/carousel')
      if (!res.ok) return
      const data = await res.json()
      setSlides(Array.isArray(data) ? data : [])
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
      const res = await fetch(`/api/admin/carousel/${deleteTarget.id}`, { method: 'DELETE' })
      if (res.ok) {
        setSlides(prev => prev.filter(s => s.id !== deleteTarget.id))
        toast.success('Slide deleted.')
      } else {
        toast.error('Failed to delete slide.')
      }
    } catch {
      toast.error('Failed to delete slide.')
    } finally {
      setDeleting(false)
      setDeleteTarget(null)
    }
  }

  const sorted = slides.slice().sort((a, b) => a.order - b.order)

  return (
    <AdminShell title="Hero Carousel">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Hero Carousel</h1>
            <p className="text-slate-500 text-sm mt-1">{slides.length} slides</p>
          </div>
          <Link href="/admin/carousel/new">
            <Button className="gap-2 bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4" />
              Add Slide
            </Button>
          </Link>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="aspect-video rounded-none" />
            ))}
          </div>
        ) : slides.length === 0 ? (
          <div className="bg-white rounded-none border border-slate-200 p-16 text-center">
            <Presentation className="w-12 h-12 text-slate-200 mx-auto mb-4" />
            <p className="text-slate-500 font-medium">No carousel slides yet</p>
            <p className="text-slate-400 text-sm mt-1">Add your first slide to get started.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {sorted.map(slide => (
              <div
                key={slide.id}
                className="bg-white rounded-none border border-slate-200 overflow-hidden hover:shadow-md transition-shadow group"
              >
                {/* Image preview */}
                <div className="relative aspect-video bg-slate-100 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={slide.image}
                    alt={slide.label}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    onError={e => {
                      ;(e.target as HTMLImageElement).style.display = 'none'
                    }}
                  />

                  {/* Order badge */}
                  <div className="absolute top-2 left-2">
                    <span className="bg-black/60 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                      #{slide.order}
                    </span>
                  </div>
                  {/* Active badge */}
                  <div className="absolute top-2 right-2">
                    {slide.isActive ? (
                      <Badge className="bg-emerald-500 text-white border-0 text-xs">Active</Badge>
                    ) : (
                      <Badge variant="outline" className="bg-black/50 text-white border-white/20 text-xs">
                        Inactive
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Card body */}
                <div className="p-4">
                  <p className="font-semibold text-slate-900 text-sm truncate">{slide.label}</p>
                  {slide.title && (
                    <p className="text-slate-500 text-xs mt-0.5 truncate">{slide.title}</p>
                  )}
                  {slide.subtitle && (
                    <p className="text-slate-400 text-xs truncate">{slide.subtitle}</p>
                  )}

                  {/* Actions */}
                  <div className="flex items-center gap-2 mt-3 pt-3 border-t border-slate-100">
                    <Link href={`/admin/carousel/${slide.id}`}>
                      <button className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-primary hover:bg-primary/10 px-2.5 py-1.5 rounded-md transition-colors">
                        <Pencil className="w-3.5 h-3.5" />
                        Edit
                      </button>
                    </Link>
                    <button
                      onClick={() => setDeleteTarget(slide)}
                      className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-red-500 hover:bg-red-50 px-2.5 py-1.5 rounded-md transition-colors ml-auto"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete confirmation dialog */}
      <Dialog open={!!deleteTarget} onOpenChange={() => setDeleteTarget(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Delete Slide</DialogTitle>
            <DialogDescription>
              Delete the slide{' '}
              <span className="font-semibold">&ldquo;{deleteTarget?.label}&rdquo;</span>? This
              action cannot be undone.
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

'use client'

import { useState, useEffect } from 'react'
import AdminShell from '@/components/admin/admin-shell'
import { toast } from 'sonner'
import { Plus, Pencil, Trash2, Presentation, ImagePlus } from 'lucide-react'
import MediaLibraryModal from '@/components/admin/media-library-modal'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
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

const EMPTY_FORM = {
  image: '',
  label: '',
  title: '',
  subtitle: '',
  link: '',
  isActive: true,
  order: 0,
}

export default function CarouselPage() {
  const [slides, setSlides] = useState<CarouselSlide[]>([])
  const [loading, setLoading] = useState(true)

  // Form dialog
  const [formOpen, setFormOpen] = useState(false)
  const [editTarget, setEditTarget] = useState<CarouselSlide | null>(null)
  const [form, setForm] = useState(EMPTY_FORM)
  const [saving, setSaving] = useState(false)
  const [mediaOpen, setMediaOpen] = useState(false)


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

  function openCreate() {
    setEditTarget(null)
    setForm(EMPTY_FORM)
    setFormOpen(true)
  }

  function openEdit(s: CarouselSlide) {
    setEditTarget(s)
    setForm({
      image: s.image,
      label: s.label,
      title: s.title || '',
      subtitle: s.subtitle || '',
      link: s.link || '',
      isActive: s.isActive,
      order: s.order,
    })
    setFormOpen(true)
  }

  async function handleSave() {
    if (!form.image.trim()) { toast.error('Image URL is required'); return }
    if (!form.label.trim()) { toast.error('Label is required'); return }

    setSaving(true)
    const payload = {
      image: form.image.trim(),
      label: form.label.trim(),
      title: form.title.trim() || null,
      subtitle: form.subtitle.trim() || null,
      link: form.link.trim() || null,
      isActive: form.isActive,
      order: form.order,
    }

    try {
      const url = editTarget
        ? `/api/admin/carousel/${editTarget.id}`
        : '/api/admin/carousel'
      const method = editTarget ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const d = await res.json()
        throw new Error(d.error || 'Save failed')
      }

      const saved = await res.json()

      if (editTarget) {
        setSlides(prev => prev.map(s => (s.id === editTarget.id ? saved : s)))
        toast.success('Slide updated.')
      } else {
        setSlides(prev => [...prev, saved])
        toast.success('Slide created.')
      }

      setFormOpen(false)
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Save failed')
    } finally {
      setSaving(false)
    }
  }

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
    <AdminShell>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Hero Carousel</h1>
            <p className="text-slate-500 text-sm mt-1">{slides.length} slides</p>
          </div>
          <Button onClick={openCreate} className="gap-2 bg-primary hover:bg-primary/90">
            <Plus className="w-4 h-4" />
            Add Slide
          </Button>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="aspect-video rounded-xl" />
            ))}
          </div>
        ) : slides.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-200 p-16 text-center">
            <Presentation className="w-12 h-12 text-slate-200 mx-auto mb-4" />
            <p className="text-slate-500 font-medium">No carousel slides yet</p>
            <p className="text-slate-400 text-sm mt-1">Add your first slide to get started.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {sorted.map(slide => (
              <div
                key={slide.id}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-md transition-shadow group"
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
                    <button
                      onClick={() => openEdit(slide)}
                      className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-primary hover:bg-primary/10 px-2.5 py-1.5 rounded-md transition-colors"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                      Edit
                    </button>
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

      {/* Create / Edit dialog */}
      <Dialog open={formOpen} onOpenChange={open => { if (!saving) setFormOpen(open) }}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{editTarget ? 'Edit Slide' : 'Add Slide'}</DialogTitle>
            <DialogDescription className="sr-only">
              Fill out the form below to configure the hero carousel slide.
            </DialogDescription>
          </DialogHeader>


          <div className="space-y-4 py-1">
            <div>
              <Label htmlFor="c-image" className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Image URL <span className="text-red-400">*</span>
              </Label>
              <div className="flex gap-2 mt-1.5">
                <Input
                  id="c-image"
                  value={form.image}
                  onChange={e => setForm(f => ({ ...f, image: e.target.value }))}
                  placeholder="/images/hero/slide1.jpg or https://…"
                  className="flex-1 border-slate-200 text-sm"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setMediaOpen(true)}
                  className="shrink-0"
                >
                  <ImagePlus className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-xs text-slate-400 mt-1">Select from library or paste URL.</p>

              {form.image && (
                <div className="mt-2 rounded-lg overflow-hidden border border-slate-200 aspect-video bg-slate-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={form.image}
                    alt="Preview"
                    className="w-full h-full object-cover"
                    loading="lazy"
                    onError={e => {
                      ;(e.target as HTMLImageElement).style.display = 'none'
                    }}
                  />

                </div>
              )}
            </div>

            <div>
              <Label htmlFor="c-label" className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Label <span className="text-red-400">*</span>
              </Label>
              <Input
                id="c-label"
                value={form.label}
                onChange={e => setForm(f => ({ ...f, label: e.target.value }))}
                placeholder="e.g. Community Outreach"
                className="mt-1.5 border-slate-200 text-sm"
              />
              <p className="text-xs text-slate-400 mt-1">Caption shown in the carousel navigation.</p>
            </div>

            <div>
              <Label htmlFor="c-title" className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Title (optional)
              </Label>
              <Input
                id="c-title"
                value={form.title}
                onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                placeholder="Overlay headline text"
                className="mt-1.5 border-slate-200 text-sm"
              />
            </div>

            <div>
              <Label htmlFor="c-subtitle" className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Subtitle (optional)
              </Label>
              <Input
                id="c-subtitle"
                value={form.subtitle}
                onChange={e => setForm(f => ({ ...f, subtitle: e.target.value }))}
                placeholder="Supporting text below the title"
                className="mt-1.5 border-slate-200 text-sm"
              />
            </div>

            <div>
              <Label htmlFor="c-link" className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Link (optional)
              </Label>
              <Input
                id="c-link"
                value={form.link}
                onChange={e => setForm(f => ({ ...f, link: e.target.value }))}
                placeholder="/about or https://…"
                className="mt-1.5 border-slate-200 text-sm"
              />
              <p className="text-xs text-slate-400 mt-1">Where clicking the slide takes the user.</p>
            </div>

            <div className="flex gap-4">
              <div className="w-28">
                <Label htmlFor="c-order" className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Order
                </Label>
                <Input
                  id="c-order"
                  type="number"
                  value={form.order}
                  onChange={e => setForm(f => ({ ...f, order: Number(e.target.value) }))}
                  className="mt-1.5 border-slate-200"
                />
              </div>

              <div className="flex-1 flex items-end">
                <div className="flex items-center justify-between w-full rounded-lg border border-slate-200 px-4 py-2.5">
                  <p className="text-sm font-medium text-slate-800">Active</p>
                  <button
                    type="button"
                    onClick={() => setForm(f => ({ ...f, isActive: !f.isActive }))}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      form.isActive ? 'bg-primary' : 'bg-slate-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
                        form.isActive ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setFormOpen(false)}
              disabled={saving}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={saving}
              className="bg-primary hover:bg-primary/90"
            >
              {saving ? 'Saving…' : editTarget ? 'Update' : 'Create'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

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

      <MediaLibraryModal
        open={mediaOpen}
        onOpenChange={setMediaOpen}
        onSelect={(url) => setForm(f => ({ ...f, image: url }))}
        title="Select Carousel Image"
      />

    </AdminShell>
  )
}

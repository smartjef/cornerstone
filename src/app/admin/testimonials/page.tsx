'use client'

import { useState, useEffect } from 'react'
import AdminShell from '@/components/admin/admin-shell'
import Image from 'next/image'
import { toast } from 'sonner'
import { Plus, Pencil, Trash2, MessageSquareQuote, Star, ImagePlus, User as UserIcon } from 'lucide-react'
import MediaLibraryModal from '@/components/admin/media-library-modal'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

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

const EMPTY_FORM = {
  name: '',
  role: '',
  text: '',
  stars: 5,
  isPublic: true,
  order: 0,
  image: '',
}


export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)

  // Form dialog state
  const [formOpen, setFormOpen] = useState(false)
  const [editTarget, setEditTarget] = useState<Testimonial | null>(null)
  const [form, setForm] = useState(EMPTY_FORM)
  const [saving, setSaving] = useState(false)
  const [mediaOpen, setMediaOpen] = useState(false)


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

  function openCreate() {
    setEditTarget(null)
    setForm(EMPTY_FORM)
    setFormOpen(true)
  }

  function openEdit(t: Testimonial) {
    setEditTarget(t)
    setForm({
      name: t.name,
      role: t.role || '',
      text: t.text,
      stars: t.stars,
      isPublic: t.isPublic,
      order: t.order,
      image: t.image || '',
    })
    setFormOpen(true)

  }

  async function handleSave() {
    if (!form.name.trim()) { toast.error('Name is required'); return }
    if (!form.text.trim()) { toast.error('Testimonial text is required'); return }

    setSaving(true)
    const payload = {
      name: form.name.trim(),
      role: form.role.trim() || null,
      text: form.text.trim(),
      stars: form.stars,
      isPublic: form.isPublic,
      order: form.order,
      image: form.image || null,
    }


    try {
      const url = editTarget
        ? `/api/admin/testimonials/${editTarget.id}`
        : '/api/admin/testimonials'
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
        setTestimonials(prev => prev.map(t => (t.id === editTarget.id ? saved : t)))
        toast.success('Testimonial updated.')
      } else {
        setTestimonials(prev => [...prev, saved])
        toast.success('Testimonial created.')
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
    <AdminShell>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Testimonials</h1>
            <p className="text-slate-500 text-sm mt-1">{testimonials.length} testimonials</p>
          </div>
          <Button onClick={openCreate} className="gap-2 bg-primary hover:bg-primary/90">
            <Plus className="w-4 h-4" />
            Add Testimonial
          </Button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
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
                          <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 overflow-hidden shrink-0">
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
                          <button
                            onClick={() => openEdit(t)}
                            className="p-1.5 rounded text-slate-400 hover:text-primary hover:bg-primary/10 transition-colors"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setDeleteTarget(t)}
                            className="p-1.5 rounded text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
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

      {/* Create / Edit dialog */}
      <Dialog open={formOpen} onOpenChange={open => { if (!saving) setFormOpen(open) }}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{editTarget ? 'Edit Testimonial' : 'Add Testimonial'}</DialogTitle>
            <DialogDescription className="sr-only">
              Fill out the form below to {editTarget ? 'update the' : 'add a new'} testimonial.
            </DialogDescription>
          </DialogHeader>


          <div className="space-y-4 py-1">
            <div>
              <Label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Photo (optional)
              </Label>
              <div className="flex gap-4 mt-1.5 items-start">
                <div className="w-20 h-20 rounded-lg bg-slate-100 border border-slate-200 overflow-hidden shrink-0">
                  {form.image ? (
                    <Image 
                      src={form.image} 
                      alt="Reviewer" 
                      fill 
                      className="w-full h-full object-cover" 
                      unoptimized={true}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400">
                      <UserIcon className="w-8 h-8" />
                    </div>
                  )}
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex gap-2">
                    <Input
                      value={form.image}
                      onChange={e => setForm(f => ({ ...f, image: e.target.value }))}
                      placeholder="Image URL..."
                      className="flex-1 text-sm h-9 border-slate-200"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setMediaOpen(true)}
                    >
                      <ImagePlus className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-[10px] text-slate-400 italic">Select from gallery or paste URL</p>
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="t-name" className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Name <span className="text-red-400">*</span>
              </Label>

              <Input
                id="t-name"
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                placeholder="e.g. Sarah Mensah"
                className="mt-1.5 border-slate-200"
              />
            </div>

            <div>
              <Label htmlFor="t-role" className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Role / Title
              </Label>
              <Input
                id="t-role"
                value={form.role}
                onChange={e => setForm(f => ({ ...f, role: e.target.value }))}
                placeholder="e.g. Programme Beneficiary"
                className="mt-1.5 border-slate-200"
              />
            </div>

            <div>
              <Label htmlFor="t-text" className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Testimonial <span className="text-red-400">*</span>
              </Label>
              <Textarea
                id="t-text"
                value={form.text}
                onChange={e => setForm(f => ({ ...f, text: e.target.value }))}
                rows={4}
                placeholder="Write the testimonial text…"
                className="mt-1.5 resize-none border-slate-200 text-sm"
              />
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <Label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Stars
                </Label>
                <Select
                  value={String(form.stars)}
                  onValueChange={v => setForm(f => ({ ...f, stars: Number(v) }))}
                >
                  <SelectTrigger className="mt-1.5 border-slate-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5].map(n => (
                      <SelectItem key={n} value={String(n)}>
                        {n} {n === 1 ? 'star' : 'stars'}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="w-28">
                <Label htmlFor="t-order" className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Order
                </Label>
                <Input
                  id="t-order"
                  type="number"
                  value={form.order}
                  onChange={e => setForm(f => ({ ...f, order: Number(e.target.value) }))}
                  className="mt-1.5 border-slate-200"
                />
              </div>
            </div>

            <div className="flex items-center justify-between rounded-lg border border-slate-200 px-4 py-3">
              <div>
                <p className="text-sm font-medium text-slate-800">Public</p>
                <p className="text-xs text-slate-400">Show on the public website</p>
              </div>
              <button
                type="button"
                onClick={() => setForm(f => ({ ...f, isPublic: !f.isPublic }))}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  form.isPublic ? 'bg-primary' : 'bg-slate-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
                    form.isPublic ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
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

      <MediaLibraryModal
        open={mediaOpen}
        onOpenChange={setMediaOpen}
        onSelect={(url) => setForm(f => ({ ...f, image: url }))}
        title="Select Reviewer Photo"
      />
    </AdminShell>

  )
}

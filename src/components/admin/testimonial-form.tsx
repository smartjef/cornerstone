'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import Image from 'next/image'
import { Save, ImagePlus, User as UserIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import MediaLibraryModal from '@/components/admin/media-library-modal'

interface Testimonial {
  id?: string
  name: string
  role: string | null
  text: string
  stars: number
  isPublic: boolean
  order: number
  image: string | null
}

interface TestimonialFormProps {
  initial?: Testimonial
  onSuccess?: () => void
  onCancel?: () => void
}

export default function TestimonialForm({ initial, onSuccess, onCancel }: TestimonialFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [mediaOpen, setMediaOpen] = useState(false)

  // Form state
  const [form, setForm] = useState({
    name: initial?.name || '',
    role: initial?.role || '',
    text: initial?.text || '',
    stars: initial?.stars ?? 5,
    isPublic: initial?.isPublic ?? true,
    order: initial?.order ?? 0,
    image: initial?.image || '',
  })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.name.trim()) { toast.error('Name is required'); return }
    if (!form.text.trim()) { toast.error('Testimonial text is required'); return }

    setLoading(true)
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
      const url = initial?.id
        ? `/api/admin/testimonials/${initial.id}`
        : '/api/admin/testimonials'
      const method = initial?.id ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const d = await res.json()
        throw new Error(d.error || 'Save failed')
      }

      toast.success(initial?.id ? 'Testimonial updated' : 'Testimonial created')
      if (onSuccess) onSuccess()
      router.push('/admin/testimonials')
      router.refresh()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Save failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-white p-6 border border-slate-200 rounded-none space-y-4">
            <Label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Reviewer Photo (optional)
            </Label>
            <div className="flex gap-4 items-start">
              <div className="w-24 h-24 rounded-none bg-slate-100 border border-slate-200 overflow-hidden shrink-0 relative">
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
                    <UserIcon className="w-10 h-10" />
                  </div>
                )}
              </div>
              <div className="flex-1 space-y-3">
                <div className="flex gap-2">
                  <Input
                    value={form.image}
                    onChange={e => setForm(f => ({ ...f, image: e.target.value }))}
                    placeholder="Image URL..."
                    className="flex-1 text-sm h-10 border-slate-200"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="h-10"
                    onClick={() => setMediaOpen(true)}
                  >
                    <ImagePlus className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-[10px] text-slate-400 italic">Select from gallery or paste a direct image URL</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 border border-slate-200 rounded-none space-y-4">
            <div className="space-y-2">
              <Label htmlFor="t-name" className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Full Name <span className="text-red-400">*</span>
              </Label>
              <Input
                id="t-name"
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                placeholder="e.g. Sarah Mensah"
                className="border-slate-200"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="t-role" className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Role / Title
              </Label>
              <Input
                id="t-role"
                value={form.role}
                onChange={e => setForm(f => ({ ...f, role: e.target.value }))}
                placeholder="e.g. Programme Beneficiary"
                className="border-slate-200"
              />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 border border-slate-200 rounded-none space-y-4">
            <div className="space-y-2">
              <Label htmlFor="t-text" className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Testimonial Text <span className="text-red-400">*</span>
              </Label>
              <Textarea
                id="t-text"
                value={form.text}
                onChange={e => setForm(f => ({ ...f, text: e.target.value }))}
                rows={6}
                placeholder="Write the testimonial text…"
                className="resize-none border-slate-200 text-sm"
                required
              />
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <Label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Star Rating
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
                  Display Order
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

            <div className="flex items-center justify-between rounded-none border border-slate-200 px-4 py-3">
              <div>
                <p className="text-sm font-medium text-slate-800">Public Visibility</p>
                <p className="text-xs text-slate-400">Show on the public website</p>
              </div>
              <button
                type="button"
                onClick={() => setForm(f => ({ ...f, isPublic: !f.isPublic }))}
                className={`relative inline-flex h-6 w-11 items-center rounded-none transition-colors border ${
                  form.isPublic ? 'bg-primary border-primary' : 'bg-slate-200 border-slate-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-none bg-white shadow transition-transform ${
                    form.isPublic ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 pt-6 border-t">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button 
          type="submit" 
          disabled={loading} 
          className="gap-2 bg-primary hover:bg-primary/90"
        >
          <Save className="w-4 h-4" />
          {loading ? 'Saving…' : initial?.id ? 'Update Testimonial' : 'Create Testimonial'}
        </Button>
      </div>

      <MediaLibraryModal
        open={mediaOpen}
        onOpenChange={setMediaOpen}
        onSelect={(url) => setForm(f => ({ ...f, image: url }))}
        title="Select Reviewer Photo"
      />
    </form>
  )
}

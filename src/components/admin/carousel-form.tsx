'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Save, ImagePlus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import MediaLibraryModal from '@/components/admin/media-library-modal'

interface CarouselSlide {
  id?: string
  image: string
  label: string
  title: string | null
  subtitle: string | null
  link: string | null
  isActive: boolean
  order: number
}

interface CarouselFormProps {
  initial?: CarouselSlide
  onSuccess?: () => void
  onCancel?: () => void
}

export default function CarouselForm({ initial, onSuccess, onCancel }: CarouselFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [mediaOpen, setMediaOpen] = useState(false)

  // Form state
  const [form, setForm] = useState({
    image: initial?.image || '',
    label: initial?.label || '',
    title: initial?.title || '',
    subtitle: initial?.subtitle || '',
    link: initial?.link || '',
    isActive: initial?.isActive ?? true,
    order: initial?.order ?? 0,
  })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.image.trim()) { toast.error('Image URL is required'); return }
    if (!form.label.trim()) { toast.error('Label is required'); return }

    setLoading(true)
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
      const url = initial?.id
        ? `/api/admin/carousel/${initial.id}`
        : '/api/admin/carousel'
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

      toast.success(initial?.id ? 'Slide updated' : 'Slide created')
      if (onSuccess) onSuccess()
      router.push('/admin/carousel')
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
              Slide Image <span className="text-red-400">*</span>
            </Label>
            <div className="flex gap-2">
              <Input
                value={form.image}
                onChange={e => setForm(f => ({ ...f, image: e.target.value }))}
                placeholder="/images/hero/slide1.jpg or https://…"
                className="flex-1 border-slate-200 text-sm"
                required
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
            
            {form.image && (
              <div className="mt-2 rounded-none overflow-hidden border border-slate-200 aspect-video bg-slate-100 relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={form.image}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>

          <div className="bg-white p-6 border border-slate-200 rounded-none space-y-4">
            <div className="space-y-2">
              <Label htmlFor="c-label" className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Label <span className="text-red-400">*</span>
              </Label>
              <Input
                id="c-label"
                value={form.label}
                onChange={e => setForm(f => ({ ...f, label: e.target.value }))}
                placeholder="e.g. Community Outreach"
                className="border-slate-200 text-sm"
                required
              />
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
                <div className="flex items-center justify-between w-full h-10 rounded-none border border-slate-200 px-4">
                  <p className="text-sm font-medium text-slate-800">Active Status</p>
                  <button
                    type="button"
                    onClick={() => setForm(f => ({ ...f, isActive: !f.isActive }))}
                    className={`relative inline-flex h-6 w-11 items-center rounded-none transition-colors border ${
                      form.isActive ? 'bg-primary border-primary' : 'bg-slate-200 border-slate-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-none bg-white shadow transition-transform ${
                        form.isActive ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 border border-slate-200 rounded-none space-y-4">
            <div className="space-y-2">
              <Label htmlFor="c-title" className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Headline Title (optional)
              </Label>
              <Input
                id="c-title"
                value={form.title}
                onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                placeholder="Overlay headline text"
                className="border-slate-200 text-sm"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="c-subtitle" className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Subtitle text (optional)
              </Label>
              <Input
                id="c-subtitle"
                value={form.subtitle}
                onChange={e => setForm(f => ({ ...f, subtitle: e.target.value }))}
                placeholder="Supporting text below the title"
                className="border-slate-200 text-sm"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="c-link" className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Call to Action Link (optional)
              </Label>
              <Input
                id="c-link"
                value={form.link}
                onChange={e => setForm(f => ({ ...f, link: e.target.value }))}
                placeholder="/about or https://…"
                className="border-slate-200 text-sm"
              />
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
          {loading ? 'Saving…' : initial?.id ? 'Update Slide' : 'Create Slide'}
        </Button>
      </div>

      <MediaLibraryModal
        open={mediaOpen}
        onOpenChange={setMediaOpen}
        onSelect={(url) => setForm(f => ({ ...f, image: url }))}
        title="Select Carousel Image"
      />
    </form>
  )
}

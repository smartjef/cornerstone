'use client'

import { useState, FormEvent, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Save, ArrowLeft, Plus, X, ImagePlus } from 'lucide-react'
import MediaLibraryModal from '@/components/admin/media-library-modal'
import { Button } from '@/components/ui/button'
import Image from 'next/image'


interface GalleryImage {
  src: string
  caption: string
}

interface GalleryData {
  id?: string
  title: string
  description: string
  category: string
  images: GalleryImage[]
}

interface Props {
  initial?: Partial<GalleryData & { categoryId?: string }> & { id?: string }
  mode: 'create' | 'edit'
}

export default function GalleryForm({ initial, mode }: Props) {
  const router = useRouter()
  const rawImages = Array.isArray(initial?.images) ? initial.images as GalleryImage[] : []
  const [form, setForm] = useState({
    title: initial?.title || '',
    description: initial?.description || '',
    categoryId: initial?.categoryId || '',
  })
  const [categories, setCategories] = useState<Array<{ id: string; name: string }>>([])
  const [images, setImages] = useState<GalleryImage[]>(rawImages)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [mediaOpen, setMediaOpen] = useState(false)
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null)

  useEffect(() => {
    fetch('/api/admin/categories')
      .then(res => res.json())
      .then(data => setCategories(Array.isArray(data) ? data : []))
      .catch(console.error)
  }, [])



  function addImage() {
    setImages(prev => [...prev, { src: '', caption: '' }])
  }

  function updateImage(i: number, field: keyof GalleryImage, value: string) {
    setImages(prev => prev.map((img, idx) => idx === i ? { ...img, [field]: value } : img))
  }

  function removeImage(i: number) {
    setImages(prev => prev.filter((_, idx) => idx !== i))
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    setSaving(true)

    const url = mode === 'create' ? '/api/admin/gallery' : `/api/admin/gallery/${initial!.id}`
    const method = mode === 'create' ? 'POST' : 'PUT'

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, images }),
    })

    setSaving(false)
    if (!res.ok) {
      const d = await res.json()
      setError(d.error || 'Save failed')
      return
    }

    router.push('/admin/gallery')
    router.refresh()
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/gallery" className="text-slate-400 hover:text-slate-700 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-2xl font-bold text-slate-900">
          {mode === 'create' ? 'New Gallery Item' : 'Edit Gallery Item'}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-none">{error}</div>
        )}

        <div className="bg-white rounded-none border border-slate-200 p-6 space-y-5">
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Title *</label>
            <input
              type="text"
              value={form.title}
              onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
              required
              placeholder="Gallery title"
              className="w-full px-4 py-2.5 border border-slate-200 rounded-none text-slate-900 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Category</label>
            <select
              value={form.categoryId}
              onChange={e => setForm(f => ({ ...f, categoryId: e.target.value }))}
              className="w-full px-4 py-2.5 border border-slate-200 rounded-none text-slate-900 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary bg-white"
            >
              <option value="">Select a category</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Description</label>
            <textarea
              value={form.description}
              onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
              rows={3}
              placeholder="Optional description…"
              className="w-full px-4 py-2.5 border border-slate-200 rounded-none text-slate-900 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary resize-none"
            />
          </div>
        </div>

        <div className="bg-white rounded-none border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Images</label>
            <button
              type="button"
              onClick={addImage}
              className="flex items-center gap-1.5 text-xs text-primary font-semibold hover:underline"
            >
              <Plus className="w-3.5 h-3.5" /> Add Image
            </button>
          </div>
          <div className="space-y-4">
            {images.map((img, i) => (
              <div key={i} className="flex gap-3 items-start p-4 bg-slate-50 rounded-none border border-slate-200">
                <div className="flex gap-4 items-center flex-1">
                  <div className="w-20 h-20 rounded-none bg-white border border-slate-200 overflow-hidden shrink-0 relative">
                    {img.src ? (
                      <Image 
                        src={img.src} 
                        alt="Preview" 
                        fill
                        className="w-full h-full object-cover"
                        unoptimized={true}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-300">
                        <ImagePlus className="w-6 h-6" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 space-y-3">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={img.src}
                        onChange={e => updateImage(i, 'src', e.target.value)}
                        placeholder="Image URL..."
                        className="flex-1 px-3 py-2 border border-slate-200 rounded-none text-slate-900 text-sm focus:outline-none focus:border-primary bg-white"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setActiveImageIndex(i)
                          setMediaOpen(true)
                        }}
                        className="shrink-0"
                      >
                        <ImagePlus className="w-4 h-4" />
                      </Button>
                    </div>

                    <input
                      type="text"
                      value={img.caption}
                      onChange={e => updateImage(i, 'caption', e.target.value)}
                      placeholder="Caption (optional)"
                      className="w-full px-3 py-2 border border-slate-200 rounded-none text-slate-900 text-sm focus:outline-none focus:border-primary bg-white"
                    />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => removeImage(i)}
                  className="mt-1 p-1.5 text-slate-400 hover:text-red-500 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>

              </div>
            ))}
            {images.length === 0 && (
              <p className="text-slate-400 text-sm text-center py-4">No images yet. Click &quot;Add Image&quot; to start.</p>
            )}
          </div>
        </div>

        <div className="flex items-center justify-end gap-3">
          <Link
            href="/admin/gallery"
            className="px-5 py-2.5 border border-slate-200 text-slate-700 text-sm font-semibold rounded-none hover:bg-slate-50 transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-none hover:bg-primary/90 disabled:opacity-60 transition-colors"
          >
            <Save className="w-4 h-4" />
            {saving ? 'Saving…' : 'Save'}
          </button>
        </div>
      </form>

      <MediaLibraryModal
        open={mediaOpen}
        onOpenChange={setMediaOpen}
        onSelect={(url) => {
          if (activeImageIndex !== null) {
            updateImage(activeImageIndex, 'src', url)
          }
        }}
        title="Select Gallery Image"
      />
    </div>

  )
}

'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import AdminShell from '@/components/admin/admin-shell'
import CarouselForm from '@/components/admin/carousel-form'
import { Skeleton } from '@/components/ui/skeleton'
import { toast } from 'sonner'

export default function EditCarouselPage() {
  const params = useParams()
  const router = useRouter()
  const [slide, setSlide] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/admin/carousel/${params.id}`)
        if (!res.ok) throw new Error('Not found')
        const data = await res.json()
        setSlide(data)
      } catch {
        toast.error('Failed to load slide')
        router.push('/admin/carousel')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [params.id, router])

  return (
    <AdminShell title="Edit Carousel Slide">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Edit Carousel Slide</h1>
          <p className="text-slate-500 text-sm mt-1">Update the configuration for this hero slide.</p>
        </div>

        {loading ? (
          <div className="space-y-6">
            <Skeleton className="h-[200px] w-full" />
            <Skeleton className="h-[100px] w-full" />
          </div>
        ) : slide ? (
          <CarouselForm 
            initial={slide}
            onSuccess={() => router.push('/admin/carousel')}
            onCancel={() => router.push('/admin/carousel')}
          />
        ) : null}
      </div>
    </AdminShell>
  )
}

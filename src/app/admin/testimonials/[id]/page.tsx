'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import AdminShell from '@/components/admin/admin-shell'
import TestimonialForm from '@/components/admin/testimonial-form'
import { Skeleton } from '@/components/ui/skeleton'
import { toast } from 'sonner'

export default function EditTestimonialPage() {
  const params = useParams()
  const router = useRouter()
  const [testimonial, setTestimonial] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/admin/testimonials/${params.id}`)
        if (!res.ok) throw new Error('Not found')
        const data = await res.json()
        setTestimonial(data)
      } catch {
        toast.error('Failed to load testimonial')
        router.push('/admin/testimonials')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [params.id, router])

  return (
    <AdminShell title="Edit Testimonial">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Edit Testimonial</h1>
          <p className="text-slate-500 text-sm mt-1">Update the testimonial details.</p>
        </div>

        {loading ? (
          <div className="space-y-6">
            <Skeleton className="h-[200px] w-full" />
            <Skeleton className="h-[100px] w-full" />
          </div>
        ) : testimonial ? (
          <TestimonialForm 
            initial={testimonial}
            onSuccess={() => router.push('/admin/testimonials')}
            onCancel={() => router.push('/admin/testimonials')}
          />
        ) : null}
      </div>
    </AdminShell>
  )
}

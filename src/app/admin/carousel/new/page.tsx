'use client'

import AdminShell from '@/components/admin/admin-shell'
import CarouselForm from '@/components/admin/carousel-form'
import { useRouter } from 'next/navigation'

export default function NewCarouselPage() {
  const router = useRouter()
  
  return (
    <AdminShell title="Add Carousel Slide">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">New Carousel Slide</h1>
          <p className="text-slate-500 text-sm mt-1">Configure a new hero slide for the homepage.</p>
        </div>
        
        <CarouselForm 
          onSuccess={() => router.push('/admin/carousel')}
          onCancel={() => router.push('/admin/carousel')}
        />
      </div>
    </AdminShell>
  )
}

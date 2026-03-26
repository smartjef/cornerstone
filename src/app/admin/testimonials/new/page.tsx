'use client'

import AdminShell from '@/components/admin/admin-shell'
import TestimonialForm from '@/components/admin/testimonial-form'
import { useRouter } from 'next/navigation'

export default function NewTestimonialPage() {
  const router = useRouter()
  
  return (
    <AdminShell title="Add Testimonial">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">New Testimonial</h1>
          <p className="text-slate-500 text-sm mt-1">Add a new testimonial to be displayed on the website.</p>
        </div>
        
        <TestimonialForm 
          onSuccess={() => router.push('/admin/testimonials')}
          onCancel={() => router.push('/admin/testimonials')}
        />
      </div>
    </AdminShell>
  )
}

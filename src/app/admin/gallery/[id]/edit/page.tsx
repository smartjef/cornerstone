'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import AdminShell from '@/components/admin/admin-shell'
import GalleryForm from '@/components/admin/gallery-form'

export default function EditGalleryPage() {
  const { id } = useParams<{ id: string }>()
  const [item, setItem] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`/api/admin/gallery/${id}`)
      .then(r => r.json())
      .then(d => { setItem(d); setLoading(false) })
  }, [id])

  return (
    <AdminShell>
      {loading ? (
        <div className="p-8 text-center text-slate-400 text-sm">Loading…</div>
      ) : item ? (
        <GalleryForm mode="edit" initial={item} />
      ) : (
        <div className="p-8 text-center text-red-500 text-sm">Item not found.</div>
      )}
    </AdminShell>
  )
}

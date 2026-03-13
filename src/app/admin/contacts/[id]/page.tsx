'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import AdminShell from '@/components/admin/admin-shell'
import { ArrowLeft, Trash2 } from 'lucide-react'

interface Contact {
  id: string
  name: string
  email: string
  phone: string | null
  subject: string | null
  message: string
  status: string
  createdAt: string
}

const statuses = ['NEW', 'VIEWED', 'RESPONDED', 'CLOSED']

export default function ContactDetailPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const [contact, setContact] = useState<Contact | null>(null)
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)

  useEffect(() => {
    fetch(`/api/admin/contacts/${id}`)
      .then(r => r.json())
      .then(d => {
        setContact(d)
        setLoading(false)
        // Auto-mark as viewed
        if (d.status === 'NEW') {
          fetch(`/api/admin/contacts/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: 'VIEWED' }),
          }).then(r => r.json()).then(updated => setContact(updated))
        }
      })
  }, [id])

  async function updateStatus(status: string) {
    setUpdating(true)
    const res = await fetch(`/api/admin/contacts/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })
    const data = await res.json()
    setContact(data)
    setUpdating(false)
  }

  async function deleteContact() {
    if (!confirm('Delete this contact submission?')) return
    await fetch(`/api/admin/contacts/${id}`, { method: 'DELETE' })
    router.push('/admin/contacts')
  }

  if (loading) {
    return <AdminShell><div className="p-8 text-center text-slate-400 text-sm">Loading…</div></AdminShell>
  }

  if (!contact) {
    return <AdminShell><div className="p-8 text-center text-red-500 text-sm">Contact not found.</div></AdminShell>
  }

  return (
    <AdminShell>
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Link href="/admin/contacts" className="text-slate-400 hover:text-slate-700 transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-2xl font-bold text-slate-900">Contact Submission</h1>
          </div>
          <button
            onClick={deleteContact}
            className="flex items-center gap-2 px-3 py-2 text-sm text-red-500 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
          >
            <Trash2 className="w-4 h-4" /> Delete
          </button>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-5">
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Name</p>
              <p className="text-slate-900 font-medium">{contact.name}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Email</p>
              <a href={`mailto:${contact.email}`} className="text-primary hover:underline">{contact.email}</a>
            </div>
            {contact.phone && (
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Phone</p>
                <p className="text-slate-900">{contact.phone}</p>
              </div>
            )}
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Date</p>
              <p className="text-slate-900">{new Date(contact.createdAt).toLocaleString()}</p>
            </div>
          </div>

          {contact.subject && (
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Subject</p>
              <p className="text-slate-900">{contact.subject}</p>
            </div>
          )}

          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Message</p>
            <p className="text-slate-700 leading-relaxed whitespace-pre-wrap bg-slate-50 p-4 rounded-lg border border-slate-200">
              {contact.message}
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Status</p>
            <div className="flex flex-wrap gap-2">
              {statuses.map(s => (
                <button
                  key={s}
                  onClick={() => updateStatus(s)}
                  disabled={updating || contact.status === s}
                  className={`px-4 py-2 text-xs font-semibold rounded-full transition-colors ${
                    contact.status === s
                      ? 'bg-primary text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  } disabled:opacity-60`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminShell>
  )
}

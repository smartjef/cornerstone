'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Mail, Eye, Inbox } from 'lucide-react'
import AdminShell from '@/components/admin/admin-shell'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

interface Contact {
  id: string
  name: string
  email: string
  subject: string | null
  status: string
  createdAt: string
}

const STATUS_CONFIG: Record<string, { label: string; className: string }> = {
  NEW: {
    label: 'New',
    className: 'bg-blue-100 text-blue-700',
  },
  VIEWED: {
    label: 'Viewed',
    className: 'bg-slate-100 text-slate-600',
  },
  RESPONDED: {
    label: 'Responded',
    className: 'bg-emerald-100 text-emerald-700',
  },
  CLOSED: {
    label: 'Closed',
    className: 'bg-amber-100 text-amber-700',
  },
}

function StatusBadge({ status }: { status: string }) {
  const config = STATUS_CONFIG[status] || { label: status, className: 'bg-slate-100 text-slate-600' }
  return (
    <span className={cn('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold', config.className)}>
      {config.label}
    </span>
  )
}

function SkeletonRows() {
  return (
    <>
      {Array.from({ length: 5 }).map((_, i) => (
        <tr key={i} className="border-b border-slate-100">
          <td className="px-6 py-4"><Skeleton className="h-4 w-32" /></td>
          <td className="px-4 py-4 hidden sm:table-cell"><Skeleton className="h-4 w-44" /></td>
          <td className="px-4 py-4 hidden lg:table-cell"><Skeleton className="h-4 w-52" /></td>
          <td className="px-4 py-4"><Skeleton className="h-5 w-20 rounded-full" /></td>
          <td className="px-4 py-4 hidden md:table-cell"><Skeleton className="h-4 w-24" /></td>
          <td className="px-4 py-4"><Skeleton className="h-7 w-7 rounded ml-auto" /></td>
        </tr>
      ))}
    </>
  )
}

export default function ContactsPage() {
  const router = useRouter()
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/admin/contacts')
      .then(r => r.json())
      .then(d => { setContacts(Array.isArray(d) ? d : []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const newCount = contacts.filter(c => c.status === 'NEW').length

  return (
    <AdminShell>
      <div className="max-w-5xl mx-auto">
        {/* Page header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Contacts</h1>
            <p className="text-slate-500 text-sm mt-0.5">
              {loading
                ? 'Loading…'
                : `${contacts.length} submission${contacts.length !== 1 ? 's' : ''}${newCount > 0 ? ` · ${newCount} new` : ''}`
              }
            </p>
          </div>
          {!loading && newCount > 0 && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold">
              <Mail className="w-3.5 h-3.5" />
              {newCount} unread
            </span>
          )}
        </div>

        {/* Table card */}
        <div className="bg-white rounded-none border border-slate-200 overflow-hidden">
          {!loading && contacts.length === 0 ? (
            <div className="py-16 flex flex-col items-center justify-center text-center">
              <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center mb-4">
                <Inbox className="w-7 h-7 text-slate-400" />
              </div>
              <p className="text-slate-700 font-semibold text-base mb-1">No contact submissions</p>
              <p className="text-slate-500 text-sm max-w-xs">
                Contact form submissions from your website will appear here.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/70">
                    <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden sm:table-cell">
                      Email
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden lg:table-cell">
                      Subject
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden md:table-cell">
                      Date
                    </th>
                    <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">
                      View
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {loading ? (
                    <SkeletonRows />
                  ) : (
                    contacts.map(c => (
                      <tr
                        key={c.id}
                        onClick={() => router.push(`/admin/contacts/${c.id}`)}
                        className={cn(
                          'transition-colors cursor-pointer group',
                          c.status === 'NEW'
                            ? 'bg-blue-50/40 hover:bg-blue-50/70'
                            : 'hover:bg-slate-50/60'
                        )}
                      >
                        <td className="px-6 py-4">
                          <p className={cn(
                            'text-sm leading-snug',
                            c.status === 'NEW' ? 'font-semibold text-slate-900' : 'font-medium text-slate-800'
                          )}>
                            {c.name}
                          </p>
                        </td>
                        <td className="px-4 py-4 text-slate-500 hidden sm:table-cell">
                          {c.email}
                        </td>
                        <td className="px-4 py-4 text-slate-500 hidden lg:table-cell max-w-[220px]">
                          <p className="truncate">{c.subject || <span className="text-slate-400 italic">No subject</span>}</p>
                        </td>
                        <td className="px-4 py-4">
                          <StatusBadge status={c.status} />
                        </td>
                        <td className="px-4 py-4 text-slate-500 text-sm hidden md:table-cell whitespace-nowrap">
                          {new Date(c.createdAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex justify-end">
                            <Link
                              href={`/admin/contacts/${c.id}`}
                              onClick={e => e.stopPropagation()}
                              className="p-1.5 rounded text-slate-400 hover:text-primary hover:bg-primary/10 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                            >
                              <Eye className="w-4 h-4" />
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AdminShell>
  )
}

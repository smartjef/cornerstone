'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  FileText,
  Image,
  Mail,
  HardDrive,
  Users,
  ArrowRight,
  Plus,
  Eye,
  Upload,
  UserPlus,
  LayoutDashboard,
} from 'lucide-react'
import AdminShell from '@/components/admin/admin-shell'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

interface Stats {
  blogs: number
  gallery: number
  contacts: number
  media: number
  users: number
}

const statCards = [
  {
    key: 'blogs' as const,
    label: 'Blog Posts',
    description: 'Published & draft articles',
    icon: FileText,
    href: '/admin/blogs',
    color: 'bg-blue-500',
    lightColor: 'bg-blue-50',
    textColor: 'text-blue-600',
  },
  {
    key: 'gallery' as const,
    label: 'Gallery Items',
    description: 'Photo collections',
    icon: Image,
    href: '/admin/gallery',
    color: 'bg-violet-500',
    lightColor: 'bg-violet-50',
    textColor: 'text-violet-600',
  },
  {
    key: 'contacts' as const,
    label: 'Contacts',
    description: 'Form submissions',
    icon: Mail,
    href: '/admin/contacts',
    color: 'bg-amber-500',
    lightColor: 'bg-amber-50',
    textColor: 'text-amber-600',
  },
  {
    key: 'media' as const,
    label: 'Media Files',
    description: 'Uploaded assets',
    icon: HardDrive,
    href: '/admin/media',
    color: 'bg-emerald-500',
    lightColor: 'bg-emerald-50',
    textColor: 'text-emerald-600',
  },
  {
    key: 'users' as const,
    label: 'Users',
    description: 'Admin accounts',
    icon: Users,
    href: '/admin/users',
    color: 'bg-rose-500',
    lightColor: 'bg-rose-50',
    textColor: 'text-rose-600',
  },
]

const quickActions = [
  {
    label: 'Write New Post',
    description: 'Create and publish a blog article',
    href: '/admin/blogs/new',
    icon: Plus,
    color: 'text-blue-600 bg-blue-50',
  },
  {
    label: 'Add Gallery Item',
    description: 'Upload a new photo collection',
    href: '/admin/gallery/new',
    icon: Image,
    color: 'text-violet-600 bg-violet-50',
  },
  {
    label: 'View Contacts',
    description: 'Review incoming messages',
    href: '/admin/contacts',
    icon: Eye,
    color: 'text-amber-600 bg-amber-50',
  },
  {
    label: 'Upload Media',
    description: 'Add files to your media library',
    href: '/admin/media',
    icon: Upload,
    color: 'text-emerald-600 bg-emerald-50',
  },
  {
    label: 'Manage Users',
    description: 'Add or configure admin users',
    href: '/admin/users',
    icon: UserPlus,
    color: 'text-rose-600 bg-rose-50',
  },
  {
    label: 'View All Content',
    description: 'Browse all published content',
    href: '/admin/blogs',
    icon: LayoutDashboard,
    color: 'text-slate-600 bg-slate-100',
  },
]

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/admin/stats')
      .then(r => r.json())
      .then(d => { setStats(d); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  return (
    <AdminShell>
      <div className="max-w-5xl mx-auto">
        {/* Page header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-slate-500 text-sm mt-1">
            Welcome back. Here&apos;s an overview of your content.
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-10">
          {statCards.map(({ key, label, description, icon: Icon, href, lightColor, textColor }) => (
            <Link
              key={key}
              href={href}
              className="group bg-white border border-slate-200 p-5 hover:border-slate-300 hover:shadow-md transition-all"
            >
              <div className={cn('w-10 h-10 rounded-none flex items-center justify-center mb-4', lightColor)}>
                <Icon className={cn('w-5 h-5', textColor)} />
              </div>
              <div>
                {loading ? (
                  <Skeleton className="h-8 w-12 mb-1" />
                ) : (
                  <p className="text-3xl font-bold text-slate-900 leading-none mb-1">
                    {stats?.[key] ?? 0}
                  </p>
                )}
                <p className="text-sm font-semibold text-slate-700 leading-tight">{label}</p>
                <p className="text-xs text-slate-400 mt-0.5 leading-tight">{description}</p>
              </div>
              <div className="mt-3 flex items-center gap-1 text-xs text-slate-400 group-hover:text-primary transition-colors">
                View all
                <ArrowRight className="w-3 h-3" />
              </div>
            </Link>
          ))}
        </div>

        {/* Section divider */}
        <div className="flex items-center gap-3 mb-5">
          <h2 className="text-sm font-semibold text-slate-700 uppercase tracking-wider shrink-0">
            Quick Actions
          </h2>
          <div className="flex-1 h-px bg-slate-200" />
        </div>

        {/* Quick actions grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {quickActions.map(({ label, description, href, icon: Icon, color }) => (
            <Link
              key={href}
              href={href}
              className="group flex items-start gap-4 bg-white border border-slate-200 p-4 hover:border-slate-300 hover:shadow-md transition-all"
            >
              <div className={cn('w-9 h-9 rounded-none flex items-center justify-center shrink-0', color)}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-slate-800 text-sm group-hover:text-primary transition-colors">
                  {label}
                </p>
                <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{description}</p>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-primary transition-colors shrink-0 mt-0.5" />
            </Link>
          ))}
        </div>
      </div>
    </AdminShell>
  )
}

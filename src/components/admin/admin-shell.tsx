'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard,
  FileText,
  Image as ImageIcon,
  Mail,
  HardDrive,
  Users,
  LogOut,
  Menu,
  X,
  ChevronRight,
  Tag,
  Layers,
  MessageSquareQuote,
  Presentation,
} from 'lucide-react'
import { Toaster } from '@/components/ui/sonner'

interface SessionUser {
  userId: string
  email: string
  name: string | null
  role: string
}

const navGroups = [
  {
    label: 'Content',
    links: [
      { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
      { href: '/admin/blogs', label: 'Blogs', icon: FileText },
      { href: '/admin/gallery', label: 'Gallery', icon: ImageIcon },
      { href: '/admin/carousel', label: 'Hero Carousel', icon: Presentation },
      { href: '/admin/testimonials', label: 'Testimonials', icon: MessageSquareQuote },
    ],
  },
  {
    label: 'Taxonomy',
    links: [
      { href: '/admin/categories', label: 'Categories', icon: Layers },
      { href: '/admin/tags', label: 'Tags', icon: Tag },
    ],
  },
  {
    label: 'People',
    links: [
      { href: '/admin/users', label: 'Users & Team', icon: Users },
    ],
  },
  {
    label: 'Manage',
    links: [
      { href: '/admin/contacts', label: 'Contacts', icon: Mail },
      { href: '/admin/media', label: 'Media', icon: HardDrive },
    ],
  },
]

export default function AdminShell({ children, title }: { children: React.ReactNode, title?: string }) {
  const pathname = usePathname()
  const router = useRouter()
  const [user, setUser] = useState<SessionUser | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    fetch('/api/auth/me')
      .then(r => r.json())
      .then(d => { if (d.user) setUser(d.user) })
      .catch(() => {})
  }, [])

  async function logout() {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/admin/login')
  }

  function isActive(href: string, exact?: boolean) {
    if (exact) return pathname === href
    return pathname.startsWith(href)
  }

  const Sidebar = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-slate-700/50">
        <Link href="/admin" className="flex items-center gap-3">
          <div className="relative w-10 h-10 shrink-0">
            <Image src="/logo.png" alt="Cornerstone Foundation" fill className="object-contain" priority unoptimized={true} />
          </div>

          <div>
            <p className="text-white font-bold text-sm leading-none">Cornerstone</p>
            <p className="text-slate-400 text-[10px] mt-0.5 uppercase tracking-wider">Admin Panel</p>
          </div>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto space-y-4">
        {navGroups.map(group => (
          <div key={group.label}>
            <p className="px-3 mb-1 text-[10px] font-semibold text-slate-500 uppercase tracking-widest">{group.label}</p>
            <div className="space-y-0.5">
              {group.links.map(({ href, label, icon: Icon, exact }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive(href, exact)
                      ? 'bg-primary text-white'
                      : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  {label}
                  {isActive(href, exact) && <ChevronRight className="w-3 h-3 ml-auto" />}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* User info + logout */}
      <div className="px-4 py-4 border-t border-slate-700/50 space-y-3">
        {user && (
          <Link
            href="/admin/profile"
            onClick={() => setSidebarOpen(false)}
            className="flex items-center gap-3 px-1 rounded-lg hover:bg-slate-700/40 transition-colors p-1"
          >
            <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center shrink-0">
              <span className="text-primary text-xs font-bold uppercase">
                {(user.name || user.email).charAt(0)}
              </span>
            </div>
            <div className="min-w-0">
              <p className="text-white text-sm font-medium truncate">{user.name || user.email}</p>
              <p className="text-slate-400 text-xs capitalize">{user.role.toLowerCase()}</p>
            </div>
          </Link>
        )}
        <button
          onClick={logout}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-red-500/20 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Sign out
        </button>
        {/* Footer branding */}
        <div className="px-1 pt-2 border-t border-slate-700/40 flex items-center gap-2">
          <div className="relative w-5 h-5 shrink-0 opacity-50">
            <Image src="/logo.png" alt="Cornerstone Foundation" fill className="object-contain" unoptimized={true} />
          </div>

          <span className="text-slate-500 text-[10px] uppercase tracking-widest">Cornerstone Foundation</span>
        </div>
      </div>
    </div>
  )

  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden">
      <Toaster richColors position="top-right" />
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-60 bg-slate-900 shrink-0">
        <Sidebar />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setSidebarOpen(false)} />
          <aside className="relative flex flex-col w-64 h-full bg-slate-900 shadow-xl">
            <button
              onClick={() => setSidebarOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <Sidebar />
          </aside>
        </div>
      )}

      {/* Main area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top bar */}
        <header className="flex items-center justify-between px-4 sm:px-6 h-14 bg-white border-b border-slate-200 shrink-0">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-slate-500 hover:text-slate-900"
          >
            <Menu className="w-5 h-5" />
          </button>
          
          {title && (
            <h2 className="text-sm font-semibold text-slate-700 ml-4 hidden md:block">
              {title}
            </h2>
          )}

          <div className="flex items-center gap-2 text-xs text-slate-500 ml-auto">
            <Link href="/" target="_blank" className="hover:text-primary transition-colors">
              View site ↗
            </Link>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  )
}

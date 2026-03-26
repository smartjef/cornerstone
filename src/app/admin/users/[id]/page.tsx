'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import AdminShell from '@/components/admin/admin-shell'
import UserForm from '@/components/admin/user-form'
import { Skeleton } from '@/components/ui/skeleton'
import { toast } from 'sonner'

export default function EditUserPage() {
  const params = useParams()
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/admin/users/${params.id}`)
        if (!res.ok) throw new Error('Not found')
        const data = await res.json()
        setUser(data)
      } catch {
        toast.error('Failed to load user')
        router.push('/admin/users')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [params.id, router])

  return (
    <AdminShell title="Edit User">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Edit Profile</h1>
          <p className="text-slate-500 text-sm mt-1">Update system role and profile information for this member.</p>
        </div>

        {loading ? (
          <div className="space-y-6">
            <Skeleton className="h-[300px] w-full" />
            <Skeleton className="h-[200px] w-full" />
          </div>
        ) : user ? (
          <UserForm 
            initial={user}
            onSuccess={() => router.push('/admin/users')}
            onCancel={() => router.push('/admin/users')}
          />
        ) : null}
      </div>
    </AdminShell>
  )
}

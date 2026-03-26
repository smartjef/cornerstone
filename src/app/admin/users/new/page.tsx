'use client'

import AdminShell from '@/components/admin/admin-shell'
import UserForm from '@/components/admin/user-form'
import { useRouter } from 'next/navigation'

export default function NewUserPage() {
  const router = useRouter()
  
  return (
    <AdminShell title="Add New User">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Create User</h1>
          <p className="text-slate-500 text-sm mt-1">Setup a new administrative account or team member profile.</p>
        </div>
        
        <UserForm 
          onSuccess={() => router.push('/admin/users')}
          onCancel={() => router.push('/admin/users')}
        />
      </div>
    </AdminShell>
  )
}

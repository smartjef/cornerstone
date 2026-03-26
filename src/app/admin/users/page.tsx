'use client'

import { useState, useEffect } from 'react'
import AdminShell from '@/components/admin/admin-shell'
import { Plus, Pencil, Trash2, Users, Search, MoreHorizontal, Mail, User as UserIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Link from 'next/link'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { toast } from 'sonner'

interface User {
  id: string
  email: string
  name: string | null
  role: 'ADMIN' | 'EDITOR'
  avatar: string | null
  teamType: 'BOARD' | 'MANAGEMENT' | null
  position: string | null
  bio: string | null
  phone: string | null
  linkedIn: string | null
  slug: string | null
  order: number
  isPublic: boolean
  createdAt: string
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [currentUserId, setCurrentUserId] = useState<string | null>(null)

  const fetchUsers = async () => {
    setLoading(true)
    setError(null)
    try {
      const [usersRes, meRes] = await Promise.all([
        fetch('/api/admin/users'),
        fetch('/api/auth/me')
      ])
      
      if (!usersRes.ok) {
        throw new Error(`Failed to load users: ${usersRes.statusText}`)
      }
      
      const usersData = await usersRes.json()
      setUsers(usersData)
      
      if (meRes.ok) {
        const meData = await meRes.json()
        if (meData.user) setCurrentUserId(meData.user.userId)
      }
    } catch (err) {
      console.error(err)
      setError(err instanceof Error ? err.message : 'Failed to connect to the database or API')
      toast.error('Failed to load users directory')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  async function deleteUser(id: string, name: string | null) {
    if (id === currentUserId) {
      toast.error("You can't delete your own account.")
      return
    }
    if (!confirm(`Are you sure you want to delete ${name || 'this user'}?`)) return
    
    try {
      const res = await fetch(`/api/admin/users/${id}`, { method: 'DELETE' })
      if (res.ok) {
        toast.success('User deleted')
        setUsers(prev => prev.filter(u => u.id !== id))
      } else {
        toast.error('Failed to delete user')
      }
    } catch {
      toast.error('Something went wrong')
    }
  }

  const filteredUsers = users.filter(u => 
    u.email.toLowerCase().includes(search.toLowerCase()) ||
    (u.name?.toLowerCase() || '').includes(search.toLowerCase()) ||
    (u.position?.toLowerCase() || '').includes(search.toLowerCase())
  )

  const admins = filteredUsers.filter(u => u.teamType === null)
  const board = filteredUsers.filter(u => u.teamType === 'BOARD')
  const management = filteredUsers.filter(u => u.teamType === 'MANAGEMENT')

  const UserTable = ({ data }: { data: User[] }) => (
    <div className="bg-white rounded-none border border-slate-200 overflow-hidden">
      {data.length === 0 ? (
        <div className="p-12 text-center text-slate-400">
          <Users className="w-10 h-10 mx-auto mb-3 opacity-20" />
          <p>No users found in this category</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4 font-semibold text-slate-900">User</th>
                <th className="px-6 py-4 font-semibold text-slate-900">Role / Position</th>
                <th className="px-6 py-4 font-semibold text-slate-900 hidden md:table-cell">Joined</th>
                <th className="px-6 py-4 text-right font-semibold text-slate-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {data.map(user => (
                <tr key={user.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-none bg-slate-100 border border-slate-200 overflow-hidden flex-shrink-0 relative">
                        {user.avatar ? (
                          <Image 
                            src={user.avatar} 
                            alt="" 
                            fill 
                            className="w-full h-full object-cover" 
                            unoptimized={true}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-400 bg-slate-100">
                            <UserIcon className="w-5 h-5" />
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">{user.name || 'Unnamed'}</p>
                        <p className="text-xs text-slate-500 flex items-center gap-1">
                          <Mail className="w-3 h-3" /> {user.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Badge variant={user.role === 'ADMIN' ? 'default' : 'outline'} className="text-[10px] py-0 h-4 uppercase font-bold tracking-wider">
                          {user.role}
                        </Badge>
                      </div>
                      {user.position && (
                        <p className="text-xs text-slate-500 italic">{user.position}</p>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-500 hidden md:table-cell">
                    {new Date(user.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-40">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <Link href={`/admin/users/${user.id}`} className="flex items-center">
                            <Pencil className="mr-2 h-4 w-4" /> Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="text-red-600 focus:text-red-700 focus:bg-red-50"
                          onClick={() => deleteUser(user.id, user.name)}
                          disabled={user.id === currentUserId}
                        >
                          <Trash2 className="mr-2 h-4 w-4" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )

  return (
    <AdminShell title="User Management">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">User Management</h1>
            <p className="text-slate-500 text-sm mt-1">Manage administrators and team members in one place.</p>
          </div>
          <Link href="/admin/users/new">
            <Button className="bg-primary hover:bg-primary/90 shadow-sm gap-2">
              <Plus className="w-4 h-4" /> Add New User
            </Button>
          </Link>
        </div>

        <div className="flex items-center gap-4 py-2">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search by name, email or title..."
              className="pl-9 h-10 border-slate-200 bg-white shadow-sm focus:ring-primary/20"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>

        {loading ? (
          <div className="h-64 flex items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
              <p className="text-sm text-slate-400 font-medium">Loading user directory...</p>
            </div>
          </div>
        ) : error ? (
          <div className="h-64 flex items-center justify-center">
            <div className="bg-red-50 border border-red-100 p-6 rounded-none max-w-md text-center">
              <p className="text-red-600 font-semibold mb-2">Connection Error</p>
              <p className="text-red-500 text-sm mb-4">{error}</p>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={fetchUsers}
                className="bg-white border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
              >
                Retry Connection
              </Button>
            </div>
          </div>
        ) : (
          <Tabs defaultValue="admins" className="space-y-4">
            <TabsList className="bg-slate-100/50 border border-slate-200 p-1">
              <TabsTrigger value="admins" className="gap-2 px-4 py-2 data-[state=active]:bg-white data-[state=active]:shadow-sm">
                Administrators
                <Badge variant="secondary" className="bg-slate-200 text-slate-600 border-none px-1.5 h-4 text-[10px]">
                  {admins.length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="board" className="gap-2 px-4 py-2 data-[state=active]:bg-white data-[state=active]:shadow-sm">
                Board
                <Badge variant="secondary" className="bg-slate-200 text-slate-600 border-none px-1.5 h-4 text-[10px]">
                  {board.length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="management" className="gap-2 px-4 py-2 data-[state=active]:bg-white data-[state=active]:shadow-sm">
                Management
                <Badge variant="secondary" className="bg-slate-200 text-slate-600 border-none px-1.5 h-4 text-[10px]">
                  {management.length}
                </Badge>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="admins" className="mt-0">
              <UserTable data={admins} />
            </TabsContent>
            <TabsContent value="board" className="mt-0">
              <UserTable data={board} />
            </TabsContent>
            <TabsContent value="management" className="mt-0">
              <UserTable data={management} />
            </TabsContent>
          </Tabs>
        )}
      </div>
    </AdminShell>
  )
}

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

import { toast } from 'sonner'
import { Save, ImagePlus, Plus, AtSign, User as UserIcon, Shield, Briefcase, Info } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import MediaLibraryModal from '@/components/admin/media-library-modal'

interface UserData {
  id?: string
  email: string
  name: string | null
  password?: string
  role: 'ADMIN' | 'EDITOR'
  bio: string | null
  phone: string | null
  avatar: string | null
  slug: string | null
  position: string | null
  linkedIn: string | null
  teamType: 'BOARD' | 'MANAGEMENT' | null
  isPublic: boolean
  order: number
}

interface UserFormProps {
  initial?: UserData
  onSuccess?: () => void
  onCancel?: () => void
}

export default function UserForm({ initial, onSuccess, onCancel }: UserFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [mediaOpen, setMediaOpen] = useState(false)

  // Form state
  const [email, setEmail] = useState(initial?.email || '')
  const [name, setName] = useState(initial?.name || '')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState<'ADMIN' | 'EDITOR'>(initial?.role || 'EDITOR')
  const [bio, setBio] = useState(initial?.bio || '')
  const [phone, setPhone] = useState(initial?.phone || '')
  const [avatar, setAvatar] = useState(initial?.avatar || '')
  const [position, setPosition] = useState(initial?.position || '')
  const [linkedIn, setLinkedIn] = useState(initial?.linkedIn || '')
  const [teamType, setTeamType] = useState<'BOARD' | 'MANAGEMENT' | 'NONE'>(
    initial?.teamType || 'NONE'
  )
  const [isPublic, setIsPublic] = useState(initial?.isPublic ?? true)
  const [order, setOrder] = useState(initial?.order ?? 0)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) {
      toast.error('Email is required')
      return
    }

    setLoading(true)
    const payload = {
      email,
      name: name || null,
      password: password || undefined,
      role,
      bio: bio || null,
      phone: phone || null,
      avatar: avatar || null,
      position: teamType !== 'NONE' ? position || null : null,
      linkedIn: teamType !== 'NONE' ? linkedIn || null : null,
      teamType: teamType === 'NONE' ? null : teamType,
      isPublic,
      order,
    }

    const url = initial?.id ? `/api/admin/users/${initial.id}` : '/api/admin/users'
    const method = initial?.id ? 'PUT' : 'POST'

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to save user')
      }

      toast.success(initial?.id ? 'User updated' : 'User created')
      if (onSuccess) onSuccess()
      router.refresh()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column: Core Info */}
        <div className="space-y-4">
          <div className="bg-white p-5 rounded-none border border-slate-200 space-y-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <UserIcon className="w-3.5 h-3.5" /> Core Account
            </h3>
            
            <div className="space-y-2">
              <Label htmlFor="email" className="text-xs font-semibold">Email Address *</Label>
              <div className="relative">
                <AtSign className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="pl-9"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name" className="text-xs font-semibold">Full Name</Label>
              <Input
                id="name"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="John Doe"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">{initial?.id ? 'New Password (leave blank to keep)' : 'Password'}</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                autoComplete="new-password"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role" className="text-xs font-semibold flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5" /> System Role
              </Label>
              <Select value={role} onValueChange={(v: 'ADMIN' | 'EDITOR') => setRole(v)}>

                <SelectTrigger id="role">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ADMIN">Administrator</SelectItem>
                  <SelectItem value="EDITOR">Editor</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="bg-white p-5 rounded-none border border-slate-200 space-y-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <Briefcase className="w-3.5 h-3.5" /> Team Settings
            </h3>
            
            <div className="space-y-2">
              <Label className="text-xs font-semibold">Display as Team Member?</Label>
              <Select value={teamType} onValueChange={(v: 'BOARD' | 'MANAGEMENT' | 'NONE') => setTeamType(v)}>

                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="NONE">Not a Team Member</SelectItem>
                  <SelectItem value="BOARD">Board of Trustees</SelectItem>
                  <SelectItem value="MANAGEMENT">Management Team</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {teamType !== 'NONE' && (
              <div className="space-y-4 pt-2 animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="space-y-2">
                  <Label htmlFor="position" className="text-xs font-semibold">Job Title / Position</Label>
                  <Input
                    id="position"
                    value={position}
                    onChange={e => setPosition(e.target.value)}
                    placeholder="e.g. CEO, Founder"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="linkedIn" className="text-xs font-semibold">LinkedIn URL</Label>
                  <Input
                    id="linkedIn"
                    value={linkedIn}
                    onChange={e => setLinkedIn(e.target.value)}
                    placeholder="https://linkedin.com/in/..."
                  />
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-none border border-slate-100">
                  <div className="space-y-0.5">
                    <p className="text-sm font-medium">Public Visibility</p>
                    <p className="text-xs text-slate-500">Show on the public team page</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsPublic(!isPublic)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-none transition-colors ${
                      isPublic ? 'bg-primary' : 'bg-slate-200'
                    }`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-none bg-white transition-transform ${
                      isPublic ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="order" className="text-xs font-semibold">Display Order</Label>
                  <Input
                    id="order"
                    type="number"
                    value={order}
                    onChange={e => setOrder(parseInt(e.target.value) || 0)}
                    className="w-24"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Media & Bio */}
        <div className="space-y-4">
          <div className="bg-white p-5 rounded-none border border-slate-200 space-y-4 text-center">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest text-left">Profile Image</h3>
            
            <div className="relative inline-block group">
              <div className="w-32 h-32 rounded-none border-4 border-slate-50 overflow-hidden bg-slate-100 mx-auto shadow-inner relative">
                {avatar ? (
                  <Image 
                    src={avatar} 
                    alt="Avatar" 
                    fill
                    className="object-cover"
                    unoptimized={avatar.includes('mauzoplus.app') || avatar.startsWith('http')}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-300">
                    <UserIcon className="w-12 h-12" />
                  </div>
                )}
              </div>

              <Button
                type="button"
                variant="secondary"
                size="sm"
                className="absolute bottom-0 right-0 rounded-none shadow-lg border-2 border-white hover:scale-105 transition-transform w-8 h-8 p-0"
                onClick={() => setMediaOpen(true)}
              >
                <ImagePlus className="w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-2">
              <Button 
                type="button" 
                variant="outline" 
                size="sm" 
                className="w-full gap-2 border-dashed"
                onClick={() => setMediaOpen(true)}
              >
                <Plus className="w-3.5 h-3.5" /> Select from Gallery
              </Button>
              {avatar && (
                <Input
                  value={avatar}
                  readOnly
                  className="text-[10px] h-7 bg-slate-50 text-slate-500 font-mono"
                />
              )}
            </div>
          </div>

          <div className="bg-white p-5 rounded-none border border-slate-200 space-y-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <Info className="w-3.5 h-3.5" /> Biography
            </h3>
            <Textarea
              value={bio}
              onChange={e => setBio(e.target.value)}
              placeholder="Tell us about this user..."
              className="min-h-[150px] resize-none"
            />
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-xs font-semibold">Phone Number</Label>
              <Input
                id="phone"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="+1 ..."
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 pt-4 border-t sticky bottom-0 bg-white pb-2 mt-auto">
        {onCancel && (
          <Button type="button" variant="ghost" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button 
          type="submit" 
          disabled={loading} 
          className="gap-2 bg-primary hover:bg-primary/90"
        >
          <Save className="w-4 h-4" />
          {loading ? 'Saving...' : initial?.id ? 'Update User' : 'Create User'}
        </Button>
      </div>

      <MediaLibraryModal
        open={mediaOpen}
        onOpenChange={setMediaOpen}
        onSelect={setAvatar}
      />
    </form>

  )
}

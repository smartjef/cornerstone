'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { toast } from 'sonner'
import { ArrowLeft, Plus, Save } from 'lucide-react'
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
import { ImagePlus } from 'lucide-react'

interface TeamMember {
  id?: string
  name: string
  slug: string
  position: string
  bio: string | null
  avatar: string | null
  email: string | null
  linkedIn: string | null
  teamType: 'BOARD' | 'MANAGEMENT'
  isPublic: boolean
  order: number
  createdAt?: string
}

interface Props {
  initial?: TeamMember & { id?: string }
  mode: 'create' | 'edit'
}

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export default function TeamMemberForm({ initial, mode }: Props) {
  const router = useRouter()

  const [name, setName] = useState(initial?.name || '')
  const [position, setPosition] = useState(initial?.position || '')
  const [teamType, setTeamType] = useState<'BOARD' | 'MANAGEMENT'>(
    initial?.teamType || 'BOARD',
  )
  const [bio, setBio] = useState(initial?.bio || '')
  const [avatar, setAvatar] = useState(initial?.avatar || '')
  const [email, setEmail] = useState(initial?.email || '')
  const [linkedIn, setLinkedIn] = useState(initial?.linkedIn || '')
  const [isPublic, setIsPublic] = useState(initial?.isPublic ?? true)
  const [order, setOrder] = useState(initial?.order ?? 0)
  const [saving, setSaving] = useState(false)
  const [mediaOpen, setMediaOpen] = useState(false)

  async function save() {
    if (!name.trim()) {
      toast.error('Name is required')
      return
    }
    if (!position.trim()) {
      toast.error('Position is required')
      return
    }

    setSaving(true)
    const payload = {
      name: name.trim(),
      slug: slugify(name.trim()),
      position: position.trim(),
      teamType,
      bio: bio.trim() || null,
      avatar: avatar.trim() || null,
      email: email.trim() || null,
      linkedIn: linkedIn.trim() || null,
      isPublic,
      order,
    }

    const url = mode === 'create' ? '/api/admin/team' : `/api/admin/team/${initial!.id}`
    const method = mode === 'create' ? 'POST' : 'PUT'

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) {
        const d = await res.json()
        throw new Error(d.error || 'Save failed')
      }
      toast.success(mode === 'create' ? 'Team member created.' : 'Team member updated.')
      router.push('/admin/team')
      router.refresh()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Save failed')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Sticky header bar */}
      <div className="sticky top-0 z-20 bg-white border-b border-slate-200 -mx-4 sm:-mx-6 px-4 sm:px-6 py-3 flex items-center justify-between mb-6">
        <div className="flex items-center gap-3 min-w-0">
          <Link
            href="/admin/team"
            className="flex items-center justify-center w-8 h-8 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors shrink-0"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div className="min-w-0">
            <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
              {mode === 'create' ? 'New Member' : 'Edit Member'}
            </p>
            <p className="text-sm font-semibold text-slate-800 truncate max-w-xs">
              {name || 'Untitled'}
            </p>
          </div>
        </div>
        <Button
          type="button"
          size="sm"
          disabled={saving}
          onClick={save}
          className="gap-1.5 text-xs bg-primary hover:bg-primary/90"
        >
          <Save className="w-3.5 h-3.5" />
          {saving ? 'Saving…' : 'Save'}
        </Button>
      </div>

      <div className="space-y-5">
        {/* Basic info card */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-4">
          <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Basic Information
          </h2>

          <div>
            <Label htmlFor="name" className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Name <span className="text-red-400">*</span>
            </Label>
            <Input
              id="name"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="e.g. Jane Smith"
              className="mt-1.5 border-slate-200 focus:border-primary"
            />
          </div>

          <div>
            <Label htmlFor="position" className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Position <span className="text-red-400">*</span>
            </Label>
            <Input
              id="position"
              value={position}
              onChange={e => setPosition(e.target.value)}
              placeholder="e.g. Board Chair, Executive Director"
              className="mt-1.5 border-slate-200 focus:border-primary"
            />
          </div>

          <div>
            <Label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Team Type
            </Label>
            <Select value={teamType} onValueChange={v => setTeamType(v as 'BOARD' | 'MANAGEMENT')}>
              <SelectTrigger className="mt-1.5 border-slate-200 focus:border-primary">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="BOARD">Board of Trustees</SelectItem>
                <SelectItem value="MANAGEMENT">Management Team</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="bio" className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Bio
            </Label>
            <Textarea
              id="bio"
              value={bio}
              onChange={e => setBio(e.target.value)}
              rows={4}
              placeholder="Brief biography…"
              className="mt-1.5 resize-none border-slate-200 focus:border-primary text-sm"
            />
          </div>
        </div>

        {/* Media & Contact card */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-4">
          <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Media & Contact
          </h2>

          <div>
            <Label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">
              Profile Photo
            </Label>
            
            <div className="flex items-start gap-4">
              <div className="w-24 h-24 rounded-full border-2 border-slate-200 bg-slate-50 overflow-hidden flex-shrink-0 relative">
                {avatar ? (
                  <Image
                    src={avatar}
                    alt="Photo preview"
                    fill
                    className="object-cover"
                    unoptimized={avatar.includes('mauzoplus.app') || avatar.startsWith('http')}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-300">
                    <ImagePlus className="w-8 h-8" />
                  </div>
                )}
              </div>

              
              <div className="flex-1 space-y-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  type="button"
                  onClick={() => setMediaOpen(true)}
                  className="gap-2"
                >
                  <Plus className="w-4 h-4" />
                  {avatar ? 'Change Photo' : 'Select Photo'}
                </Button>
                <p className="text-xs text-slate-400">
                  Select a photo from your media library or upload a new one.
                </p>
                {avatar && (
                  <Input 
                    value={avatar} 
                    readOnly 
                    className="text-[10px] h-7 bg-slate-50 text-slate-400" 
                  />
                )}
              </div>
            </div>

            <MediaLibraryModal
              open={mediaOpen}
              onOpenChange={setMediaOpen}
              onSelect={setAvatar}
              title="Select Profile Photo"
            />
          </div>

          <div>
            <Label htmlFor="email" className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="jane@example.com"
              className="mt-1.5 border-slate-200 focus:border-primary text-sm"
            />
          </div>

          <div>
            <Label htmlFor="linkedin" className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              LinkedIn URL
            </Label>
            <Input
              id="linkedin"
              value={linkedIn}
              onChange={e => setLinkedIn(e.target.value)}
              placeholder="https://linkedin.com/in/janesmith"
              className="mt-1.5 border-slate-200 focus:border-primary text-sm"
            />
          </div>
        </div>

        {/* Visibility & ordering card */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-4">
          <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Visibility & Ordering
          </h2>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-800">Public</p>
              <p className="text-xs text-slate-400 mt-0.5">Show this member on the public site</p>
            </div>
            <button
              type="button"
              onClick={() => setIsPublic(v => !v)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                isPublic ? 'bg-primary' : 'bg-slate-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
                  isPublic ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div>
            <Label htmlFor="order" className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Display Order
            </Label>
            <Input
              id="order"
              type="number"
              value={order}
              onChange={e => setOrder(Number(e.target.value))}
              className="mt-1.5 border-slate-200 focus:border-primary text-sm w-32"
            />
            <p className="text-xs text-slate-400 mt-1">Lower numbers appear first.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

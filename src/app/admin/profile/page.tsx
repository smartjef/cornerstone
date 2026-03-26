'use client'

import { useState, useEffect } from 'react'
import AdminShell from '@/components/admin/admin-shell'
import { toast } from 'sonner'
import { Save, User, Mail, Shield, Smartphone, Key, Info, Camera } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import MediaLibraryModal from '@/components/admin/media-library-modal'
import Image from 'next/image'

export default function ProfilePage() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [mediaOpen, setMediaOpen] = useState(false)

  // Profile state
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    bio: '',
    phone: '',
    avatar: '',
    twoFaEnabled: false
  })

  // Password state
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  useEffect(() => {
    fetch('/api/admin/profile')
      .then(res => res.json())
      .then(data => {
        setProfile({
          name: data.name || '',
          email: data.email || '',
          bio: data.bio || '',
          phone: data.phone || '',
          avatar: data.avatar || '',
          twoFaEnabled: data.twoFaEnabled || false
        })
        setLoading(false)
      })
      .catch(() => {
        toast.error('Failed to load profile')
        setLoading(false)
      })
  }, [])

  async function handleUpdateProfile(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    try {
      const res = await fetch('/api/admin/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile)
      })
      if (!res.ok) throw new Error('Update failed')
      toast.success('Profile updated successfully')
    } catch {
      toast.error('Failed to update profile')
    } finally {
      setSaving(false)
    }
  }

  async function handleChangePassword(e: React.FormEvent) {
    e.preventDefault()
    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match')
      return
    }
    setSaving(true)
    try {
      const res = await fetch('/api/admin/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, newPassword })
      })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Update failed')
      }
      toast.success('Password changed successfully')
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to change password')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <AdminShell title="Profile">
        <div className="max-w-4xl mx-auto py-12 text-center text-slate-500">
          Loading profile...
        </div>
      </AdminShell>
    )
  }

  return (
    <AdminShell title="Profile">
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Your Profile</h1>
          <p className="text-slate-500 text-sm mt-1">Manage your account information and security settings.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Info update */}
          <div className="lg:col-span-2 space-y-6">
            <form onSubmit={handleUpdateProfile} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              <div className="p-6 border-b border-slate-100 bg-slate-50/50">
                <h2 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                  <User className="w-4 h-4 text-primary" /> General Information
                </h2>
              </div>
              <div className="p-6 space-y-6">
                <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
                  <div className="relative group">
                    <div className="w-24 h-24 rounded-full border-4 border-slate-50 bg-slate-100 overflow-hidden shadow-inner relative">
                      {profile.avatar ? (
                        <Image 
                          src={profile.avatar} 
                          alt="Avatar" 
                          fill 
                          className="object-cover" 
                          unoptimized={profile.avatar.includes('mauzoplus.app') || profile.avatar.startsWith('http')}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-300">
                          <User className="w-10 h-10" />
                        </div>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => setMediaOpen(true)}
                      className="absolute bottom-0 right-0 p-1.5 bg-primary text-white rounded-full border-2 border-white shadow-lg hover:scale-105 transition-transform"
                    >
                      <Camera className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="flex-1 w-full space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label className="text-xs uppercase tracking-wider text-slate-400 font-bold">Full Name</Label>
                        <Input 
                          value={profile.name} 
                          onChange={e => setProfile(p => ({ ...p, name: e.target.value }))}
                          placeholder="Your Name"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-xs uppercase tracking-wider text-slate-400 font-bold">Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                          <Input 
                            value={profile.email} 
                            onChange={e => setProfile(p => ({ ...p, email: e.target.value }))}
                            className="pl-9"
                            placeholder="email@example.com"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 pt-2">
                  <div className="space-y-1.5">
                    <Label className="text-xs uppercase tracking-wider text-slate-400 font-bold">Biography</Label>
                    <Textarea 
                      value={profile.bio} 
                      onChange={e => setProfile(p => ({ ...p, bio: e.target.value }))}
                      placeholder="Tell us about yourself..."
                      rows={4}
                      className="resize-none"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs uppercase tracking-wider text-slate-400 font-bold">Phone Number</Label>
                    <div className="relative">
                      <Smartphone className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                      <Input 
                        value={profile.phone} 
                        onChange={e => setProfile(p => ({ ...p, phone: e.target.value }))}
                        className="pl-9"
                        placeholder="+1 ..."
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
                <Button type="submit" disabled={saving} className="gap-2">
                  <Save className="w-4 h-4" />
                  {saving ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </form>

            <form onSubmit={handleChangePassword} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              <div className="p-6 border-b border-slate-100 bg-slate-50/50">
                <h2 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-amber-500" /> Change Password
                </h2>
              </div>
              <div className="p-6 space-y-4">
                <div className="space-y-1.5">
                  <Label className="text-xs uppercase tracking-wider text-slate-400 font-bold">Current Password</Label>
                  <Input 
                    type="password"
                    value={currentPassword} 
                    onChange={e => setCurrentPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label className="text-xs uppercase tracking-wider text-slate-400 font-bold">New Password</Label>
                    <Input 
                      type="password"
                      value={newPassword} 
                      onChange={e => setNewPassword(e.target.value)}
                      required
                      minLength={8}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs uppercase tracking-wider text-slate-400 font-bold">Confirm New Password</Label>
                    <Input 
                      type="password"
                      value={confirmPassword} 
                      onChange={e => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
                <Button type="submit" disabled={saving} className="gap-2" variant="outline">
                  <Key className="w-4 h-4" />
                  {saving ? 'Updating...' : 'Update Password'}
                </Button>
              </div>
            </form>
          </div>

          {/* Right: Security info */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
              <h2 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-emerald-500" /> Two-Factor Auth
              </h2>
              <p className="text-xs text-slate-500 leading-relaxed">
                Add an extra layer of security to your account by enabling two-factor authentication.
              </p>
              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-100">
                <span className="text-sm font-medium">Status</span>
                <span className={`text-xs font-bold px-2 py-1 rounded-full ${profile.twoFaEnabled ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-600'}`}>
                  {profile.twoFaEnabled ? 'Enabled' : 'Disabled'}
                </span>
              </div>
              <Button variant="outline" className="w-full text-xs" disabled>
                Configure 2FA
              </Button>
              <p className="text-[10px] text-slate-400 text-center italic">
                Coming soon to your dashboard.
              </p>
            </div>

            <div className="bg-blue-50 rounded-xl border border-blue-100 p-6 space-y-3 font-medium text-blue-800">
              <h2 className="text-xs flex items-center gap-2 uppercase tracking-wider">
                <Info className="w-3.5 h-3.5" /> Security Tip
              </h2>
              <p className="text-xs leading-relaxed opacity-80">
                Use a strong, unique password for your account. We recommend using a passphrase that&apos;s at least 12 characters long.
              </p>
            </div>
          </div>
        </div>

        <MediaLibraryModal 
          open={mediaOpen} 
          onOpenChange={setMediaOpen} 
          onSelect={(url) => setProfile(p => ({ ...p, avatar: url }))} 
        />
      </div>
    </AdminShell>
  )
}

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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

export default function ProfilePage() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [mediaOpen, setMediaOpen] = useState(false)
  const [twoFaModalOpen, setTwoFaModalOpen] = useState(false)

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
      window.dispatchEvent(new Event('profile-updated'))
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
    } catch (_err) {
      toast.error(_err instanceof Error ? _err.message : 'Failed to change password')
    } finally {
      setSaving(false)
    }
  }

  async function handleStart2faSetup() {
    setTwoFaModalOpen(true)
  }

  async function handleDisable2fa() {
    if (!confirm('Are you sure you want to disable two-factor authentication?')) return
    setSaving(true)
    try {
      const res = await fetch('/api/admin/profile/2fa/disable', { method: 'POST' })
      if (!res.ok) throw new Error('Disable failed')
      setProfile(p => ({ ...p, twoFaEnabled: false }))
      toast.success('Two-factor authentication disabled')
    } catch {
      toast.error('Failed to disable 2FA')
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
            <form onSubmit={handleUpdateProfile} className="bg-white rounded-none border border-slate-200 overflow-hidden">
              <div className="p-6 border-b border-slate-100 bg-slate-50/50">
                <h2 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                  <User className="w-4 h-4 text-primary" /> General Information
                </h2>
              </div>
              <div className="p-6 space-y-6">
                <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
                  <div className="relative group">
                    <div className="w-24 h-24 rounded-none border-4 border-slate-50 bg-slate-100 overflow-hidden shadow-inner relative">
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
                      className="absolute bottom-0 right-0 p-1.5 bg-primary text-white rounded-none border-2 border-white shadow-lg hover:scale-105 transition-transform"
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

            <form onSubmit={handleChangePassword} className="bg-white rounded-none border border-slate-200 overflow-hidden">
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
            <div className="bg-white rounded-none border border-slate-200 p-6 space-y-4">
              <h2 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-emerald-500" /> Two-Factor Auth
              </h2>
              <p className="text-xs text-slate-500 leading-relaxed">
                Add an extra layer of security to your account by enabling two-factor authentication.
              </p>
              <div className="flex items-center justify-between p-3 rounded-none bg-slate-50 border border-slate-100">
                <span className="text-sm font-medium">Status</span>
                <span className={`text-xs font-bold px-2 py-1 rounded-none ${profile.twoFaEnabled ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-600'}`}>
                  {profile.twoFaEnabled ? 'Enabled' : 'Disabled'}
                </span>
              </div>
              
              {!profile.twoFaEnabled ? (
                <Button 
                  onClick={handleStart2faSetup} 
                  variant="outline" 
                  className="w-full text-xs"
                  disabled={saving}
                >
                  Configure 2FA
                </Button>
              ) : (
                <Button 
                  onClick={handleDisable2fa} 
                  variant="outline" 
                  className="w-full text-xs text-red-500 hover:text-red-600 hover:bg-red-50"
                  disabled={saving}
                >
                  Disable 2FA
                </Button>
              )}
            </div>

            <div className="bg-blue-50 rounded-none border border-blue-100 p-6 space-y-3 font-medium text-blue-800">
              <h2 className="text-xs flex items-center gap-2 uppercase tracking-wider">
                <Info className="w-3.5 h-3.5" /> Security Tip
              </h2>
              <p className="text-xs leading-relaxed opacity-80">
                Use a strong, unique password for your account. We recommend using a passphrase that&apos;s at least 12 characters long.
              </p>
            </div>
          </div>
        </div>

        {/* 2FA Setup Modal */}
        <TwoFaSetupModal 
          open={twoFaModalOpen}
          onOpenChange={setTwoFaModalOpen}
          onSuccess={() => {
            setProfile(p => ({ ...p, twoFaEnabled: true }))
            setTwoFaModalOpen(false)
          }}
        />

        <MediaLibraryModal 
          open={mediaOpen} 
          onOpenChange={setMediaOpen} 
          onSelect={(url) => setProfile(p => ({ ...p, avatar: url }))} 
        />
      </div>
    </AdminShell>
  )
}

function TwoFaSetupModal({ open, onOpenChange, onSuccess }: { open: boolean, onOpenChange: (open: boolean) => void, onSuccess: () => void }) {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [qrCode, setQrCode] = useState('')
  const [secret, setSecret] = useState('')
  const [token, setToken] = useState('')

  useEffect(() => {
    if (open) {
      setStep(1)
      setToken('')
      handleGenerate()
    }
  }, [open])

  async function handleGenerate() {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/profile/2fa/generate', { method: 'POST' })
      const data = await res.json()
      if (res.ok) {
        setQrCode(data.qrCodeUrl)
        setSecret(data.secret)
      } else {
        toast.error(data.error || 'Failed to generate 2FA secret')
      }
    } catch {
      toast.error('Failed to generate 2FA secret')
    } finally {
      setLoading(false)
    }
  }

  async function handleVerify() {
    if (!token || token.length !== 6) {
      toast.error('Please enter a valid 6-digit code')
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/admin/profile/2fa/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, secret })
      })
      const data = await res.json()
      if (res.ok) {
        toast.success('Two-factor authentication enabled!')
        onSuccess()
      } else {
        toast.error(data.error || 'Invalid code')
      }
    } catch {
      toast.error('Failed to verify code')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md rounded-none">
        <DialogHeader>
          <DialogTitle>Setup Two-Factor Auth</DialogTitle>
          <DialogDescription>
            Follow the steps below to secure your account.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4 space-y-6">
          {step === 1 ? (
            <div className="space-y-4 text-center">
              <div className="bg-slate-50 p-4 border border-slate-100 rounded-none inline-block mx-auto">
                {qrCode ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={qrCode} alt="QR Code" className="w-48 h-48 mx-auto" />
                ) : (
                  <div className="w-48 h-48 flex items-center justify-center text-slate-300">
                    Loading...
                  </div>
                )}
              </div>
              <div className="text-left space-y-2">
                <p className="text-sm font-medium text-slate-800">1. Scan the QR Code</p>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Open your authenticator app (like Google Authenticator or Authy) and scan this QR code.
                </p>
                <div className="pt-2">
                  <p className="text-[10px] text-slate-400 uppercase font-bold">Manual Entry Key</p>
                  <code className="text-xs bg-slate-100 px-2 py-1 rounded-none block mt-1 font-mono break-all">
                    {secret}
                  </code>
                </div>
              </div>
              <Button onClick={() => setStep(2)} className="w-full mt-4">
                I&apos;ve scanned it
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm font-medium text-slate-800">2. Verify the Code</p>
                <p className="text-xs text-slate-500">
                  Enter the 6-digit code from your authenticator app to confirm setup.
                </p>
              </div>
              <Input 
                value={token}
                onChange={e => setToken(e.target.value.replace(/\D/g, '').slice(0, 6))}
                placeholder="000000"
                className="text-center text-2xl tracking-[0.5em] font-bold h-14"
                maxLength={6}
                autoFocus
              />
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                  Back
                </Button>
                <Button onClick={handleVerify} disabled={loading} className="flex-1">
                  {loading ? 'Verifying...' : 'Enable 2FA'}
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { toast } from 'sonner'
import { Toaster } from '@/components/ui/sonner'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  
  // 2FA state
  const [twoFaRequired, setTwoFaRequired] = useState(false)
  const [userId, setUserId] = useState('')
  const [token, setToken] = useState('')

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const payload = twoFaRequired 
      ? { token, userId }
      : { email, password }

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = await res.json()
      setLoading(false)

      if (!res.ok) {
        setError(data.error || 'Login failed')
        return
      }

      if (data.twoFaRequired) {
        setTwoFaRequired(true)
        setUserId(data.userId)
        return
      }

      router.push('/admin')
      router.refresh()
    } catch {
      toast.error('Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
      <Toaster richColors position="top-right" />
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="relative w-16 h-16 mx-auto mb-4">
            <Image src="/logo.png" alt="Cornerstone Foundation" fill className="object-contain" priority />
          </div>
          <h1 className="text-white text-xl font-bold">Cornerstone Admin</h1>
          <p className="text-slate-400 text-sm mt-1">
            {twoFaRequired ? 'Enter your 2FA code' : 'Sign in to manage content'}
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-slate-900 border border-slate-800 rounded-none p-8 space-y-5"
        >
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-none">
              {error}
            </div>
          )}

          {!twoFaRequired ? (
            <>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  placeholder="admin@cornerstone.or.ke"
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-none text-white placeholder-slate-500 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-none text-white placeholder-slate-500 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                />
              </div>
            </>
          ) : (
            <div className="space-y-3">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                6-Digit Authenticator Code
              </label>
              <input
                type="text"
                value={token}
                onChange={e => setToken(e.target.value.replace(/\D/g, '').slice(0, 6))}
                required
                autoFocus
                placeholder="000000"
                className="w-full px-4 py-4 bg-slate-800 border border-slate-700 rounded-none text-white placeholder-slate-500 text-2xl text-center tracking-[0.5em] font-bold focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
              />
              <button 
                type="button" 
                onClick={() => setTwoFaRequired(false)}
                className="text-xs text-slate-500 hover:text-white transition-colors"
              >
                ← Back to login
              </button>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-primary hover:bg-primary/90 disabled:opacity-60 text-white font-semibold text-sm rounded-none transition-colors mt-2"
          >
            {loading ? 'Verifying…' : twoFaRequired ? 'Verify Code' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  )
}

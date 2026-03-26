import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { authenticator } from 'otplib'
import { prisma } from '@/lib/prisma'
import { signToken } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const { email, password, token, userId } = await request.json()

    // Step 2: Verify 2FA token
    if (token && userId) {
      const user = await prisma.user.findUnique({ where: { id: userId } })
      if (!user || !user.twoFaEnabled || !user.twoFaSecret) {
        return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
      }

      const isValid = authenticator.check(token, user.twoFaSecret)
      if (!isValid) {
        return NextResponse.json({ error: 'Invalid 2FA code' }, { status: 401 })
      }

      return createAuthResponse(user)
    }

    // Step 1: Verify Email/Password
    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 })
    }

    const user = await prisma.user.findUnique({ where: { email } })
    if (!user || !user.password) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    const valid = await bcrypt.compare(password, user.password)
    if (!valid) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    // Check if 2FA is required
    if (user.twoFaEnabled) {
      return NextResponse.json({
        twoFaRequired: true,
        userId: user.id
      })
    }

    return createAuthResponse(user)
  } catch (err) {
    console.error('Login error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

interface AuthUser {
  id: string
  email: string
  name: string | null
  role: string
}

async function createAuthResponse(user: AuthUser) {
  const token = await signToken({
    userId: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  })

  const response = NextResponse.json({
    user: { id: user.id, email: user.email, name: user.name, role: user.role },
  })

  response.cookies.set('auth-token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  })

  return response
}

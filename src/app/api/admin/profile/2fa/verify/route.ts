import { NextRequest, NextResponse } from 'next/server'
import { authenticator } from 'otplib'
import { prisma } from '@/lib/prisma'
import { getSession } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { token, secret } = await request.json()

    if (!token || !secret) {
      return NextResponse.json({ error: 'Token and secret are required' }, { status: 400 })
    }

    const isValid = authenticator.check(token, secret)

    if (!isValid) {
      return NextResponse.json({ error: 'Invalid 2FA code' }, { status: 400 })
    }

    // Update user to enable 2FA
    await prisma.user.update({
      where: { id: session.userId },
      data: {
        twoFaSecret: secret,
        twoFaEnabled: true
      }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('2FA verify error:', error)
    return NextResponse.json({ error: 'Failed to verify and enable 2FA' }, { status: 500 })
  }
}

import { NextResponse } from 'next/server'
import { authenticator } from 'otplib'
import QRCode from 'qrcode'
import { getSession } from '@/lib/auth'

export async function POST() {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const secret = authenticator.generateSecret()
    const otpauth = authenticator.keyuri(
      session.email,
      'Cornerstone Foundation',
      secret
    )

    const qrCodeUrl = await QRCode.toDataURL(otpauth)

    return NextResponse.json({ secret, qrCodeUrl })
  } catch (error) {
    console.error('2FA generate error:', error)
    return NextResponse.json({ error: 'Failed to generate 2FA secret' }, { status: 500 })
  }
}

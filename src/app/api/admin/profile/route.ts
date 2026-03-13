import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getSession } from '@/lib/auth'
import bcrypt from 'bcryptjs'

export async function GET() {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: { id: true, name: true, email: true, role: true, bio: true, phone: true, avatar: true, twoFaEnabled: true, createdAt: true },
  })
  if (!user) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(user)
}

export async function PUT(request: NextRequest) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()
  const { name, email, bio, phone, avatar, currentPassword, newPassword } = body

  const user = await prisma.user.findUnique({ where: { id: session.userId } })
  if (!user) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  // If changing password, verify current password
  if (newPassword) {
    if (!currentPassword) return NextResponse.json({ error: 'Current password is required' }, { status: 400 })
    if (!user.password) return NextResponse.json({ error: 'User does not have a password' }, { status: 400 })
    const valid = await bcrypt.compare(currentPassword, user.password)
    if (!valid) return NextResponse.json({ error: 'Current password is incorrect' }, { status: 400 })

    if (newPassword.length < 8) return NextResponse.json({ error: 'New password must be at least 8 characters' }, { status: 400 })
  }

  const updateData: Record<string, unknown> = {}
  if (name !== undefined) updateData.name = name
  if (email !== undefined) updateData.email = email
  if (bio !== undefined) updateData.bio = bio
  if (phone !== undefined) updateData.phone = phone
  if (avatar !== undefined) updateData.avatar = avatar
  if (newPassword) updateData.password = await bcrypt.hash(newPassword, 12)

  const updated = await prisma.user.update({
    where: { id: session.userId },
    data: updateData,
    select: { id: true, name: true, email: true, role: true, bio: true, phone: true, avatar: true, twoFaEnabled: true },
  })

  return NextResponse.json(updated)
}

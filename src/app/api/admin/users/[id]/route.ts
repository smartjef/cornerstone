import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { getSession } from '@/lib/auth'

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession()
  if (!session || session.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const { id } = await params
  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      bio: true,
      phone: true,
      avatar: true,
      slug: true,
      position: true,
      linkedIn: true,
      teamType: true,
      isPublic: true,
      order: true,
      createdAt: true,
    },
  })

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }

  return NextResponse.json(user)
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession()
  if (!session || session.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const { id } = await params
  const body = await request.json()
  const {
    name,
    email,
    password,
    role,
    bio,
    phone,
    avatar,
    slug,
    position,
    linkedIn,
    teamType,
    isPublic,
    order,
  } = body

  const data: Record<string, unknown> = {}
  if (name !== undefined) data.name = name
  if (email !== undefined) data.email = email
  if (role !== undefined) data.role = role
  if (bio !== undefined) data.bio = bio
  if (phone !== undefined) data.phone = phone
  if (avatar !== undefined) data.avatar = avatar
  if (slug !== undefined) data.slug = slug
  if (position !== undefined) data.position = position
  if (linkedIn !== undefined) data.linkedIn = linkedIn
  if (teamType !== undefined) data.teamType = teamType
  if (isPublic !== undefined) data.isPublic = isPublic
  if (order !== undefined) data.order = order

  if (password) {
    data.password = await bcrypt.hash(password, 12)
  }

  const user = await prisma.user.update({
    where: { id },
    data,
  })

  return NextResponse.json(user)
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession()
  if (!session || session.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const { id } = await params
  await prisma.user.delete({ where: { id } })
  return NextResponse.json({ success: true })
}

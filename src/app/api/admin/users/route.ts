import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { getSession } from '@/lib/auth'

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

export async function GET() {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const users = await prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
  })

  return NextResponse.json(users)
}

export async function POST(request: NextRequest) {
  const session = await getSession()
  if (!session || session.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const body = await request.json()
  const {
    email,
    name,
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

  if (!email) {
    return NextResponse.json({ error: 'email is required' }, { status: 400 })
  }

  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) return NextResponse.json({ error: 'Email already in use' }, { status: 409 })

  let hashed = null
  if (password) {
    hashed = await bcrypt.hash(password, 12)
  }

  let finalSlug = slug || (name ? slugify(name) : null)
  if (finalSlug) {
    const existingSlug = await prisma.user.findUnique({ where: { slug: finalSlug } })
    if (existingSlug) finalSlug = `${finalSlug}-${Date.now()}`
  }

  const user = await prisma.user.create({
    data: {
      email,
      name: name || null,
      password: hashed,
      role: role || 'EDITOR',
      bio: bio || null,
      phone: phone || null,
      avatar: avatar || null,
      slug: finalSlug,
      position: position || null,
      linkedIn: linkedIn || null,
      teamType: teamType || null,
      isPublic: isPublic ?? true,
      order: order ?? 0,
    },
  })

  return NextResponse.json(user, { status: 201 })
}

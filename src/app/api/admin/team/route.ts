import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getSession } from '@/lib/auth'

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

export async function GET() {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const members = await prisma.user.findMany({
    where: { teamType: { not: null } },
    orderBy: [{ teamType: 'asc' }, { order: 'asc' }, { name: 'asc' }],
  })
  return NextResponse.json(members)
}

export async function POST(request: NextRequest) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()
  const { name, position, bio, photo, avatar, email, linkedIn, teamType, isPublic, order } = body
  if (!name || !position) return NextResponse.json({ error: 'name and position are required' }, { status: 400 })

  const slug = slugify(name)
  const existing = await prisma.user.findUnique({ where: { slug } })
  const finalSlug = existing ? `${slug}-${Date.now()}` : slug

  const member = await prisma.user.create({
    data: {
      name,
      slug: finalSlug,
      position,
      bio: bio || null,
      avatar: avatar || photo || null,
      email: email || null,
      linkedIn: linkedIn || null,
      teamType: teamType || 'MANAGEMENT',
      isPublic: isPublic ?? true,
      order: order ?? 0,
    },
  })
  return NextResponse.json(member, { status: 201 })
}

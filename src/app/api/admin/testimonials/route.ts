import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getSession } from '@/lib/auth'

export async function GET() {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const testimonials = await prisma.testimonial.findMany({ orderBy: [{ order: 'asc' }, { createdAt: 'desc' }] })
  return NextResponse.json(testimonials)
}

export async function POST(request: NextRequest) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await request.json()
  const { name, role, text, stars, isPublic, order, image } = body
  if (!name || !text) return NextResponse.json({ error: 'name and text are required' }, { status: 400 })
  const t = await prisma.testimonial.create({
    data: { 
      name, 
      role: role || null, 
      text, 
      image: image || null,
      stars: stars ?? 5, 
      isPublic: isPublic ?? true, 
      order: order ?? 0 
    },
  })

  return NextResponse.json(t, { status: 201 })
}

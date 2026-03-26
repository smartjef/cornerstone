import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getSession } from '@/lib/auth'

export async function GET() {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const slides = await prisma.carouselSlide.findMany({ orderBy: { order: 'asc' } })
  return NextResponse.json(slides)
}

export async function POST(request: NextRequest) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await request.json()
  const { image, label, title, subtitle, link, isActive, order } = body
  if (!image || !label) return NextResponse.json({ error: 'image and label are required' }, { status: 400 })
  const slide = await prisma.carouselSlide.create({
    data: { image, label, title: title || null, subtitle: subtitle || null, link: link || null, isActive: isActive ?? true, order: order ?? 0 },
  })
  return NextResponse.json(slide, { status: 201 })
}

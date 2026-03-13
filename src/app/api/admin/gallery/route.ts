import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getSession } from '@/lib/auth'

export async function GET() {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const items = await (prisma as any).galleryItem.findMany({ 
    include: { category: true },
    orderBy: { createdAt: 'desc' } 
  })
  return NextResponse.json(items)
}


export async function POST(request: NextRequest) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()
  const { title, description, images, categoryId } = body

  if (!title) return NextResponse.json({ error: 'title is required' }, { status: 400 })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const item = await (prisma as any).galleryItem.create({
    data: {
      title,
      description: description || null,
      images: images || [],
      categoryId: categoryId || null,
    },
    include: { category: true },
  })


  return NextResponse.json(item, { status: 201 })
}

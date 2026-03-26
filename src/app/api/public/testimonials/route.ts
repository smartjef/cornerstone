import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const testimonials = await prisma.testimonial.findMany({
    where: { isPublic: true },
    orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
  })
  return NextResponse.json(testimonials)
}

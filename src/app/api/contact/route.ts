import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, subject, message } = await request.json()

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'name, email, and message are required' }, { status: 400 })
    }

    const contact = await prisma.contact.create({
      data: { name, email, phone: phone || null, subject: subject || null, message },
    })

    return NextResponse.json({ success: true, id: contact.id }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Failed to submit. Please try again.' }, { status: 500 })
  }
}

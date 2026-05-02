import { NextResponse } from 'next/server'

interface ContactFormData {
  name: string
  email: string
  message: string
}

export async function POST(request: Request) {
  try {
    const body: ContactFormData = await request.json()

    if (!body.name || !body.email || !body.message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    console.log('Contact form submission:', body)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 })
  }
}

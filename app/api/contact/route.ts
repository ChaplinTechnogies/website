import { NextRequest, NextResponse } from 'next/server'
import { logger } from '../../../lib/logger'
import { SecurityValidator } from '../../../lib/security'
import { sendEmail } from '../../../lib/email'
import { createContact, getAllContacts } from '../../../lib/models/Contact'



export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, message, company, phone } = body
    // Ensure phone is a string if present
    const phoneStr = typeof phone === 'string' ? phone : (phone !== undefined && phone !== null ? String(phone) : '');

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      )
    }

    // Validate email format
    if (!SecurityValidator.validateEmail(email)) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      )
    }

    // Validate phone if provided
    if (phoneStr && !SecurityValidator.validatePhone(phoneStr)) {
      return NextResponse.json(
        { error: 'Valid phone number is required' },
        { status: 400 }
      )
    }

    // Sanitize inputs
    const sanitizedData = {
      name: SecurityValidator.sanitizeInput(name),
      email: SecurityValidator.sanitizeInput(email),
      message: SecurityValidator.sanitizeInput(message),
      company: company ? SecurityValidator.sanitizeInput(company) : '',
      phone: phoneStr ? SecurityValidator.sanitizeInput(phoneStr) : ''
    }

    // In a real implementation, you would: ==> Solved
    // 1. Save to database ==> Solved
    // 2. Send to CRM (HubSpot, Salesforce, etc.) ==> Using Defaul storing, this will work after creating a admin dashboards

    // 3. Send notification email to team
    // 4. Send auto-reply to customer
    // 5. Track lead scoring



    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    const newContact = await createContact({
      name,
      email,
      message,
      company,
      phone,
      createdAt: new Date()
    })

    if (!newContact) {
      return NextResponse.json(
        { error: "Contact not created" },
        { status: 400 }
      )
    }

    // sending the email to the contact
    const emailResult = await sendEmail({
      receiver: email,
      message: "Thank you for your message! We'll get back to you within 24 hours.",
      subject: "New contact from Sybella Systems",
      company: "Sybella Systems"
    })

    if (!emailResult.success) {
      logger.error("Failed to send Email", { error: emailResult.error });
    }

    return NextResponse.json(
      { success: true, message: "Contact Saved"},
      { status: 201 }
    )

  } catch (error) {
    logger.error('Contact form error', {
      error: error instanceof Error ? error.message : 'Unknown error'
    })

    return NextResponse.json(
      { error: 'Failed to send message. Please try again.' },
      { status: 500 }
    )
  }
}

export async function GET() {
  // AdsOn
  // 1. Here will add a middleware to enable admins only to access this endpoint
  // Right now will be open response to any one,

  // Return contact form statistics (for admin dashboard)

  try {
    const contacts = await getAllContacts();
    return NextResponse.json(
      { success: true, contacts },
      { status: 200 }
    )
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch contacts" },
      { status: 500 }
    )
  }

}

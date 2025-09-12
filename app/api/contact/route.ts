import { NextRequest, NextResponse } from 'next/server'
import { logger } from '../../../lib/logger'
import { SecurityValidator } from '../../../lib/security'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, message, company, phone } = body

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
    if (phone && !SecurityValidator.validatePhone(phone)) {
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
      phone: phone ? SecurityValidator.sanitizeInput(phone) : ''
    }

    logger.info('Contact form submission', {
      name: sanitizedData.name,
      email: sanitizedData.email,
      hasCompany: !!sanitizedData.company,
      hasPhone: !!sanitizedData.phone,
      messageLength: sanitizedData.message.length,
      timestamp: new Date().toISOString()
    })

    // In a real implementation, you would:
    // 1. Save to database
    // 2. Send to CRM (HubSpot, Salesforce, etc.)
    // 3. Send notification email to team
    // 4. Send auto-reply to customer
    // 5. Track lead scoring

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Mock response
    const response = {
      success: true,
      message: 'Thank you for your message! We\'ll get back to you within 24 hours.',
      leadId: `lead_${Date.now()}`,
      estimatedResponseTime: '24 hours'
    }

    logger.info('Contact form processed successfully', {
      leadId: response.leadId,
      email: sanitizedData.email,
      name: sanitizedData.name
    })

    return NextResponse.json(response)
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
  // Return contact form statistics (for admin dashboard)
  const mockStats = {
    totalSubmissions: 89,
    monthlySubmissions: 23,
    averageResponseTime: '18 hours',
    conversionRate: 15.2,
    recentSubmissions: [
      { name: 'John Doe', email: 'john@example.com', date: '2025-01-15' },
      { name: 'Jane Smith', email: 'jane@example.com', date: '2025-01-14' }
    ]
  }

  return NextResponse.json(mockStats)
}

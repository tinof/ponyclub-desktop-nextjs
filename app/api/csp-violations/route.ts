import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const report = await request.json()
    // Log CSP violations in development
    if (process.env.NODE_ENV === 'development') {
      console.warn('CSP Violation:', report)
    }
    // In a real application, you would send this report to a logging service
    // like Sentry, Report URI, or a custom analytics platform.
    return NextResponse.json({ message: 'CSP report received' }, { status: 200 })
  } catch (error) {
    // Log errors in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error processing CSP report:', error)
    }
    return NextResponse.json({ message: 'Error processing report' }, { status: 400 })
  }
}

// app/api/cron/send-newsletters/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Your cron logic here
    console.log('Cron job running...');
    return NextResponse.json({ message: 'Newsletter sent successfully' });
  } catch (error) {
    console.error('Error running cron:', error);
    return NextResponse.json({ error: 'Failed to send newsletter' }, { status: 500 });
  }
}

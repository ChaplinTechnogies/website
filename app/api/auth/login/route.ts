import { NextRequest, NextResponse } from 'next/server';
import { loginStaff } from '@/lib/models/StaffMember';
import { loginSchema } from '@/app/schemas/user.schema';
import { serialize } from 'cookie';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = loginSchema.parse(body);

    const { accessToken, refreshToken } = await loginStaff(parsed);

    const response = NextResponse.json({ accessToken });

    response.headers.set(
      'Set-Cookie',
      serialize('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        maxAge: 7 * 24 * 60 * 60,
        sameSite: 'strict',
      })
    );

    return response;
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

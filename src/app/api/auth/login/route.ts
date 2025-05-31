
import { type NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { findUserByEmail, verifyPassword } from '@/lib/mock-db';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = loginSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ success: false, message: 'Invalid input.' }, { status: 400 });
    }

    const { email, password } = parsed.data;

    const user = findUserByEmail(email);

    if (user && verifyPassword(password, user.passwordHash)) {
      // In a real app, generate a JWT or session token here
      const mockToken = `mock-jwt-token-for-${user.email}`; // NOSONAR
      return NextResponse.json({
        success: true,
        message: 'Login successful!',
        token: mockToken,
        user: {
          email: user.email,
          fullName: user.fullName,
          role: user.role,
        },
      }, { status: 200 });
    } else {
      return NextResponse.json({ success: false, message: 'Invalid email or password.' }, { status: 401 });
    }
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ success: false, message: 'An unexpected error occurred.' }, { status: 500 });
  }
}


import { type NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { addUser, findUserByEmail } from '@/lib/mock-db';

const registerSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
  role: z.enum(['student', 'instructor']),
  // agreedToTerms is validated client-side, not strictly needed for backend mock
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = registerSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ success: false, message: 'Invalid input.', errors: parsed.error.issues }, { status: 400 });
    }

    const { fullName, email, password, role } = parsed.data;

    if (findUserByEmail(email)) {
      return NextResponse.json({ success: false, message: 'Email already in use.' }, { status: 409 });
    }

    const newUser = addUser({ fullName, email, password, role });

    if (!newUser) {
        // This case should ideally be caught by the findUserByEmail check above,
        // but it's a good practice to handle potential null returns from addUser.
        return NextResponse.json({ success: false, message: 'User registration failed. Please try again.' }, { status: 500 });
    }

    console.log('User registered and added to mock DB:', { fullName: newUser.fullName, email: newUser.email, role: newUser.role });

    return NextResponse.json({
      success: true,
      message: 'Registration successful!',
      user: {
        fullName: newUser.fullName,
        email: newUser.email,
        role: newUser.role,
      },
    }, { status: 201 }); // 201 Created for successful registration

  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ success: false, message: 'An unexpected error occurred.' }, { status: 500 });
  }
}

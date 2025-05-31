
import { type NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

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
      // Log detailed validation errors during development
      // console.error("Validation errors:", parsed.error.issues);
      return NextResponse.json({ success: false, message: 'Invalid input.', errors: parsed.error.issues }, { status: 400 });
    }

    const { fullName, email, password, role } = parsed.data;

    // In a real app, you would save the user to a database here.
    // For now, we'll just simulate success if the input is valid.
    // We can also simulate checking if a user already exists.
    // if (email === 'existinguser@example.com') {
    //   return NextResponse.json({ success: false, message: 'Email already in use.' }, { status: 409 });
    // }

    console.log('Simulating user registration:', { fullName, email, role });

    return NextResponse.json({
      success: true,
      message: 'Registration successful!',
      user: {
        fullName,
        email,
        role,
      },
    }, { status: 201 }); // 201 Created for successful registration

  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ success: false, message: 'An unexpected error occurred.' }, { status: 500 });
  }
}

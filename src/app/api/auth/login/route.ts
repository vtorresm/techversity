
import { type NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

// Mocked user data
const mockUsers = [
  { email: 'student@example.com', password: 'password123', role: 'student', fullName: 'Student User' },
  { email: 'instructor@example.com', password: 'password123', role: 'instructor', fullName: 'Instructor User' },
];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = loginSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ success: false, message: 'Invalid input.' }, { status: 400 });
    }

    const { email, password } = parsed.data;

    const user = mockUsers.find(u => u.email === email && u.password === password);

    if (user) {
      // In a real app, generate a JWT or session token here
      const mockToken = `mock-jwt-token-for-${user.email}`;
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

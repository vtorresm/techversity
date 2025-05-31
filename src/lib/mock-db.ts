// This is a mock in-memory "database" for demonstration purposes.
// Data will be lost on server restart.

interface User {
  id: string;
  fullName: string;
  email: string;
  passwordHash: string; // In a real app, this would be a securely hashed password
  role: 'student' | 'instructor';
}

// Initialize with the existing mock users to allow them to log in initially.
const users: User[] = [
  { id: 'mock-student-1', email: 'student@example.com', passwordHash: 'password123', role: 'student', fullName: 'Student User' },
  { id: 'mock-instructor-1', email: 'instructor@example.com', passwordHash: 'password123', role: 'instructor', fullName: 'Instructor User' },
];

export const addUser = (newUserRegistration: { fullName: string, email: string, password: string, role: 'student' | 'instructor' }): User | null => {
  if (users.find(u => u.email === newUserRegistration.email)) {
    return null; // User already exists
  }
  const user: User = {
    id: `user-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
    email: newUserRegistration.email,
    fullName: newUserRegistration.fullName,
    // IMPORTANT: In a real application, you MUST hash the password securely.
    // For this mock, we are storing it as plain text, which is NOT secure.
    passwordHash: newUserRegistration.password,
    role: newUserRegistration.role,
  };
  users.push(user);
  console.log('User added to mock DB:', user);
  console.log('Current mock DB users:', users.map(u => ({ email: u.email, role: u.role })));
  return user;
};

export const findUserByEmail = (email: string): User | undefined => {
  console.log('Searching for user in mock DB with email:', email);
  console.log('Current mock DB users for lookup:', users.map(u => ({ email: u.email, role: u.role })));
  return users.find(user => user.email === email);
};

// IMPORTANT: In a real application, use a secure password comparison function (e.g., bcrypt.compare).
export const verifyPassword = (passwordAttempt: string, storedPasswordHash: string): boolean => {
  // This is a plain text comparison for mock purposes ONLY. NOT SECURE.
  return passwordAttempt === storedPasswordHash;
};

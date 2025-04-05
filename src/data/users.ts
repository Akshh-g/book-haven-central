
export interface User {
  id: string;
  name: string;
  email: string;
  password: string; // In a real app, this would be hashed
  role: 'user' | 'admin';
  borrowedBooks: string[]; // Book IDs
  reservedBooks: string[]; // Book IDs
  history: {
    bookId: string;
    borrowedDate: string;
    returnedDate: string | null;
  }[];
}

// Mock users data
export const users: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    password: "password123",
    role: "user",
    borrowedBooks: ["2"],
    reservedBooks: [],
    history: [
      {
        bookId: "2",
        borrowedDate: "2023-01-15",
        returnedDate: null
      },
      {
        bookId: "5",
        borrowedDate: "2022-11-10",
        returnedDate: "2022-12-01"
      }
    ]
  },
  {
    id: "2",
    name: "Admin User",
    email: "admin@library.com",
    password: "admin123",
    role: "admin",
    borrowedBooks: [],
    reservedBooks: [],
    history: []
  }
];

// Mock authentication functions
export const authenticateUser = (email: string, password: string): User | null => {
  const user = users.find(u => u.email === email && u.password === password);
  return user || null;
};

export const getCurrentUser = (): User | null => {
  // In a real app, this would check session/local storage
  // For demo purposes, let's return the first user as logged in
  return users[0];
};

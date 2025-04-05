
import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { getCurrentUser } from "@/data/users";
import { books } from "@/data/books";
import { users } from "@/data/users";
import { toast } from "sonner";
import {
  BookOpen,
  Users,
  PlusCircle,
  Edit,
  Trash,
  Search,
  Filter,
} from "lucide-react";

const Admin = () => {
  const currentUser = getCurrentUser();
  const [searchQuery, setSearchQuery] = useState("");

  // In a real app, we would check if user is logged in and is an admin
  if (!currentUser || currentUser.role !== "admin") {
    window.location.href = "/login";
    return null;
  }

  const handleAddBook = () => {
    // In a real app, this would open a form modal
    toast.info("Add book functionality would open a form");
  };

  const handleEditBook = (id: string) => {
    // In a real app, this would open a form modal with book data
    toast.info(`Edit book ${id}`);
  };

  const handleDeleteBook = (id: string) => {
    // In a real app, this would show a confirmation dialog
    toast.info(`Delete book ${id}`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="font-serif text-3xl font-bold">Admin Dashboard</h1>
        </div>

        <Card className="mb-8">
          <CardHeader className="pb-3">
            <CardTitle>Overview</CardTitle>
            <CardDescription>
              Quick stats for your library management system.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <BookOpen className="h-10 w-10 mx-auto text-blue-600 mb-2" />
                <p className="text-3xl font-bold text-blue-800">{books.length}</p>
                <p className="text-blue-600">Total Books</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <BookOpen className="h-10 w-10 mx-auto text-green-600 mb-2" />
                <p className="text-3xl font-bold text-green-800">
                  {books.filter((b) => b.available).length}
                </p>
                <p className="text-green-600">Available Books</p>
              </div>
              <div className="bg-amber-50 p-4 rounded-lg text-center">
                <BookOpen className="h-10 w-10 mx-auto text-amber-600 mb-2" />
                <p className="text-3xl font-bold text-amber-800">
                  {books.filter((b) => !b.available).length}
                </p>
                <p className="text-amber-600">Borrowed Books</p>
              </div>
              <div className="bg-indigo-50 p-4 rounded-lg text-center">
                <Users className="h-10 w-10 mx-auto text-indigo-600 mb-2" />
                <p className="text-3xl font-bold text-indigo-800">
                  {users.length}
                </p>
                <p className="text-indigo-600">Registered Users</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="books">
          <TabsList className="mb-6">
            <TabsTrigger value="books">Manage Books</TabsTrigger>
            <TabsTrigger value="users">Manage Users</TabsTrigger>
            <TabsTrigger value="loans">Active Loans</TabsTrigger>
          </TabsList>

          <TabsContent value="books">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Book Catalog</CardTitle>
                  <Button onClick={handleAddBook}>
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add Book
                  </Button>
                </div>
                <CardDescription>
                  Manage your library's book inventory.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4 flex flex-wrap gap-2">
                  <div className="relative flex-grow">
                    <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search books..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-8"
                    />
                  </div>
                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                </div>

                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Author</TableHead>
                        <TableHead>Genre</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {books.map((book) => (
                        <TableRow key={book.id}>
                          <TableCell className="font-medium">
                            {book.title}
                          </TableCell>
                          <TableCell>{book.author}</TableCell>
                          <TableCell>{book.genre[0]}</TableCell>
                          <TableCell>
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                book.available
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {book.available ? "Available" : "Borrowed"}
                            </span>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleEditBook(book.id)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDeleteBook(book.id)}
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>
                  Manage registered users and their permissions.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Books Borrowed</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">
                            {user.name}
                          </TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                user.role === "admin"
                                  ? "bg-purple-100 text-purple-800"
                                  : "bg-blue-100 text-blue-800"
                              }`}
                            >
                              {user.role === "admin" ? "Admin" : "User"}
                            </span>
                          </TableCell>
                          <TableCell>{user.borrowedBooks.length}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="loans">
            <Card>
              <CardHeader>
                <CardTitle>Active Loans</CardTitle>
                <CardDescription>
                  Track and manage all currently borrowed books.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <p className="text-gray-500">
                    Loan management functionality will be implemented here.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
};

export default Admin;

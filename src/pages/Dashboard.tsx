
import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import { getBookById } from "@/data/books";
import { Calendar, Clock, Book, User, ArrowRight } from "lucide-react";
import { toast } from "sonner";

const Dashboard = () => {
  const currentUser = getCurrentUser();
  
  // In a real app, we would check if user is logged in
  if (!currentUser) {
    window.location.href = "/login";
    return null;
  }

  const borrowedBooks = currentUser.borrowedBooks.map(id => getBookById(id)).filter(Boolean);
  const historyItems = currentUser.history.map(item => ({
    ...item,
    book: getBookById(item.bookId)
  })).filter(item => item.book);

  const handleReturn = (bookId: string) => {
    toast.success("Book returned successfully");
    // In a real app, this would update the database
  };

  const handleRenew = (bookId: string) => {
    toast.success("Book renewed for 2 more weeks");
    // In a real app, this would update the database
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="font-serif text-3xl font-bold mb-8">My Dashboard</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Account
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Name</h3>
                    <p>{currentUser.name}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Email</h3>
                    <p>{currentUser.email}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Member Since</h3>
                    <p>January 1, 2023</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full">
                  Edit Profile
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg text-center">
                    <p className="text-sm text-gray-500">Borrowed</p>
                    <p className="text-2xl font-bold text-library-navy">{borrowedBooks.length}</p>
                  </div>
                  <div className="bg-amber-50 p-4 rounded-lg text-center">
                    <p className="text-sm text-gray-500">Reserved</p>
                    <p className="text-2xl font-bold text-amber-600">{currentUser.reservedBooks.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="borrowed">
              <TabsList className="mb-6">
                <TabsTrigger value="borrowed">Currently Borrowed</TabsTrigger>
                <TabsTrigger value="history">Borrowing History</TabsTrigger>
                <TabsTrigger value="reserved">Reserved Books</TabsTrigger>
              </TabsList>
              
              <TabsContent value="borrowed" className="space-y-4">
                {borrowedBooks.length > 0 ? (
                  borrowedBooks.map(book => (
                    <Card key={book!.id}>
                      <div className="flex flex-col sm:flex-row">
                        <div className="w-full sm:w-1/5 p-4">
                          <img 
                            src={book!.coverImage} 
                            alt={book!.title} 
                            className="w-full h-40 object-cover rounded-md"
                          />
                        </div>
                        <div className="w-full sm:w-3/5 p-4">
                          <h3 className="font-serif font-bold text-xl">{book!.title}</h3>
                          <p className="text-gray-600">{book!.author}</p>
                          
                          <div className="mt-4 flex items-center">
                            <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                            <span className="text-sm">Due: June 15, 2023</span>
                          </div>
                          
                          <div className="mt-2 flex items-center">
                            <Clock className="h-5 w-5 text-gray-400 mr-2" />
                            <span className="text-sm">5 days remaining</span>
                          </div>
                        </div>
                        <div className="w-full sm:w-1/5 p-4 flex flex-col justify-end space-y-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleRenew(book!.id)}
                          >
                            Renew
                          </Button>
                          <Button 
                            size="sm"
                            onClick={() => handleReturn(book!.id)}
                          >
                            Return
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <Book className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium mb-2">No books currently borrowed</h3>
                    <p className="text-gray-600 mb-4">Browse our catalog and borrow some books!</p>
                    <Button asChild>
                      <a href="/catalog">Browse Catalog</a>
                    </Button>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="history">
                <div className="space-y-4">
                  {historyItems.length > 0 ? (
                    historyItems.map(item => (
                      <Card key={item.bookId}>
                        <div className="flex flex-col sm:flex-row">
                          <div className="w-full sm:w-1/6 p-4">
                            <img 
                              src={item.book!.coverImage} 
                              alt={item.book!.title} 
                              className="w-full h-32 object-cover rounded-md"
                            />
                          </div>
                          <div className="w-full sm:w-5/6 p-4">
                            <h3 className="font-medium text-lg">{item.book!.title}</h3>
                            <p className="text-gray-600 text-sm">{item.book!.author}</p>
                            
                            <div className="mt-3 grid grid-cols-2 gap-2">
                              <div>
                                <p className="text-xs text-gray-500">Borrowed</p>
                                <p className="text-sm">{item.borrowedDate}</p>
                              </div>
                              <div>
                                <p className="text-xs text-gray-500">Returned</p>
                                <p className="text-sm">{item.returnedDate || "Not yet returned"}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))
                  ) : (
                    <div className="text-center py-12">
                      <h3 className="text-lg font-medium mb-2">No borrowing history</h3>
                      <p className="text-gray-600">Your borrowing history will appear here</p>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="reserved">
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium mb-2">No reserved books</h3>
                  <p className="text-gray-600 mb-4">
                    When books are unavailable, you can reserve them to be notified when they're back.
                  </p>
                  <Button asChild>
                    <a href="/catalog">Browse Catalog</a>
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Dashboard;


import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getBookById } from "@/data/books";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Heart, ArrowLeft } from "lucide-react";
import { getCurrentUser } from "@/data/users";
import { toast } from "sonner";

const BookDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState(getBookById(id || ""));
  const currentUser = getCurrentUser();
  
  if (!book) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-12 flex flex-col items-center">
          <h1 className="font-serif text-3xl font-bold mb-6">Book Not Found</h1>
          <p className="text-gray-600 mb-8">Sorry, we couldn't find the book you're looking for.</p>
          <Button asChild>
            <Link to="/catalog">Return to Catalog</Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const handleBorrow = () => {
    if (!currentUser) {
      toast.error("Please login to borrow books");
      return;
    }
    
    if (!book.available) {
      toast.error("This book is currently unavailable");
      return;
    }
    
    // In a real app, this would make an API call
    toast.success(`Successfully borrowed "${book.title}"`);
  };

  const handleReserve = () => {
    if (!currentUser) {
      toast.error("Please login to reserve books");
      return;
    }
    
    if (book.available) {
      toast.info("This book is available for immediate borrowing");
      return;
    }
    
    // In a real app, this would make an API call
    toast.success(`Successfully reserved "${book.title}"`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link to="/catalog" className="text-sm flex items-center hover:text-library-gold">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Catalog
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Book Cover */}
          <div className="md:col-span-1">
            <div className="book-card">
              <div className="book-spine"></div>
              <div className="book-cover">
                <img
                  src={book.coverImage}
                  alt={`Cover of ${book.title}`}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            <div className="mt-6 space-y-4">
              {book.available ? (
                <Button onClick={handleBorrow} className="w-full">Borrow Book</Button>
              ) : (
                <Button onClick={handleReserve} variant="outline" className="w-full">Reserve Book</Button>
              )}
              
              <Button variant="ghost" className="w-full flex items-center gap-2">
                <Heart className="h-4 w-4" />
                Add to Wishlist
              </Button>
            </div>
          </div>
          
          {/* Book Details */}
          <div className="md:col-span-2">
            <h1 className="font-serif text-3xl font-bold mb-2">{book.title}</h1>
            <p className="text-xl text-gray-600 mb-4">by {book.author}</p>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {book.genre.map((genre) => (
                <Badge key={genre} variant="secondary">
                  {genre}
                </Badge>
              ))}
            </div>
            
            <div className="bg-library-beige p-4 rounded-lg mb-6">
              <div className="flex flex-wrap gap-y-3">
                <div className="w-1/2 flex items-center">
                  <Calendar className="h-5 w-5 text-library-navy mr-2" />
                  <span className="text-sm">Published: {book.published}</span>
                </div>
                <div className="w-1/2 flex items-center">
                  <span className={`w-3 h-3 rounded-full mr-2 ${book.available ? "bg-green-500" : "bg-red-500"}`}></span>
                  <span className="text-sm">{book.available ? "Available" : "Currently Borrowed"}</span>
                </div>
                <div className="w-full flex items-center">
                  <Clock className="h-5 w-5 text-library-navy mr-2" />
                  <span className="text-sm">Loan Period: 3 weeks</span>
                </div>
              </div>
            </div>
            
            <div className="mb-8">
              <h2 className="font-serif text-xl font-semibold mb-3">Description</h2>
              <p className="text-gray-700 leading-relaxed">{book.description}</p>
            </div>
            
            <div className="border-t border-gray-200 pt-6">
              <h2 className="font-serif text-xl font-semibold mb-4">Book Details</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">ISBN</h3>
                  <p>{book.isbn}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Published</h3>
                  <p>{book.published}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Genre</h3>
                  <p>{book.genre.join(", ")}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Status</h3>
                  <p>{book.available ? "Available" : "Borrowed"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default BookDetail;

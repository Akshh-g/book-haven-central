
import { useState } from "react";
import { Link } from "react-router-dom";
import { BookCard } from "@/components/BookCard";
import { Button } from "@/components/ui/button";
import { books, getFeaturedBooks } from "@/data/books";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Book, BookOpen, Search, User } from "lucide-react";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const featuredBooks = getFeaturedBooks();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-library-navy to-blue-900 text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-serif font-bold text-4xl md:text-5xl lg:text-6xl mb-6">
              Discover Your Next <span className="text-library-gold">Favorite Book</span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-8">
              Browse our extensive collection of books across all genres. From classics to contemporary, we have something for everyone.
            </p>
            <form onSubmit={handleSearchSubmit} className="max-w-md mx-auto relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by title, author, or genre..."
                className="w-full px-4 py-3 pr-12 rounded-lg border-2 border-white/30 bg-white/10 backdrop-blur-sm placeholder:text-white/50 text-white"
              />
              <button
                type="submit"
                className="absolute right-1 top-1 p-2 text-white/70 hover:text-white bg-white/20 rounded-md"
              >
                <Search className="h-5 w-5" />
              </button>
            </form>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button asChild size="lg">
                <Link to="/catalog">Browse Catalog</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="bg-transparent text-white border-white hover:bg-white/10">
                <Link to="/login">Member Login</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Books */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="font-serif font-bold text-3xl text-library-navy">Featured Books</h2>
            <Link to="/catalog" className="text-library-navy hover:text-library-gold font-medium text-sm">
              View all books →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </div>
      </section>

      {/* Popular Genres */}
      <section className="py-16 bg-library-paper">
        <div className="container mx-auto px-4">
          <h2 className="font-serif font-bold text-3xl text-library-navy text-center mb-12">
            Explore By Genre
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {["Fiction", "Non-Fiction", "Mystery", "Science Fiction", "Fantasy", "Romance", "Biography", "History", "Self-Help", "Children", "Young Adult", "Poetry"].map((genre) => (
              <Link 
                key={genre} 
                to={`/catalog?genre=${genre}`}
                className="bg-white p-6 rounded-lg shadow-sm flex flex-col items-center justify-center hover:bg-library-navy hover:text-white transition-colors group"
              >
                <span className="text-center font-medium">{genre}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="font-serif font-bold text-3xl text-library-navy text-center mb-12">
            Our Services
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-library-beige p-6 rounded-lg text-center">
              <div className="w-16 h-16 bg-library-navy rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-serif font-bold text-xl mb-3">Vast Collection</h3>
              <p className="text-gray-600">Access thousands of books across every genre and interest, from classics to the latest releases.</p>
            </div>
            <div className="bg-library-beige p-6 rounded-lg text-center">
              <div className="w-16 h-16 bg-library-navy rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-serif font-bold text-xl mb-3">Membership Benefits</h3>
              <p className="text-gray-600">Enjoy extended borrowing periods, book reservations, and personalized recommendations.</p>
            </div>
            <div className="bg-library-beige p-6 rounded-lg text-center">
              <div className="w-16 h-16 bg-library-navy rounded-full flex items-center justify-center mx-auto mb-4">
                <Book className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-serif font-bold text-xl mb-3">Online Catalog</h3>
              <p className="text-gray-600">Search and browse our entire collection online, check availability, and reserve books from anywhere.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;

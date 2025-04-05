
import { useState, useEffect } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { BookCard } from "@/components/BookCard";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { books, searchBooks } from "@/data/books";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Catalog = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const initialGenre = searchParams.get("genre") || "";
  
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedGenre, setSelectedGenre] = useState(initialGenre);
  const [filteredBooks, setFilteredBooks] = useState(books);
  const [sortBy, setSortBy] = useState("title");
  
  // Get all unique genres
  const allGenres = Array.from(
    new Set(books.flatMap((book) => book.genre))
  ).sort();

  // Filter and sort books
  useEffect(() => {
    let result = [...books];
    
    // Apply search query
    if (searchQuery) {
      result = searchBooks(searchQuery);
    }
    
    // Apply genre filter
    if (selectedGenre) {
      result = result.filter((book) =>
        book.genre.includes(selectedGenre)
      );
    }
    
    // Apply sorting
    result.sort((a, b) => {
      switch (sortBy) {
        case "title":
          return a.title.localeCompare(b.title);
        case "author":
          return a.author.localeCompare(b.author);
        case "newest":
          return parseInt(b.published) - parseInt(a.published);
        case "oldest":
          return parseInt(a.published) - parseInt(b.published);
        default:
          return 0;
      }
    });
    
    setFilteredBooks(result);
    
    // Update URL params
    const params = new URLSearchParams();
    if (searchQuery) params.set("q", searchQuery);
    if (selectedGenre) params.set("genre", selectedGenre);
    setSearchParams(params, { replace: true });
  }, [searchQuery, selectedGenre, sortBy]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is handled by the useEffect
  };
  
  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedGenre("");
    setSortBy("title");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="font-serif text-3xl font-bold mb-6">Book Catalog</h1>
        
        {/* Filters */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 mb-8">
          <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <Input
                type="search"
                placeholder="Search by title, author, or genre..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
            
            <Select value={selectedGenre} onValueChange={setSelectedGenre}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by genre" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Genres</SelectItem>
                {allGenres.map((genre) => (
                  <SelectItem key={genre} value={genre}>
                    {genre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="title">Title (A-Z)</SelectItem>
                <SelectItem value="author">Author (A-Z)</SelectItem>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
              </SelectContent>
            </Select>
            
            <div className="md:col-span-4 flex justify-between items-center">
              <div className="flex flex-wrap gap-2">
                {searchQuery && (
                  <Badge variant="outline" className="flex items-center gap-1">
                    Search: {searchQuery}
                    <button
                      onClick={() => setSearchQuery("")}
                      className="ml-1 hover:text-rose-500"
                    >
                      ✕
                    </button>
                  </Badge>
                )}
                {selectedGenre && (
                  <Badge variant="outline" className="flex items-center gap-1">
                    Genre: {selectedGenre}
                    <button
                      onClick={() => setSelectedGenre("")}
                      className="ml-1 hover:text-rose-500"
                    >
                      ✕
                    </button>
                  </Badge>
                )}
              </div>
              
              {(searchQuery || selectedGenre || sortBy !== "title") && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleClearFilters}
                >
                  Clear Filters
                </Button>
              )}
            </div>
          </form>
        </div>
        
        {/* Results */}
        <div>
          <div className="mb-4 text-gray-600">
            Found {filteredBooks.length} {filteredBooks.length === 1 ? "book" : "books"}
          </div>
          
          {filteredBooks.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {filteredBooks.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-2">No books found</h3>
              <p className="text-gray-600">
                Try adjusting your search or filter to find what you're looking for.
              </p>
              <Button
                variant="outline"
                onClick={handleClearFilters}
                className="mt-4"
              >
                Clear all filters
              </Button>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Catalog;

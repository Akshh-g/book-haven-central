
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BookCard } from "@/components/BookCard";
import { searchBooks } from "@/data/books";
import { Search as SearchIcon } from "lucide-react";

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [results, setResults] = useState(query ? searchBooks(query) : []);

  useEffect(() => {
    if (query) {
      setResults(searchBooks(query));
    } else {
      setResults([]);
    }
  }, [query]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="font-serif text-3xl font-bold mb-2">
            Search Results: "{query}"
          </h1>
          <p className="text-gray-600">
            Found {results.length} {results.length === 1 ? "result" : "results"}
          </p>
        </div>
        
        {results.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {results.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <SearchIcon className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <h2 className="text-2xl font-serif font-bold mb-2">No books found</h2>
            <p className="text-gray-600 mb-8">
              We couldn't find any books matching your search.
              <br />
              Try different keywords or browse our catalog.
            </p>
            <a 
              href="/catalog" 
              className="inline-block bg-library-navy hover:bg-blue-900 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Browse All Books
            </a>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default Search;

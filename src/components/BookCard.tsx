
import { Book } from "@/data/books";
import { cn } from "@/lib/utils";
import { Badge } from "./ui/badge";
import { Link } from "react-router-dom";

interface BookCardProps {
  book: Book;
  className?: string;
}

export function BookCard({ book, className }: BookCardProps) {
  return (
    <Link to={`/books/${book.id}`}>
      <div className={cn("book-card group", className)}>
        <div className="book-spine" />
        <div className="book-cover">
          <img 
            src={book.coverImage} 
            alt={`Cover of ${book.title}`} 
            className="w-full h-full object-cover transition-transform group-hover:scale-105"
          />
        </div>
        <div className="p-4">
          <h3 className="font-serif font-bold text-lg line-clamp-1">{book.title}</h3>
          <p className="text-sm text-gray-600">{book.author}</p>
          <div className="mt-2 flex flex-wrap gap-1">
            {book.genre.slice(0, 2).map((g) => (
              <Badge key={g} variant="outline" className="text-xs">
                {g}
              </Badge>
            ))}
          </div>
          <div className="mt-3 flex justify-between items-center">
            <span className={cn(
              "text-xs font-medium px-2 py-1 rounded-full",
              book.available 
                ? "bg-green-100 text-green-800" 
                : "bg-red-100 text-red-800"
            )}>
              {book.available ? "Available" : "Borrowed"}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

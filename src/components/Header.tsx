
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { 
  BookOpen, 
  Search, 
  Menu, 
  X, 
  User,
  LogIn
} from "lucide-react";
import { getCurrentUser } from "@/data/users";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

export function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const currentUser = getCurrentUser();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Catalog", href: "/catalog" },
    { label: "Genres", href: "/genres" },
    { label: "About", href: "/about" },
  ];

  return (
    <header className="bg-library-navy text-white sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-library-gold" />
            <span className="font-serif text-xl font-bold">BookHaven</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="text-sm font-medium hover:text-library-gold transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="hidden md:flex relative w-64">
            <Input
              type="search"
              placeholder="Search books..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/10 border-white/20 placeholder:text-white/50 focus:bg-white/20 transition-colors"
            />
            <Button
              type="submit"
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-full"
            >
              <Search className="h-4 w-4" />
            </Button>
          </form>

          {/* User menu & Mobile navigation trigger */}
          <div className="flex items-center gap-2">
            {currentUser ? (
              <Button asChild variant="ghost" size="sm" className="hidden md:flex">
                <Link to="/dashboard">
                  <User className="h-4 w-4 mr-2" />
                  My Account
                </Link>
              </Button>
            ) : (
              <Button asChild variant="secondary" size="sm" className="hidden md:flex">
                <Link to="/login">
                  <LogIn className="h-4 w-4 mr-2" />
                  Login
                </Link>
              </Button>
            )}

            {/* Mobile menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-library-navy text-white">
                <div className="flex flex-col h-full">
                  <div className="space-y-4 py-4">
                    <form onSubmit={handleSearch} className="relative">
                      <Input
                        type="search"
                        placeholder="Search books..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-white/10 border-white/20 placeholder:text-white/50"
                      />
                      <Button
                        type="submit"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full"
                      >
                        <Search className="h-4 w-4" />
                      </Button>
                    </form>
                    <nav className="flex flex-col space-y-4">
                      {navItems.map((item) => (
                        <Link
                          key={item.label}
                          to={item.href}
                          className="text-sm font-medium hover:text-library-gold transition-colors py-2"
                        >
                          {item.label}
                        </Link>
                      ))}
                      <hr className="border-white/20" />
                      {currentUser ? (
                        <Link
                          to="/dashboard"
                          className="flex items-center text-sm font-medium hover:text-library-gold transition-colors py-2"
                        >
                          <User className="h-4 w-4 mr-2" />
                          My Account
                        </Link>
                      ) : (
                        <Link
                          to="/login"
                          className="flex items-center text-sm font-medium hover:text-library-gold transition-colors py-2"
                        >
                          <LogIn className="h-4 w-4 mr-2" />
                          Login
                        </Link>
                      )}
                    </nav>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}

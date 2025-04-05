
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BookOpen, Search } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-library-beige px-4">
      <BookOpen className="h-16 w-16 text-library-navy mb-6" />
      <h1 className="font-serif text-4xl md:text-5xl font-bold text-library-navy mb-2 text-center">
        Page Not Found
      </h1>
      <p className="text-xl text-gray-600 mb-8 text-center max-w-md">
        Sorry, we couldn't locate the page you're looking for in our library.
      </p>
      <div className="flex flex-wrap gap-4 justify-center">
        <Button asChild>
          <Link to="/">
            Return Home
          </Link>
        </Button>
        <Button asChild variant="outline" className="flex items-center gap-2">
          <Link to="/catalog">
            <Search className="h-4 w-4" />
            Browse Catalog
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;

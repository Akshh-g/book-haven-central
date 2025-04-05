
import { BookOpen, Mail, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-library-navy text-white mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <BookOpen className="h-6 w-6 text-library-gold" />
              <span className="font-serif text-xl font-bold">BookHaven</span>
            </Link>
            <p className="text-white/70 text-sm">
              Your gateway to knowledge and imagination. BookHaven offers a vast collection of books across all genres, catering to readers of all ages and interests.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="font-serif text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/catalog" className="text-white/70 hover:text-library-gold text-sm transition-colors">
                  Browse Catalog
                </Link>
              </li>
              <li>
                <Link to="/genres" className="text-white/70 hover:text-library-gold text-sm transition-colors">
                  Genres
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-white/70 hover:text-library-gold text-sm transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-white/70 hover:text-library-gold text-sm transition-colors">
                  Member Login
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="font-serif text-lg font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin className="h-5 w-5 text-library-gold shrink-0 mt-0.5" />
                <span className="text-white/70 text-sm">
                  123 Library Street, Bookville, BK 12345
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-library-gold shrink-0" />
                <span className="text-white/70 text-sm">(555) 123-4567</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-library-gold shrink-0" />
                <span className="text-white/70 text-sm">info@bookhaven.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-8 pt-8 text-center text-sm text-white/50">
          <p>© {currentYear} BookHaven Library. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

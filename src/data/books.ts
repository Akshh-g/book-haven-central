
export interface Book {
  id: string;
  title: string;
  author: string;
  coverImage: string;
  published: string;
  genre: string[];
  description: string;
  isbn: string;
  available: boolean;
  featured?: boolean;
}

export const books: Book[] = [
  {
    id: "1",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    coverImage: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=1374&auto=format&fit=crop",
    published: "1960",
    genre: ["Fiction", "Classic", "Coming-of-age"],
    description: "A gripping, heart-wrenching, and wholly remarkable tale of coming-of-age in a South poisoned by virulent prejudice, it views a world of great beauty and savage inequities through the eyes of a young girl.",
    isbn: "978-0446310789",
    available: true,
    featured: true
  },
  {
    id: "2",
    title: "1984",
    author: "George Orwell",
    coverImage: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=1374&auto=format&fit=crop",
    published: "1949",
    genre: ["Dystopian", "Science Fiction", "Political"],
    description: "Winston Smith toes the Party line, rewriting history to satisfy the demands of the Ministry of Truth. With each lie he writes, Winston grows to hate the Party that seeks power for its own sake and persecutes those who dare to commit thoughtcrimes.",
    isbn: "978-0451524935",
    available: false
  },
  {
    id: "3",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    coverImage: "https://images.unsplash.com/photo-1610882648335-eda2e9a5f60f?q=80&w=1528&auto=format&fit=crop",
    published: "1813",
    genre: ["Romance", "Classic"],
    description: "Pride and Prejudice follows the turbulent relationship between Elizabeth Bennet, the daughter of a country gentleman, and Fitzwilliam Darcy, a rich aristocratic landowner. They must overcome the titular sins of pride and prejudice.",
    isbn: "978-0141439518",
    available: true,
    featured: true
  },
  {
    id: "4",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    coverImage: "https://images.unsplash.com/photo-1518744386442-2d48ac47a7eb?q=80&w=1470&auto=format&fit=crop",
    published: "1925",
    genre: ["Fiction", "Classic"],
    description: "The story of the fabulously wealthy Jay Gatsby and his love for the beautiful Daisy Buchanan, of lavish parties on Long Island at a time when The New York Times noted 'gin was the national drink and sex the national obsession.'",
    isbn: "978-0743273565",
    available: true
  },
  {
    id: "5",
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    coverImage: "https://images.unsplash.com/photo-1528134572746-062ddb9654d4?q=80&w=1376&auto=format&fit=crop",
    published: "1937",
    genre: ["Fantasy", "Adventure"],
    description: "Bilbo Baggins is a hobbit who enjoys a comfortable, unambitious life, rarely traveling any farther than his pantry or cellar. But his contentment is disturbed when the wizard Gandalf and a company of dwarves arrive on his doorstep.",
    isbn: "978-0547928227",
    available: true,
    featured: true
  },
  {
    id: "6",
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    coverImage: "https://images.unsplash.com/photo-1515098506762-79e1384e9d8e?q=80&w=1471&auto=format&fit=crop",
    published: "1951",
    genre: ["Fiction", "Coming-of-age"],
    description: "The hero-narrator of The Catcher in the Rye is an ancient child of sixteen, a native New Yorker named Holden Caulfield. Through circumstances that tend to preclude adult, secondhand description, he leaves his prep school and goes underground in New York City for three days.",
    isbn: "978-0316769488",
    available: true
  },
  {
    id: "7",
    title: "War and Peace",
    author: "Leo Tolstoy",
    coverImage: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=1374&auto=format&fit=crop",
    published: "1869",
    genre: ["Historical Fiction", "Epic"],
    description: "Epic in scale, War and Peace delineates in graphic detail events leading up to Napoleon's invasion of Russia, and the impact of the Napoleonic era on Tsarist society, as seen through the eyes of five Russian aristocratic families.",
    isbn: "978-1400079988",
    available: true
  },
  {
    id: "8",
    title: "Moby Dick",
    author: "Herman Melville",
    coverImage: "https://images.unsplash.com/photo-1533327269255-92e89df2f006?q=80&w=1528&auto=format&fit=crop",
    published: "1851",
    genre: ["Adventure", "Epic"],
    description: "Moby-Dick; or, The Whale is a novel by Herman Melville, in which Ishmael narrates the monomaniacal quest of Ahab, captain of the whaler Pequod, for revenge on the albino sperm whale Moby Dick, which on a previous voyage destroyed Ahab's ship and severed his leg at the knee.",
    isbn: "978-1503280786",
    available: false
  }
];

export const getBookById = (id: string): Book | undefined => {
  return books.find(book => book.id === id);
};

export const getFeaturedBooks = (): Book[] => {
  return books.filter(book => book.featured);
};

export const searchBooks = (query: string): Book[] => {
  const lowercaseQuery = query.toLowerCase();
  return books.filter(book => 
    book.title.toLowerCase().includes(lowercaseQuery) || 
    book.author.toLowerCase().includes(lowercaseQuery) ||
    book.genre.some(g => g.toLowerCase().includes(lowercaseQuery))
  );
};

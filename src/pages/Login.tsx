
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BookOpen, ArrowRight } from "lucide-react";
import { authenticateUser } from "@/data/users";
import { toast } from "sonner";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const user = authenticateUser(email, password);
      
      if (user) {
        toast.success("Login successful");
        navigate(user.role === "admin" ? "/admin" : "/dashboard");
      } else {
        toast.error("Invalid email or password");
        setIsLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <div className="flex-1 flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <BookOpen className="mx-auto h-12 w-12 text-library-navy" />
            <h2 className="mt-6 text-3xl font-serif font-bold text-gray-900">
              Sign in to your account
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Access your library dashboard to manage your books and account.
            </p>
          </div>
          
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px space-y-4">
              <div>
                <Label htmlFor="email-address" className="sr-only">
                  Email address
                </Label>
                <Input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full"
                />
              </div>
              <div>
                <Label htmlFor="password" className="sr-only">
                  Password
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-library-navy focus:ring-library-navy border-gray-300 rounded"
                />
                <Label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </Label>
              </div>

              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-library-navy hover:text-library-gold"
                >
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign in"}
              </Button>
            </div>
            
            <div className="text-center text-sm">
              <p>
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="font-medium text-library-navy hover:text-library-gold"
                >
                  Sign up for free
                </Link>
              </p>
            </div>
            
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-gray-50 text-gray-500">Demo accounts</span>
                </div>
              </div>
              
              <div className="mt-6 grid grid-cols-2 gap-3">
                <div>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      setEmail("john@example.com");
                      setPassword("password123");
                    }}
                  >
                    User Demo
                  </Button>
                </div>
                <div>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      setEmail("admin@library.com");
                      setPassword("admin123");
                    }}
                  >
                    Admin Demo
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Login;

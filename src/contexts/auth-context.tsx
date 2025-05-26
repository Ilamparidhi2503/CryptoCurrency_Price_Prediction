import React from "react";
import { useHistory } from "react-router-dom";
import { addToast } from "@heroui/react";

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<User | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const history = useHistory();

  // Check if user is already logged in
  React.useEffect(() => {
    const checkAuth = async () => {
      try {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Authentication error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // This would be an API call in a real application
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Mock successful login
      const mockUser = {
        id: "user-1",
        name: email.split("@")[0],
        email,
        avatar: `https://img.heroui.chat/image/avatar?w=200&h=200&u=${Math.floor(Math.random() * 20)}`,
      };
      
      setUser(mockUser);
      localStorage.setItem("user", JSON.stringify(mockUser));
      
      addToast({
        title: "Login successful",
        description: "Welcome back to CryptoPredict AI!",
        color: "success",
      });
      
      history.push("/app/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      addToast({
        title: "Login failed",
        description: "Invalid email or password",
        color: "danger",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      // This would be an API call in a real application
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Mock successful registration
      const mockUser = {
        id: "user-" + Date.now(),
        name,
        email,
        avatar: `https://img.heroui.chat/image/avatar?w=200&h=200&u=${Math.floor(Math.random() * 20)}`,
      };
      
      setUser(mockUser);
      localStorage.setItem("user", JSON.stringify(mockUser));
      
      addToast({
        title: "Registration successful",
        description: "Welcome to CryptoPredict AI!",
        color: "success",
      });
      
      history.push("/app/dashboard");
    } catch (error) {
      console.error("Registration error:", error);
      addToast({
        title: "Registration failed",
        description: "An error occurred during registration",
        color: "danger",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    history.push("/");
    addToast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
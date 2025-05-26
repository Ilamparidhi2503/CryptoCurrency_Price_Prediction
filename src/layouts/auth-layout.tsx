import React from "react";
import { Redirect } from "react-router-dom";
import { useAuth } from "../contexts/auth-context";
import { Spinner } from "@heroui/react";
import { Icon } from "@iconify/react";
import { ThemeToggle } from "../components/theme-toggle";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Spinner size="lg" color="primary" label="Loading..." />
      </div>
    );
  }

  if (isAuthenticated) {
    return <Redirect to="/app/dashboard" />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="container mx-auto px-4 py-4 flex justify-between items-center">
        <a href="/" className="flex items-center gap-2">
          <Icon icon="lucide:brain-circuit" className="text-primary text-2xl" />
          <span className="font-bold text-lg">CryptoPredict AI</span>
        </a>
        <ThemeToggle />
      </header>
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {children}
        </div>
      </main>
      <footer className="py-6 text-center text-small text-default-500">
        &copy; {new Date().getFullYear()} CryptoPredict AI. All rights reserved.
      </footer>
    </div>
  );
}
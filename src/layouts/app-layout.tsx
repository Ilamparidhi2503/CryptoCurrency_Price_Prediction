import React from "react";
import { Redirect } from "react-router-dom";
import { AppNavbar } from "../components/navbar";
import { useAuth } from "../contexts/auth-context";
import { Button, Spinner } from "@heroui/react";
import { Icon } from "@iconify/react/dist/iconify.js";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Spinner size="lg" color="primary" label="Loading..." />
      </div>
    );
  }

  <Button aria-label="Close dialog">
  <Icon icon="lucide:x" />
</Button>


  if (!isAuthenticated) {
    return <Redirect to="/auth/login" />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <AppNavbar />
      <main className="flex-1 container mx-auto px-4 py-6 max-w-7xl">
        {children}
      </main>
    </div>
  );
}
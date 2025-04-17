
import React from "react";
import Navbar from "./Navbar";
import { Toaster } from "@/components/ui/sonner";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto py-6 px-4 md:px-6">
        {children}
      </main>
      <Toaster position="top-right" />
    </div>
  );
};

export default Layout;

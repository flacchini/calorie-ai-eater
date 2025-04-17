
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Menu, 
  Apple, 
  Camera, 
  Weight, 
  LineChart, 
  FileSpreadsheet,
  Home
} from "lucide-react";
import { useLocation, Link } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<string>(location.pathname || "/");

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Apple className="h-6 w-6 text-primary" />
          <span className="font-semibold text-lg">KalorienTracker</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6">
          <Tabs value={activeTab} className="w-full" onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-5 w-full max-w-xl">
              <TabsTrigger value="/" asChild>
                <Link to="/" className="flex items-center gap-2">
                  <Home className="h-4 w-4" />
                  <span>Dashboard</span>
                </Link>
              </TabsTrigger>
              <TabsTrigger value="/food-log" asChild>
                <Link to="/food-log" className="flex items-center gap-2">
                  <Apple className="h-4 w-4" />
                  <span>Essen</span>
                </Link>
              </TabsTrigger>
              <TabsTrigger value="/photo-analysis" asChild>
                <Link to="/photo-analysis" className="flex items-center gap-2">
                  <Camera className="h-4 w-4" />
                  <span>Foto</span>
                </Link>
              </TabsTrigger>
              <TabsTrigger value="/weight-log" asChild>
                <Link to="/weight-log" className="flex items-center gap-2">
                  <Weight className="h-4 w-4" />
                  <span>Gewicht</span>
                </Link>
              </TabsTrigger>
              <TabsTrigger value="/export" asChild>
                <Link to="/export" className="flex items-center gap-2">
                  <FileSpreadsheet className="h-4 w-4" />
                  <span>Export</span>
                </Link>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </nav>

        {/* Mobile Navigation */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <nav className="flex flex-col gap-4 mt-8">
              <Link to="/" className="flex items-center gap-2 p-2 rounded-md hover:bg-accent">
                <Home className="h-5 w-5" />
                <span>Dashboard</span>
              </Link>
              <Link to="/food-log" className="flex items-center gap-2 p-2 rounded-md hover:bg-accent">
                <Apple className="h-5 w-5" />
                <span>Essen eintragen</span>
              </Link>
              <Link to="/photo-analysis" className="flex items-center gap-2 p-2 rounded-md hover:bg-accent">
                <Camera className="h-5 w-5" />
                <span>Foto analysieren</span>
              </Link>
              <Link to="/weight-log" className="flex items-center gap-2 p-2 rounded-md hover:bg-accent">
                <Weight className="h-5 w-5" />
                <span>Gewicht eintragen</span>
              </Link>
              <Link to="/export" className="flex items-center gap-2 p-2 rounded-md hover:bg-accent">
                <FileSpreadsheet className="h-5 w-5" />
                <span>Excel Export</span>
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Navbar;

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import GlobalChatbot from "@/components/GlobalChatbot";
import Index from "./pages/Index";
import FarmOrder from "./pages/FarmOrder";
import NotFound from "./pages/NotFound";
import { useState } from "react";
import { Farm } from "@/components/InteractiveMap";

const queryClient = new QueryClient();

const AppContent = () => {
  const location = useLocation();
  const [highlightedFarms, setHighlightedFarms] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedFarm, setSelectedFarm] = useState<Farm | null>(null);

  // Only pass farm highlighting props when on the Index page (where the map exists)
  const isIndexPage = location.pathname === '/';
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/farms" element={<div className="p-8 text-center">Farms page coming soon</div>} />
        <Route path="/cart" element={<div className="p-8 text-center">Cart page coming soon</div>} />
        <Route path="/profile" element={<div className="p-8 text-center">Profile page coming soon</div>} />
        <Route path="/order/:farmName" element={<FarmOrder />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      
      {/* Global Chatbot */}
      <GlobalChatbot
        onFarmsHighlight={isIndexPage ? setHighlightedFarms : undefined}
        onSearchQuery={isIndexPage ? setSearchQuery : undefined}
        selectedFarm={isIndexPage ? selectedFarm : undefined}
      />
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

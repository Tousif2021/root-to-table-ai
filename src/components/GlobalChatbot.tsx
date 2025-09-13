import React, { useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import ChatInterface from './ChatInterface';
import { Farm } from '@/types/farm';
import { cn } from '@/lib/utils';

interface GlobalChatbotProps {
  onFarmsHighlight?: (farms: Farm[]) => void;
  onSearchQuery?: (query: string) => void;
  selectedFarm?: Farm | null;
}

const GlobalChatbot: React.FC<GlobalChatbotProps> = ({ 
  onFarmsHighlight, 
  onSearchQuery, 
  selectedFarm 
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  // Default handlers for when the chatbot is used on non-map pages
  const handleFarmsHighlight = (farms: Farm[]) => {
    if (onFarmsHighlight) {
      onFarmsHighlight(farms);
    }
  };

  const handleSearchQuery = (query: string) => {
    if (onSearchQuery) {
      onSearchQuery(query);
    }
  };

  const handleClose = () => {
    setIsDrawerOpen(false);
    setIsPopoverOpen(false);
  };

  // Floating Button Component
  const FloatingChatButton = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>((props, ref) => (
    <Button
      ref={ref}
      {...props}
      className={cn(
        "fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full shadow-glow transition-smooth",
        "bg-gradient-primary text-primary-foreground",
        "hover:scale-110 hover:shadow-glow animate-pulse",
        "border-2 border-white/20"
      )}
    >
      <MessageCircle className="w-6 h-6" />
    </Button>
  ));
  
  FloatingChatButton.displayName = "FloatingChatButton";

  // Chat Content Component
  const ChatContent = () => (
    <div className="h-full">
      <ChatInterface
        onFarmsHighlight={handleFarmsHighlight}
        onSearchQuery={handleSearchQuery}
        selectedFarm={selectedFarm}
      />
    </div>
  );

  return (
    <>
      {isMobile ? (
        // Mobile: Bottom Drawer
        <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
          <DrawerTrigger asChild>
            <FloatingChatButton />
          </DrawerTrigger>
          <DrawerContent className="h-[85vh] bg-background border-border">
            <DrawerHeader className="border-b border-border bg-gradient-primary text-primary-foreground">
              <DrawerTitle className="text-center">AI Farm Assistant</DrawerTitle>
            </DrawerHeader>
            <div className="flex-1 overflow-hidden">
              <ChatContent />
            </div>
          </DrawerContent>
        </Drawer>
      ) : (
        // Desktop: Popover
        <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
          <PopoverTrigger asChild>
            <FloatingChatButton />
          </PopoverTrigger>
          <PopoverContent 
            className="w-96 h-[500px] p-0 bg-background border-border shadow-glow mr-4 mb-4"
            side="top"
            align="end"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border bg-gradient-primary text-primary-foreground rounded-t-lg">
              <h2 className="font-semibold">AI Farm Assistant</h2>
              <Button
                onClick={handleClose}
                variant="ghost"
                size="sm"
                className="text-primary-foreground hover:bg-white/20 w-8 h-8 p-0"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            
            {/* Chat Content */}
            <div className="h-[calc(100%-4rem)]">
              <ChatContent />
            </div>
          </PopoverContent>
        </Popover>
      )}
    </>
  );
};

export default GlobalChatbot;
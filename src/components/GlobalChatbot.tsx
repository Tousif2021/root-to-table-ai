import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ChatInterface from './ChatInterface';
import { Farm } from './InteractiveMap';
import { cn } from '@/lib/utils';

interface GlobalChatbotProps {
  onFarmsHighlight?: (farmIds: string[]) => void;
  onSearchQuery?: (query: string) => void;
  selectedFarm?: Farm | null;
}

const GlobalChatbot: React.FC<GlobalChatbotProps> = ({ 
  onFarmsHighlight, 
  onSearchQuery, 
  selectedFarm 
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  // Default handlers for when the chatbot is used on non-map pages
  const handleFarmsHighlight = (farmIds: string[]) => {
    if (onFarmsHighlight) {
      onFarmsHighlight(farmIds);
    }
  };

  const handleSearchQuery = (query: string) => {
    if (onSearchQuery) {
      onSearchQuery(query);
    }
  };

  return (
    <>
      {/* Toggle Button */}
      <Button
        onClick={handleToggle}
        className={cn(
          "fixed left-4 top-1/2 -translate-y-1/2 z-40 w-12 h-12 rounded-full shadow-elegant transition-all duration-300",
          "bg-primary hover:bg-primary-glow text-primary-foreground",
          "hover:scale-110 hover:shadow-glow",
          isOpen && "opacity-0 pointer-events-none"
        )}
        size="sm"
      >
        <MessageCircle className="w-5 h-5" />
      </Button>

      {/* Chatbot Overlay */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-96 bg-background/95 backdrop-blur-sm border-r border-border shadow-elegant transition-all duration-300 ease-out",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Header with Close Button */}
        <div className="flex items-center justify-between p-4 border-b border-border bg-gradient-primary text-primary-foreground">
          <h2 className="font-semibold">AI Assistant</h2>
          <Button
            onClick={handleClose}
            variant="ghost"
            size="sm"
            className="text-primary-foreground hover:bg-white/20 w-8 h-8 p-0"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Chat Interface */}
        <div className="h-[calc(100vh-4rem)]">
          <ChatInterface
            onFarmsHighlight={handleFarmsHighlight}
            onSearchQuery={handleSearchQuery}
            selectedFarm={selectedFarm}
          />
        </div>
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={handleClose}
        />
      )}
    </>
  );
};

export default GlobalChatbot;
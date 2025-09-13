import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, User, Bot, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAIAssistant } from '@/hooks/useAIAssistant';
import { Farm } from './InteractiveMap';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  suggestedFarms?: string[];
  searchQuery?: string;
}

interface ChatInterfaceProps {
  onFarmsHighlight: (farmIds: string[]) => void;
  onSearchQuery: (query: string) => void;
  selectedFarm?: Farm | null;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ 
  onFarmsHighlight, 
  onSearchQuery,
  selectedFarm 
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your Rooted AI assistant 🌱 I'll help you find fresh, local produce from nearby farms. Try saying something like:\n\n• 'I need 2kg strawberries'\n• 'Organic spinach and potatoes'\n• 'Cheapest tomatoes for delivery'\n\nWhat would you like to order today?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const { generateResponse, isProcessing } = useAIAssistant();

  const handleSend = async () => {
    if (!inputValue.trim() || isProcessing) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputValue;
    setInputValue('');

    try {
      const aiResponse = await generateResponse(currentInput);
      
      const responseMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse.text,
        isUser: false,
        timestamp: new Date(),
        suggestedFarms: aiResponse.suggestedFarms,
        searchQuery: aiResponse.searchQuery
      };

      setMessages(prev => [...prev, responseMessage]);
      
      // Highlight farms on map
      if (aiResponse.suggestedFarms && aiResponse.suggestedFarms.length > 0) {
        onFarmsHighlight(aiResponse.suggestedFarms);
      }
      
      // Update search query
      if (aiResponse.searchQuery) {
        onSearchQuery(aiResponse.searchQuery);
      }
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 2).toString(),
        text: "Sorry, I encountered an error. Please try again!",
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Add message when a farm is selected
  useEffect(() => {
    if (selectedFarm) {
      const farmSelectedMessage: Message = {
        id: `farm-selected-${Date.now()}`,
        text: `Great choice! You've selected ${selectedFarm.name}. I can see they have excellent produce available. Would you like to:\n\n• Check their pickup times: ${selectedFarm.pickupTimes.join(', ')}\n• ${selectedFarm.deliveryAvailable ? 'Arrange delivery' : 'Plan a pickup'}\n• See their full produce catalog\n\nWhat would you like to do next?`,
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, farmSelectedMessage]);
    }
  }, [selectedFarm]);

  return (
    <div className="flex flex-col h-[600px] bg-white">
      <div className="px-8 py-6 border-b border-border/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-primary shadow-soft flex items-center justify-center">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-baskerville text-lg font-semibold text-foreground">Rooted Assistant</h3>
              <p className="text-sm text-muted-foreground font-light">Always here to help you find fresh produce</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-xs text-muted-foreground font-medium">Online</span>
          </div>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-8 space-y-6 bg-gradient-to-b from-white to-slate-50/30">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "flex gap-4 max-w-[80%] animate-fade-in",
              message.isUser ? "ml-auto flex-row-reverse" : "mr-auto"
            )}
          >
            <div
              className={cn(
                "flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center",
                message.isUser
                  ? "bg-primary text-white shadow-soft"
                  : "bg-white border-2 border-primary/10 text-primary shadow-soft"
              )}
            >
              {message.isUser ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
            </div>
            <div
              className={cn(
                "rounded-2xl px-4 py-3 transition-smooth max-w-full",
                message.isUser
                  ? "bg-primary text-white shadow-soft"
                  : "bg-white border border-border/20 text-foreground shadow-soft"
              )}
            >
              <div className="text-sm leading-relaxed whitespace-pre-line">{message.text}</div>
              <p className="text-xs opacity-60 mt-2 font-light">
                {message.timestamp.toLocaleTimeString([], { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-8 border-t border-border/10 bg-white">
        <div className="flex gap-3">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything about local farms and produce..."
            className="flex-1 transition-smooth bg-slate-50 border-border/20 focus:bg-white focus:border-primary/30 h-12 text-base rounded-xl"
          />
          <Button 
            onClick={handleSend}
            disabled={!inputValue.trim() || isProcessing}
            size="lg"
            className="bg-primary hover:bg-primary/90 transition-smooth px-6 h-12 rounded-xl shadow-soft"
          >
            {isProcessing ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
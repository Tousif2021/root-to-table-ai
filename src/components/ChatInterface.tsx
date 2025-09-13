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
    <Card className="flex flex-col h-[600px] bg-card shadow-soft">
      <div className="p-4 border-b border-border bg-gradient-primary text-primary-foreground rounded-t-lg">
        <h3 className="font-semibold flex items-center gap-2">
          <Bot className="w-5 h-5" />
          Rooted AI Assistant
        </h3>
        <p className="text-sm opacity-90">Connecting you with local farmers</p>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "flex gap-3 max-w-[80%]",
              message.isUser ? "ml-auto" : "mr-auto"
            )}
          >
            <div
              className={cn(
                "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center",
                message.isUser
                  ? "bg-primary text-primary-foreground order-2"
                  : "bg-secondary text-secondary-foreground"
              )}
            >
              {message.isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>
            <div
              className={cn(
                "rounded-2xl px-4 py-2 transition-smooth",
                message.isUser
                  ? "bg-primary text-primary-foreground order-1"
                  : "bg-secondary text-secondary-foreground"
              )}
            >
              <div className="text-sm leading-relaxed whitespace-pre-line">{message.text}</div>
              <p className="text-xs opacity-70 mt-1">
                {message.timestamp.toLocaleTimeString([], { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-4 border-t border-border">
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your produce order... (e.g., '2kg strawberries and 1kg potatoes')"
            className="flex-1 transition-smooth"
          />
          <Button 
            onClick={handleSend}
            disabled={!inputValue.trim() || isProcessing}
            size="sm"
            className="bg-primary hover:bg-primary-glow transition-spring"
          >
            {isProcessing ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ChatInterface;
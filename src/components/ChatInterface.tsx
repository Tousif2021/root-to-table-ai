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
    <Card className="flex flex-col h-[600px] bg-card/80 backdrop-blur-sm shadow-glow border-border/50">
      <div className="p-6 border-b border-border/30 bg-gradient-primary text-primary-foreground rounded-t-lg relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary-glow/20"></div>
        <div className="relative">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-full bg-white/20 backdrop-blur-sm">
              <Bot className="w-5 h-5" />
            </div>
            <h3 className="font-baskerville text-xl font-semibold">Rooted AI Assistant</h3>
          </div>
          <p className="text-sm opacity-90 font-light">Connecting you with local farmers through intelligent recommendations</p>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gradient-subtle/10">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "flex gap-4 max-w-[85%] animate-fade-in",
              message.isUser ? "ml-auto" : "mr-auto"
            )}
          >
            <div
              className={cn(
                "flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center shadow-soft",
                message.isUser
                  ? "bg-gradient-primary text-primary-foreground order-2"
                  : "bg-gradient-to-br from-secondary to-secondary/80 text-secondary-foreground"
              )}
            >
              {message.isUser ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
            </div>
            <div
              className={cn(
                "rounded-2xl px-5 py-3 transition-smooth shadow-soft backdrop-blur-sm",
                message.isUser
                  ? "bg-gradient-primary text-primary-foreground order-1 rounded-br-md"
                  : "bg-card/80 border border-border/30 text-foreground rounded-bl-md"
              )}
            >
              <div className="text-sm leading-relaxed whitespace-pre-line font-medium">{message.text}</div>
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
      
      <div className="p-6 border-t border-border/30 bg-card/50 backdrop-blur-sm">
        <div className="flex gap-3">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything about local farms and produce..."
            className="flex-1 transition-smooth bg-background/50 border-border/50 backdrop-blur-sm focus:bg-background/80 h-12 text-base"
          />
          <Button 
            onClick={handleSend}
            disabled={!inputValue.trim() || isProcessing}
            size="lg"
            className="bg-gradient-primary hover:shadow-glow transition-spring px-6 h-12"
          >
            {isProcessing ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ChatInterface;
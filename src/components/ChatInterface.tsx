import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, User, Bot } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm here to help you find fresh, local produce. What would you like to order today? Try saying something like 'I need 2kg strawberries and 1kg potatoes'",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputValue('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: "Great! I found several local farms with fresh strawberries and potatoes. Anna's Farm (12km away) has organic strawberries available for pickup tomorrow. Would you like me to check availability and pricing?",
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

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
              <p className="text-sm leading-relaxed">{message.text}</p>
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
            disabled={!inputValue.trim()}
            size="sm"
            className="bg-primary hover:bg-primary-glow transition-spring"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ChatInterface;
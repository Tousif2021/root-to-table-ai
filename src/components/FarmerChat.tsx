import React, { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Send, MessageCircle } from 'lucide-react';
import { ChatBubble } from '@/components/ChatBubble';
import { TypingIndicator } from '@/components/TypingIndicator';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

interface FarmerChatProps {
  farmerName: string;
  farmerAvatar?: string;
  farmName: string;
  farm: any; // Farm object with produce, pickup times, etc.
}

const FarmerChat: React.FC<FarmerChatProps> = ({ farmerName, farmerAvatar, farmName, farm }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hi! Today's strawberries are freshly picked this morning 🍓 Let me know if you have any questions!",
      isUser: false,
      timestamp: new Date(Date.now() - 5 * 60000), // 5 minutes ago
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [isOnline] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickQuestions = [
    "When can I pick up?",
    "Do you have organic carrots?", 
    "Any discounts today?",
    "What's freshest right now?"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const generateFarmSpecificResponse = (userMessage: string) => {
    const message = userMessage.toLowerCase();
    
    // Available products / What do you have
    if (message.includes('available') || message.includes('products') || message.includes('what do you have') || message.includes('what\'s available')) {
      const availableProducts = farm.produce.filter((item: any) => item.available);
      const unavailableProducts = farm.produce.filter((item: any) => !item.available);
      
      let response = "Today we have: ";
      availableProducts.forEach((item: any, index: number) => {
        response += `${item.type} (${item.price} SEK/${item.unit})`;
        if (item.organic) response += " - organic";
        if (index < availableProducts.length - 1) response += ", ";
      });
      
      if (unavailableProducts.length > 0) {
        response += ". Unfortunately, ";
        unavailableProducts.forEach((item: any, index: number) => {
          response += item.type;
          if (index < unavailableProducts.length - 1) response += ", ";
        });
        response += " are currently out of season.";
      }
      
      response += " 🌱";
      return response;
    }
    
    // Pickup times / Hours
    if (message.includes('pickup') || message.includes('hours') || message.includes('when') || message.includes('time')) {
      if (farm.pickupTimes && farm.pickupTimes.length > 0) {
        return `You can pick up during these times: ${farm.pickupTimes.join(', ')}. We're flexible within those hours! 🕐`;
      }
      return "You can pick up anytime between 8 AM and 6 PM. We're open all day! 🕐";
    }
    
    // Specialties
    if (message.includes('specialty') || message.includes('specialties') || message.includes('special')) {
      if (farm.specialties && farm.specialties.length > 0) {
        return `We specialize in ${farm.specialties.join(', ')}. These are what make our farm unique! 🌟`;
      }
      return "We focus on growing the highest quality, freshest produce using sustainable methods! 🌟";
    }
    
    // Organic questions
    if (message.includes('organic')) {
      const organicProducts = farm.produce.filter((item: any) => item.organic && item.available);
      if (organicProducts.length > 0) {
        const organicList = organicProducts.map((item: any) => item.type).join(', ');
        return `Our organic options today are: ${organicList}. All grown without pesticides! 🌿`;
      }
      return "We grow organically whenever possible! Check our available products for today's organic options. 🌿";
    }
    
    // Prices
    if (message.includes('price') || message.includes('cost') || message.includes('expensive')) {
      return "All our prices are listed with each product. We offer great value for farm-fresh, quality produce! 💰";
    }
    
    // Delivery
    if (message.includes('delivery') || message.includes('deliver')) {
      if (farm.deliveryAvailable) {
        return "Yes, we offer delivery! You can choose delivery at checkout for your convenience. 🚚";
      }
      return "We currently only offer pickup, but it's a great chance to see the farm! 🚜";
    }
    
    // Fresh today
    if (message.includes('fresh') || message.includes('today')) {
      const availableProducts = farm.produce.filter((item: any) => item.available);
      if (availableProducts.length > 0) {
        return `Everything available today was harvested fresh! Our ${availableProducts[0].type.toLowerCase()} are especially good right now. 🌱`;
      }
      return "All our produce is harvested fresh daily! 🌱";
    }
    
    // Fallback responses
    const responses = [
      "Great question! Let me help you with that.",
      "Absolutely! We love talking about our farm and produce.",
      "Thanks for asking! We're always happy to share more about what we grow.",
      "Perfect timing! We're here to help with any questions about our farm.",
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSend = () => {
    if (message.trim()) {
      // Add user message
      const newUserMessage: Message = {
        id: Date.now().toString(),
        content: message.trim(),
        isUser: true,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, newUserMessage]);
      setMessage('');
      setIsTyping(true);
      
      // Simulate farmer response after delay
      setTimeout(() => {
        const farmerResponse: Message = {
          id: (Date.now() + 1).toString(),
          content: generateFarmSpecificResponse(message),
          isUser: false,
          timestamp: new Date(),
        };
        
        setMessages(prev => [...prev, farmerResponse]);
        setIsTyping(false);
      }, 1000 + Math.random() * 1000); // 1-2 second delay
    }
  };

  const handleQuickQuestion = (question: string) => {
    setMessage(question);
    // Auto-send the quick question
    setTimeout(() => {
      const newUserMessage: Message = {
        id: Date.now().toString(),
        content: question,
        isUser: true,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, newUserMessage]);
      setIsTyping(true);
      
      // Simulate farmer response
      setTimeout(() => {
        const farmerResponse: Message = {
          id: (Date.now() + 1).toString(),
          content: generateFarmSpecificResponse(question),
          isUser: false,
          timestamp: new Date(),
        };
        
        setMessages(prev => [...prev, farmerResponse]);
        setIsTyping(false);
      }, 1000 + Math.random() * 1000);
    }, 100);
  };

  return (
    <Card className="shadow-medium bg-card border-border h-[500px] flex flex-col">
      {/* Farmer Profile Header */}
      <div className="flex-shrink-0 p-4 border-b border-border">
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12 ring-2 ring-primary/20">
            <AvatarImage src={farmerAvatar} alt={farmerName} />
            <AvatarFallback className="bg-primary text-primary-foreground">
              {farmerName.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h4 className="font-medium text-foreground">{farmerName}</h4>
            <p className="text-sm text-muted-foreground">Owner of {farmName}</p>
          </div>
          <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
            <div className="w-2 h-2 bg-primary rounded-full mr-2 animate-pulse"></div>
            {isOnline ? 'Online now' : 'Replies in ~1h'}
          </Badge>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <ChatBubble
            key={msg.id}
            message={msg.content}
            isUser={msg.isUser}
            timestamp={msg.timestamp}
          />
        ))}
        
        {isTyping && (
          <>
            <TypingIndicator />
            <p className="text-xs text-muted-foreground text-center">
              Waiting for farmer to reply…
            </p>
          </>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Reply Chips */}
      {messages.length <= 1 && (
        <div className="flex-shrink-0 px-4 pb-2">
          <div className="flex flex-wrap gap-2">
            {quickQuestions.map((question, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => handleQuickQuestion(question)}
                className="text-xs border-border hover:bg-primary/10 hover:border-primary/50 hover:text-primary transition-smooth rounded-full"
              >
                {question}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Chat Input */}
      <div className="flex-shrink-0 p-4 border-t border-border">
        <div className="flex items-center gap-3 bg-muted/30 border border-border rounded-full px-4 py-2 focus-within:border-primary focus-within:bg-background transition-all duration-200">
          <Input
            placeholder="Ask about produce, pickup times, or anything else..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && !isTyping && handleSend()}
            disabled={isTyping}
            className="flex-1 border-0 bg-transparent focus:ring-0 focus:outline-none shadow-none px-0"
          />
          <Button 
            onClick={handleSend}
            disabled={!message.trim() || isTyping}
            size="sm"
            className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full h-8 w-8 p-0"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default FarmerChat;
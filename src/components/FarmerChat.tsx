import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Send, MessageCircle } from 'lucide-react';

interface FarmerChatProps {
  farmerName: string;
  farmerAvatar?: string;
  farmName: string;
}

const FarmerChat: React.FC<FarmerChatProps> = ({ farmerName, farmerAvatar, farmName }) => {
  const [message, setMessage] = useState('');
  const [isOnline] = useState(true);

  const quickQuestions = [
    "When can I pick up?",
    "Do you have organic carrots?", 
    "Any discounts today?",
    "What's freshest right now?"
  ];

  const handleSend = () => {
    if (message.trim()) {
      // In a real app, this would send the message
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  const handleQuickQuestion = (question: string) => {
    setMessage(question);
  };

  return (
    <Card className="shadow-medium bg-card border-border">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <MessageCircle className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-lg text-foreground">Chat with Farmer</h3>
        </div>

        {/* Farmer Profile */}
        <div className="flex items-center gap-3 mb-4 p-3 bg-muted/30 rounded-lg border border-border">
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
          <Badge className="bg-primary/10 text-primary border-primary/20">
            <div className="w-2 h-2 bg-primary rounded-full mr-2 animate-pulse"></div>
            Online now
          </Badge>
        </div>

        {/* Chat Preview */}
        <div className="mb-4 p-3 bg-muted/20 rounded-lg border border-border">
          <div className="flex gap-2">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                {farmerName.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 bg-primary/5 rounded-lg px-3 py-2 border border-primary/10">
              <p className="text-sm text-foreground">
                Hi! Today's strawberries are freshly picked this morning 🍓 Let me know if you have any questions!
              </p>
            </div>
          </div>
        </div>

        {/* Message Input */}
        <div className="space-y-3">
          <div className="flex gap-2">
            <Input
              placeholder="Ask about produce, pickup times, or anything else..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              className="flex-1 bg-background border-border focus:border-primary focus:ring-primary"
            />
            <Button 
              onClick={handleSend}
              disabled={!message.trim()}
              className="bg-primary hover:bg-primary/90 text-primary-foreground transition-smooth px-4"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>

          {/* Quick Questions */}
          <div className="flex flex-wrap gap-2">
            {quickQuestions.map((question, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => handleQuickQuestion(question)}
                className="text-xs border-border hover:bg-primary/10 hover:border-primary/50 hover:text-primary transition-smooth"
              >
                {question}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default FarmerChat;
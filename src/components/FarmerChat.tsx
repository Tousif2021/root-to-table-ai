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
    <Card className="relative bg-gradient-to-br from-green-50/30 to-emerald-50/50 dark:from-green-950/20 dark:to-emerald-950/30 border-green-200/50 dark:border-green-800/50 overflow-hidden">
      {/* Farm Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23059669' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat'
        }}></div>
      </div>
      
      <div className="relative p-6">
        <div className="flex items-center gap-2 mb-4">
          <MessageCircle className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-lg text-foreground">Chat with Farmer</h3>
        </div>

        {/* Farmer Profile */}
        <div className="flex items-center gap-3 mb-4 p-3 bg-white/40 dark:bg-black/20 rounded-lg border border-white/50 dark:border-green-800/30">
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
          <Badge 
            className={`${isOnline ? 'bg-green-100 text-green-800 border-green-300' : 'bg-gray-100 text-gray-600 border-gray-300'}`}
            variant="outline"
          >
            {isOnline ? (
              <>
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                Online now
              </>
            ) : (
              'Replies in ~1h'
            )}
          </Badge>
        </div>

        {/* Chat Preview */}
        <div className="mb-4 p-3 bg-white/60 dark:bg-black/30 rounded-lg border border-white/60 dark:border-green-700/30">
          <div className="flex gap-2">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                {farmerName.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 bg-primary/10 rounded-lg px-3 py-2">
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
              className="flex-1 bg-white/60 dark:bg-black/40 border-white/60 dark:border-green-700/40 focus:border-primary"
            />
            <Button 
              onClick={handleSend}
              disabled={!message.trim()}
              className="bg-primary hover:bg-primary-glow transition-smooth px-4"
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
                className="text-xs bg-white/50 dark:bg-black/30 border-white/60 dark:border-green-700/40 hover:bg-primary/10 hover:border-primary/50 transition-smooth"
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
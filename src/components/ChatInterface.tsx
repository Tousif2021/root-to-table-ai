import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageCircle, Send, Sprout, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAIAssistant } from '@/hooks/useAIAssistant';
import { Farm } from '@/types/farm';
import { useNavigate } from 'react-router-dom';
import { mockFarms } from '@/data/farmData';

interface Message {
  type: 'user' | 'ai' | 'farms';
  content: string;
  timestamp: Date;
  suggestedFarms?: string[];
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
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const { generateResponse, isProcessing } = useAIAssistant();
  const navigate = useNavigate();

  const generateFarmUrl = (farmName: string) => {
    return farmName.toLowerCase()
      .replace(/[^a-z0-9\s]/g, '') // Remove special characters
      .replace(/\s+/g, '-')        // Replace spaces with hyphens
      .replace(/-+/g, '-')         // Remove multiple consecutive hyphens
      .replace(/^-|-$/g, '');      // Remove leading/trailing hyphens
  };

  const handleVisitFarm = (farmName: string) => {
    const farmUrl = generateFarmUrl(farmName);
    navigate(`/order/${farmUrl}`);
  };

  const handleSend = async () => {
    if (!input.trim() || isProcessing) return;

    const currentInput = input;
    setInput('');

    // Add user message to chat
    const userMessage: Message = {
      type: 'user',
      content: currentInput,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);

    try {
      const aiResponse = await generateResponse(currentInput);
      
      // Add AI response to chat
      const aiMessage: Message = {
        type: 'ai',
        content: aiResponse.text,
        timestamp: new Date(),
        suggestedFarms: aiResponse.suggestedFarms
      };
      setMessages(prev => [...prev, aiMessage]);
      
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
        type: 'ai',
        content: "Sorry, I encountered an error. Please try again!",
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

  const getSuggestedFarmDetails = (farmIds: string[] = []) => {
    return farmIds.map(farmId => 
      mockFarms.find(farm => farm.id === farmId)
    ).filter(Boolean) as Farm[];
  };

  return (
    <div className="w-full max-w-2xl mx-auto h-full flex flex-col">
      {/* Chat Messages Container - Scrollable */}
      <div className="flex-1 overflow-hidden">
        {messages.length > 0 ? (
          <div className="relative h-full">
            <div className="absolute inset-0 bg-gradient-earth opacity-10 blur-sm"></div>
            <div className="relative bg-background/80 backdrop-blur-sm border border-border/50 rounded-2xl h-full flex flex-col shadow-soft">
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      message.type === 'user' ? 'justify-end' : 'justify-start'
                    } animate-fade-in`}
                  >
                    <div
                      className={`max-w-[80%] p-4 rounded-2xl ${
                        message.type === 'user'
                          ? 'bg-primary text-primary-foreground shadow-medium'
                          : 'bg-muted/50 text-foreground border border-border/30'
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{message.content}</p>
                      <p className="text-xs opacity-70 mt-2">
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
                
                {/* Show suggested farms if any */}
                {messages.some(m => m.suggestedFarms && m.suggestedFarms.length > 0) && (
                  <div className="mt-6 space-y-4">
                    <h4 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                      <Sprout className="w-4 h-4" />
                      Recommended Farms
                    </h4>
                    <div className="grid gap-3">
                      {messages
                        .filter(m => m.suggestedFarms && m.suggestedFarms.length > 0)
                        .slice(-1)[0]?.suggestedFarms?.map((farmId, farmIndex) => {
                          const farm = getSuggestedFarmDetails([farmId])[0];
                          if (!farm) return null;
                          return (
                            <div
                              key={farmIndex}
                              className="bg-background/60 border border-border/40 rounded-xl p-4 hover:border-primary/30 transition-colors"
                            >
                              <div className="flex justify-between items-start mb-2">
                                <h5 className="font-medium text-foreground">{farm.name}</h5>
                                <span className="text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded-full">
                                  {farm.distance}
                                </span>
                              </div>
                              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                                Available: {farm.produce.slice(0, 3).map(p => typeof p === 'string' ? p : p.type).join(', ')}
                              </p>
                              <div className="flex justify-between items-center">
                                <div className="flex gap-1">
                                  {farm.produce.slice(0, 2).map((item, specIndex) => (
                                    <span
                                      key={specIndex}
                                      className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full"
                                    >
                                      {typeof item === 'string' ? item : item.type}
                                    </span>
                                  ))}
                                </div>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleVisitFarm(farm.name)}
                                  className="text-xs border-primary/30 hover:bg-primary/10"
                                >
                                  Visit Farm
                                </Button>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-end justify-center pb-8">
            <div className="text-center space-y-3">
              <MessageCircle className="w-8 h-8 text-muted-foreground/40 mx-auto" />
              <p className="text-sm text-muted-foreground/70">Ask me about farms, produce, or seasonal recommendations</p>
              <p className="text-xs text-muted-foreground/50">Your conversation will appear above</p>
            </div>
          </div>
        )}
      </div>

      {/* Suggestion Chips - Above Input */}
      <div className="py-4">
        <div className="flex flex-wrap gap-2 justify-center">
          {['What vegetables are in season?', 'Find organic farms nearby', 'Show me local dairy farms', 'Best produce for salads'].map((suggestion) => (
            <Button
              key={suggestion}
              variant="outline"
              size="sm"
              onClick={() => setInput(suggestion)}
              className="text-xs border-primary/20 hover:border-primary/40 hover:bg-primary/5 text-muted-foreground hover:text-foreground transition-colors"
            >
              {suggestion}
            </Button>
          ))}
        </div>
      </div>

      {/* AI-Enhanced Input Area - Fixed at Bottom */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-primary opacity-20 blur-lg"></div>
        <div className="relative bg-background/95 backdrop-blur-sm border border-primary/20 rounded-2xl p-6 shadow-glow">
          <div className="flex items-center gap-3 mb-4">
            <MessageCircle className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">
              AI-Enhanced Farm Assistant
            </span>
          </div>
          
          <div className="flex gap-3">
            <Input
              type="text"
              placeholder="Ask me about seasonal produce, local farms, or get personalized recommendations..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 bg-background/50 border-primary/30 focus:border-primary/60 text-foreground placeholder:text-muted-foreground/70"
              disabled={isProcessing}
            />
            <Button
              onClick={handleSend}
              disabled={isProcessing || !input.trim()}
              size="icon"
              className="bg-gradient-primary hover:opacity-90 text-primary-foreground shadow-md transition-all duration-300"
            >
              {isProcessing ? (
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
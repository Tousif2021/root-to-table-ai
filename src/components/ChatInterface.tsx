import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, ArrowUp, Loader2, ArrowRight } from 'lucide-react';
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
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [hasAskedQuestion, setHasAskedQuestion] = useState(false);
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
    if (!inputValue.trim() || isProcessing) return;

    const currentInput = inputValue;
    setInputValue('');
    setHasAskedQuestion(true);

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
    <div className="w-full flex flex-col items-center pt-20 px-4">
      {/* AI-Enhanced Search Bar - Always visible */}
      <div className="w-full max-w-2xl mb-8">
        <div className="relative">
          {/* Subtle Glow Effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-green-400/30 via-emerald-400/30 to-green-500/30 rounded-full opacity-75 blur animate-pulse"></div>
          
          {/* Main Search Bar with Glass Effect */}
          <div className="relative bg-white/95 backdrop-blur-sm rounded-full border-2 border-transparent shadow-soft hover:shadow-glow focus-within:shadow-glow transition-all duration-500 hover:scale-[1.02] focus-within:scale-[1.02]">
            {/* Gradient Border */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-400 via-emerald-400 to-green-500 p-[2px]">
              <div className="bg-white/95 backdrop-blur-sm rounded-full h-full w-full"></div>
            </div>
            
            <div className="relative flex items-center gap-3 px-6 py-4">
              <div className={cn(
                "text-gray-400 flex-shrink-0 transition-all duration-300",
                isProcessing && "text-green-500 animate-spin"
              )}>
                <Search className="w-5 h-5" />
              </div>
              
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="What fresh produce are you looking for today?"
                className="flex-1 border-0 bg-transparent text-foreground placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 text-lg px-0 text-elegant"
                disabled={isProcessing}
              />
              
              <Button
                onClick={handleSend}
                disabled={!inputValue.trim() || isProcessing}
                size="icon"
                className="rounded-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 disabled:from-gray-300 disabled:to-gray-300 text-white shadow-medium hover:shadow-glow flex-shrink-0 transition-all duration-300 hover:scale-110 disabled:scale-100"
              >
                {isProcessing ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <ArrowUp className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Response Container */}
      {hasAskedQuestion && (
        <div className="w-full max-w-4xl animate-fade-in animate-scale-in">
          <div className="bg-gradient-to-br from-white/90 via-green-50/90 to-emerald-50/90 backdrop-blur-sm rounded-3xl p-8 shadow-glow border border-green-200/30 transition-all duration-500">
            
            {/* Chat Messages */}
            <div className="space-y-4 mb-6">
              {messages.map((message, index) => (
                <div 
                  key={index}
                  className={cn(
                    "flex animate-fade-in",
                    message.type === 'user' ? 'justify-end' : 'justify-start'
                  )}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={cn(
                    "max-w-[80%] rounded-2xl px-4 py-3 transition-all duration-300",
                    message.type === 'user' 
                      ? "bg-green-100/90 backdrop-blur-sm text-green-900 rounded-br-md shadow-soft" 
                      : "bg-white/95 backdrop-blur-sm shadow-medium border border-green-200/50 rounded-bl-md hover:shadow-glow"
                  )}>
                    <p className="text-sm leading-relaxed whitespace-pre-line text-elegant">
                      {message.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Farm Suggestion Cards */}
            {messages.length > 0 && messages[messages.length - 1]?.suggestedFarms && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Recommended Farms</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  {getSuggestedFarmDetails(messages[messages.length - 1].suggestedFarms).map((farm, index) => (
                    <div 
                      key={farm.id} 
                      className="bg-white rounded-xl p-4 border border-green-200/50 shadow-sm hover:shadow-md transition-all duration-300 animate-fade-in"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="font-semibold text-foreground">{farm.name}</h4>
                        <span className="text-sm text-muted-foreground">{farm.distance}</span>
                      </div>
                      <div className="mb-3">
                        <p className="text-sm text-muted-foreground mb-2">Available Produce:</p>
                        <div className="flex flex-wrap gap-1">
                          {farm.produce.slice(0, 3).map((item, i) => (
                            <span key={i} className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                              {typeof item === 'string' ? item : item.type}
                            </span>
                          ))}
                          {farm.produce.length > 3 && (
                            <span className="text-xs text-muted-foreground">+{farm.produce.length - 3} more</span>
                          )}
                        </div>
                      </div>
                      <Button
                        onClick={() => handleVisitFarm(farm.name)}
                        className="w-full bg-green-600 hover:bg-green-700 text-white transition-all duration-300"
                        size="sm"
                      >
                        Visit Farm
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Suggestion Chips - Only show after first question */}
            {messages.length > 0 && (
              <div className="flex flex-wrap gap-3 justify-center">
                <button
                  onClick={() => setInputValue("Find organic options near me")}
                  className="px-4 py-2 bg-green-100/80 hover:bg-green-200 rounded-full text-green-800 hover:text-green-900 text-sm transition-all duration-300 border border-green-200/50 hover:border-green-300"
                >
                  Organic Options
                </button>
                <button
                  onClick={() => setInputValue("Show me budget-friendly picks")}
                  className="px-4 py-2 bg-white/80 hover:bg-gray-100 rounded-full text-gray-700 hover:text-gray-900 text-sm transition-all duration-300 border border-gray-200/50 hover:border-gray-300"
                >
                  Budget-Friendly Picks
                </button>
                <button
                  onClick={() => setInputValue("What's fresh this weekend")}
                  className="px-4 py-2 bg-amber-50/80 hover:bg-amber-100 rounded-full text-amber-800 hover:text-amber-900 text-sm transition-all duration-300 border border-amber-200/50 hover:border-amber-300"
                >
                  Fresh This Weekend
                </button>
              </div>
            )}

          </div>
        </div>
      )}
    </div>
  );
};

export default ChatInterface;
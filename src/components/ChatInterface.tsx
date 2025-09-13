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
    <div className="w-full min-h-screen bg-white">
      {/* Centered Search Bar - Always visible */}
      <div className="w-full max-w-2xl mx-auto pt-20">
        <div className="rounded-full border-2 border-green-500 hover:border-green-600 transition-all duration-300 focus-within:border-green-600 focus-within:shadow-lg">
          <div className="flex items-center gap-3 px-6 py-4">
            <div className="text-green-600 flex-shrink-0">
              <Search className="w-5 h-5" />
            </div>
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="What fresh produce are you looking for today?"
              className="flex-1 border-0 bg-transparent text-foreground placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 text-lg px-0"
              disabled={isProcessing}
            />
            <Button
              onClick={handleSend}
              disabled={!inputValue.trim() || isProcessing}
              size="icon"
              className="rounded-full bg-green-600 hover:bg-green-700 text-white shadow-lg flex-shrink-0 disabled:opacity-50 transition-all duration-300"
            >
              {isProcessing ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <ArrowUp className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Animated Response Container */}
      {hasAskedQuestion && (
        <div className="w-full max-w-4xl mx-auto mt-8 animate-fade-in">
          <div className="bg-gradient-to-br from-white via-green-50 to-emerald-50 rounded-3xl p-8 shadow-lg border border-green-200/50">
            
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
                    "max-w-[80%] rounded-2xl px-4 py-3",
                    message.type === 'user' 
                      ? "bg-green-100 text-green-900 rounded-br-md" 
                      : "bg-white shadow-sm border border-green-200/50 rounded-bl-md"
                  )}>
                    <p className="text-sm leading-relaxed whitespace-pre-line">
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
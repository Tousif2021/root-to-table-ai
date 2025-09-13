import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, ArrowUp, Loader2, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAIAssistant } from '@/hooks/useAIAssistant';
import { Farm } from '@/types/farm';
import { useNavigate } from 'react-router-dom';
import { mockFarms } from '@/data/farmData';

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
  const [lastResponse, setLastResponse] = useState<string>('');
  const [hasAskedQuestion, setHasAskedQuestion] = useState(false);
  const [suggestedFarms, setSuggestedFarms] = useState<string[]>([]);
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

    try {
      const aiResponse = await generateResponse(currentInput);
      
      setLastResponse(aiResponse.text);
      setSuggestedFarms(aiResponse.suggestedFarms || []);
      
      // Highlight farms on map
      if (aiResponse.suggestedFarms && aiResponse.suggestedFarms.length > 0) {
        onFarmsHighlight(aiResponse.suggestedFarms);
      }
      
      // Update search query
      if (aiResponse.searchQuery) {
        onSearchQuery(aiResponse.searchQuery);
      }
    } catch (error) {
      setLastResponse("Sorry, I encountered an error. Please try again!");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const getSuggestedFarmDetails = () => {
    return suggestedFarms.map(farmId => 
      mockFarms.find(farm => farm.id === farmId)
    ).filter(Boolean) as Farm[];
  };

  return (
    <div className="w-full">
      {/* Minimal Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-foreground font-serif">
          Meet Your Personal Farm AI Assistant
        </h2>
      </div>

      {/* Collapsed Search Bar */}
      <div className="w-full max-w-2xl mx-auto mb-8">
        <div className="bg-white rounded-full border-2 border-gray-200 shadow-soft hover:border-green-400 transition-smooth">
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
              className="rounded-full bg-green-600 hover:bg-green-700 text-white shadow-lg flex-shrink-0 disabled:opacity-50 transition-smooth"
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
        <div className="w-full max-w-4xl mx-auto animate-fade-in">
          <div className="bg-gradient-to-br from-white via-green-50 to-green-100 rounded-3xl p-8 shadow-medium border border-green-200">
            
            {/* AI Response */}
            {lastResponse && (
              <div className="mb-6">
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-green-200 shadow-soft">
                  <div className="text-foreground leading-relaxed whitespace-pre-line">
                    {lastResponse}
                  </div>
                </div>
              </div>
            )}

            {/* Farm Suggestion Cards */}
            {getSuggestedFarmDetails().length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Recommended Farms</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  {getSuggestedFarmDetails().map((farm, index) => (
                    <div 
                      key={farm.id} 
                      className="bg-white rounded-xl p-4 border border-green-200 shadow-soft hover:shadow-medium transition-smooth animate-fade-in"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="font-semibold text-foreground">{farm.name}</h4>
                        <span className="text-sm text-muted-foreground">2.3 miles</span>
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
                        className="w-full bg-green-600 hover:bg-green-700 text-white"
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
            <div className="flex flex-wrap gap-3 justify-center">
              <button
                onClick={() => setInputValue("Find organic options near me")}
                className="px-4 py-2 bg-green-100 hover:bg-green-200 rounded-full text-green-800 hover:text-green-900 text-sm transition-smooth border border-green-200 hover:border-green-300"
              >
                Organic Options
              </button>
              <button
                onClick={() => setInputValue("Show me budget-friendly picks")}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-800 hover:text-gray-900 text-sm transition-smooth border border-gray-200 hover:border-gray-300"
              >
                Budget-Friendly Picks
              </button>
              <button
                onClick={() => setInputValue("What's fresh this weekend")}
                className="px-4 py-2 bg-amber-50 hover:bg-amber-100 rounded-full text-amber-800 hover:text-amber-900 text-sm transition-smooth border border-amber-200 hover:border-amber-300"
              >
                Fresh This Weekend
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Selected Farm Display */}
      {selectedFarm && (
        <div className="w-full max-w-4xl mx-auto mt-6">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-green-200 shadow-soft">
            <div className="text-foreground leading-relaxed">
              <strong>{selectedFarm.name}</strong> selected! 
              <br />
              Pickup times: {selectedFarm.pickupTimes.join(', ')}
              <br />
              {selectedFarm.deliveryAvailable ? 'Delivery available' : 'Pickup only'}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatInterface;
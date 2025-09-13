import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, ArrowUp, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAIAssistant } from '@/hooks/useAIAssistant';
import { Farm } from '@/types/farm';

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
  const { generateResponse, isProcessing } = useAIAssistant();

  const handleSend = async () => {
    if (!inputValue.trim() || isProcessing) return;

    const currentInput = inputValue;
    setInputValue('');

    try {
      const aiResponse = await generateResponse(currentInput);
      
      setLastResponse(aiResponse.text);
      
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

  return (
    <div className="relative min-h-[500px] w-full overflow-hidden rounded-3xl">
      {/* Farm-inspired Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-green-50 to-green-100"></div>
      
      {/* Content Container */}
      <div className="relative z-10 flex flex-col h-full min-h-[500px] p-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4 font-serif">
            Your Local Produce Guide
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover fresh produce and trusted farms near you.
          </p>
        </div>

        {/* Response Display */}
        {lastResponse && (
          <div className="mb-8 max-w-4xl mx-auto">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-green-200 shadow-soft">
              <div className="text-foreground leading-relaxed whitespace-pre-line">
                {lastResponse}
              </div>
            </div>
          </div>
        )}

        {/* Selected Farm Display */}
        {selectedFarm && (
          <div className="mb-8 max-w-4xl mx-auto">
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

        {/* Main Input Container */}
        <div className="flex-1 flex items-end justify-center pb-8">
          <div className="w-full max-w-4xl">
            
            {/* Professional Input Bar */}
            <div className="bg-white/80 backdrop-blur-sm rounded-full p-1 shadow-elegant border-2 border-green-500">
              <div className="flex items-center gap-3 px-6 py-4">
                
                {/* Search Icon */}
                <div className="text-green-600 flex-shrink-0">
                  <Search className="w-5 h-5" />
                </div>

                {/* Main Input */}
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="What fresh produce are you looking for today?"
                  className="flex-1 border-0 bg-transparent text-foreground placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 text-lg px-0"
                  disabled={isProcessing}
                />

                {/* Send Button */}
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

            {/* Suggestion Chips */}
            <div className="flex flex-wrap gap-3 justify-center mt-8">
              <button
                onClick={() => setInputValue("Find organic options near me")}
                className="px-5 py-3 bg-green-100 hover:bg-green-200 rounded-full text-green-800 hover:text-green-900 text-sm transition-smooth border border-green-200 hover:border-green-300"
              >
                Organic Options
              </button>
              <button
                onClick={() => setInputValue("Show me budget-friendly picks")}
                className="px-5 py-3 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-800 hover:text-gray-900 text-sm transition-smooth border border-gray-200 hover:border-gray-300"
              >
                Budget-Friendly Picks
              </button>
              <button
                onClick={() => setInputValue("What's fresh this weekend")}
                className="px-5 py-3 bg-amber-50 hover:bg-amber-100 rounded-full text-amber-800 hover:text-amber-900 text-sm transition-smooth border border-amber-200 hover:border-amber-300"
              >
                Fresh This Weekend
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default ChatInterface;
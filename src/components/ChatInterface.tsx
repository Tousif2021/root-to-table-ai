import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Mic, ArrowUp, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAIAssistant } from '@/hooks/useAIAssistant';
import { Farm } from './InteractiveMap';

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
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700"></div>
      
      {/* Content Container */}
      <div className="relative z-10 flex flex-col h-full min-h-[500px] p-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ask your AI assistant
          </h2>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Find fresh, local produce from nearby farms. I'll help you discover the best options for your needs.
          </p>
        </div>

        {/* Response Display */}
        {lastResponse && (
          <div className="mb-8 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="text-white/90 leading-relaxed whitespace-pre-line">
                {lastResponse}
              </div>
            </div>
          </div>
        )}

        {/* Selected Farm Display */}
        {selectedFarm && (
          <div className="mb-8 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="text-white/90 leading-relaxed">
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
            
            {/* Floating Input */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-full p-2 shadow-2xl border border-white/20 backdrop-blur-sm">
              <div className="flex items-center gap-4 px-6 py-4">
                
                {/* Plus Button */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full hover:bg-white/20 text-slate-700 hover:text-slate-900 flex-shrink-0"
                >
                  <Plus className="w-5 h-5" />
                </Button>

                {/* Main Input */}
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="What fresh produce are you looking for today?"
                  className="flex-1 border-0 bg-transparent text-slate-800 placeholder:text-slate-500 focus-visible:ring-0 focus-visible:ring-offset-0 text-lg px-0"
                  disabled={isProcessing}
                />

                {/* Voice Button */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full hover:bg-white/20 text-slate-700 hover:text-slate-900 flex-shrink-0"
                >
                  <Mic className="w-5 h-5" />
                </Button>

                {/* Send Button */}
                <Button
                  onClick={handleSend}
                  disabled={!inputValue.trim() || isProcessing}
                  size="icon"
                  className="rounded-full bg-slate-800 hover:bg-slate-700 text-white shadow-lg flex-shrink-0 disabled:opacity-50"
                >
                  {isProcessing ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <ArrowUp className="w-5 h-5" />
                  )}
                </Button>

              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap gap-3 justify-center mt-6">
              <button
                onClick={() => setInputValue("Find organic tomatoes near me")}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full text-white/80 hover:text-white text-sm transition-smooth border border-white/20"
              >
                Organic tomatoes
              </button>
              <button
                onClick={() => setInputValue("Cheapest vegetables for delivery")}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full text-white/80 hover:text-white text-sm transition-smooth border border-white/20"
              >
                Budget-friendly options
              </button>
              <button
                onClick={() => setInputValue("Fresh berries this weekend")}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full text-white/80 hover:text-white text-sm transition-smooth border border-white/20"
              >
                Weekend fresh berries
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default ChatInterface;
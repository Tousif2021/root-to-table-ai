import { useState, useCallback } from 'react';
import { Farm } from '@/components/InteractiveMap';
import { mockFarms } from '@/data/farmData';

interface ParsedRequest {
  items: Array<{
    type: string;
    quantity?: number;
    unit?: string;
    preferences?: string[];
  }>;
  preferences: string[];
}

interface AIResponse {
  text: string;
  suggestedFarms: string[];
  searchQuery?: string;
}

export const useAIAssistant = () => {
  const [isProcessing, setIsProcessing] = useState(false);

  const parseRequest = useCallback((message: string): ParsedRequest => {
    const lowerMessage = message.toLowerCase();
    
    // Common produce types
    const produceTypes = ['strawberries', 'potatoes', 'spinach', 'tomatoes', 'carrots', 'onions', 'lettuce', 'apples', 'pears', 'blueberries', 'herbs', 'microgreens'];
    
    // Extract quantities and items
    const items: ParsedRequest['items'] = [];
    const preferences: string[] = [];
    
    // Look for quantity + produce patterns (e.g., "2kg strawberries", "500g spinach")
    const quantityPattern = /(\d+(?:\.\d+)?)\s*(kg|g|kilo|gram|kilogram)\s+(\w+)/gi;
    let match;
    
    while ((match = quantityPattern.exec(message)) !== null) {
      const [, quantity, unit, type] = match;
      const normalizedType = type.toLowerCase();
      
      if (produceTypes.some(produce => normalizedType.includes(produce) || produce.includes(normalizedType))) {
        items.push({
          type: produceTypes.find(produce => normalizedType.includes(produce) || produce.includes(normalizedType)) || type,
          quantity: parseFloat(quantity),
          unit: unit === 'g' ? 'g' : 'kg'
        });
      }
    }
    
    // Also look for standalone produce mentions
    produceTypes.forEach(produce => {
      if (lowerMessage.includes(produce) && !items.some(item => item.type === produce)) {
        items.push({ type: produce });
      }
    });
    
    // Extract preferences
    if (lowerMessage.includes('organic')) preferences.push('organic');
    if (lowerMessage.includes('cheap') || lowerMessage.includes('cheapest')) preferences.push('cheapest');
    if (lowerMessage.includes('close') || lowerMessage.includes('nearby')) preferences.push('closest');
    if (lowerMessage.includes('delivery')) preferences.push('delivery');
    if (lowerMessage.includes('pickup') || lowerMessage.includes('pick up')) preferences.push('pickup');
    if (lowerMessage.includes('today')) preferences.push('today');
    if (lowerMessage.includes('tomorrow')) preferences.push('tomorrow');
    
    return { items, preferences };
  }, []);

  const findMatchingFarms = useCallback((parsedRequest: ParsedRequest): Farm[] => {
    const { items, preferences } = parsedRequest;
    
    if (items.length === 0) return [];
    
    // Filter farms that have the requested produce
    let matchingFarms = mockFarms.filter(farm => {
      return items.some(item => {
        return farm.produce.some(produce => 
          produce.type.toLowerCase().includes(item.type) && produce.available
        );
      });
    });
    
    // Apply preferences
    if (preferences.includes('organic')) {
      matchingFarms = matchingFarms.filter(farm =>
        items.some(item =>
          farm.produce.some(produce =>
            produce.type.toLowerCase().includes(item.type) && produce.organic
          )
        )
      );
    }
    
    if (preferences.includes('delivery')) {
      matchingFarms = matchingFarms.filter(farm => farm.deliveryAvailable);
    }
    
    // Sort by preferences
    if (preferences.includes('cheapest')) {
      matchingFarms.sort((a, b) => {
        const aPrice = Math.min(...a.produce.filter(p => p.available).map(p => p.price));
        const bPrice = Math.min(...b.produce.filter(p => p.available).map(p => p.price));
        return aPrice - bPrice;
      });
    } else if (preferences.includes('closest')) {
      matchingFarms.sort((a, b) => {
        const aDistance = parseFloat(a.distance);
        const bDistance = parseFloat(b.distance);
        return aDistance - bDistance;
      });
    } else {
      // Default sort by rating
      matchingFarms.sort((a, b) => b.rating - a.rating);
    }
    
    return matchingFarms.slice(0, 3); // Return top 3 matches
  }, []);

  const calculateEcoSavings = useCallback((farm: Farm, items: ParsedRequest['items']): string => {
    const distance = parseFloat(farm.distance);
    const totalWeight = items.reduce((sum, item) => sum + (item.quantity || 1), 0);
    const co2Saved = Math.round((distance * 0.1 + totalWeight * 0.5) * 100) / 100;
    return `${co2Saved}kg CO₂ saved vs supermarket`;
  }, []);

  const generateResponse = useCallback(async (message: string): Promise<AIResponse> => {
    setIsProcessing(true);
    
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const parsedRequest = parseRequest(message);
    const matchingFarms = findMatchingFarms(parsedRequest);
    
    if (parsedRequest.items.length === 0) {
      setIsProcessing(false);
      return {
        text: "I'd love to help you find fresh produce! Try telling me what you need, like '2kg strawberries' or 'organic spinach and potatoes'.",
        suggestedFarms: []
      };
    }
    
    if (matchingFarms.length === 0) {
      setIsProcessing(false);
      return {
        text: `I couldn't find any farms with ${parsedRequest.items.map(i => i.type).join(' and ')} available right now. Try searching for other produce or check back later!`,
        suggestedFarms: []
      };
    }
    
    let response = `Great! I found ${matchingFarms.length} farm${matchingFarms.length > 1 ? 's' : ''} with your requested items:\n\n`;
    
    matchingFarms.forEach(farm => {
      const availableItems = parsedRequest.items.filter(item =>
        farm.produce.some(produce => 
          produce.type.toLowerCase().includes(item.type) && produce.available
        )
      );
      
      response += `🌱 **${farm.name}** (${farm.distance})\n`;
      
      availableItems.forEach(item => {
        const produce = farm.produce.find(p => 
          p.type.toLowerCase().includes(item.type) && p.available
        );
        if (produce) {
          response += `   • ${produce.type}: ${produce.price} SEK/${produce.unit}${produce.organic ? ' (Organic)' : ''}\n`;
        }
      });
      
      response += `   • Eco-impact: ${calculateEcoSavings(farm, parsedRequest.items)}\n`;
      response += `   • Rating: ${farm.rating}⭐ | Eco Score: ${farm.ecoScore}/10\n\n`;
    });
    
    response += "Click on a farm pin on the map to see more details, or tell me which farm interests you most!";
    
    setIsProcessing(false);
    
    return {
      text: response,
      suggestedFarms: matchingFarms.map(f => f.id),
      searchQuery: parsedRequest.items.map(i => i.type).join(', ')
    };
  }, [parseRequest, findMatchingFarms, calculateEcoSavings]);

  return {
    generateResponse,
    isProcessing
  };
};
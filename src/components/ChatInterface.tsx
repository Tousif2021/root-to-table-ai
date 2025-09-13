import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, Send } from "lucide-react";
import { useAIAssistant } from "@/hooks/useAIAssistant";
import { Farm } from "@/types/farm";
import { useNavigate } from "react-router-dom";
import { ChatBubble } from "@/components/ChatBubble";
import { FarmSuggestionCard } from "@/components/FarmSuggestionCard";
import { TypingIndicator } from "@/components/TypingIndicator";
interface Message {
  id: string;
  type: 'user' | 'ai' | 'farms';
  content: string;
  timestamp: Date;
  suggestedFarms?: Farm[];
}
interface ChatInterfaceProps {
  onFarmsHighlight?: (farms: Farm[]) => void;
  onSearchQuery?: (query: string) => void;
  selectedFarm?: Farm | null;
}
const predefinedSuggestions = ["What vegetables are in season?", "Find organic farms nearby", "Show me local dairy farms", "Best produce for salads"];
const ChatInterface: React.FC<ChatInterfaceProps> = ({
  onFarmsHighlight,
  onSearchQuery,
  selectedFarm
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const {
    generateResponse,
    isProcessing
  } = useAIAssistant();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      const messagesContainer = messagesEndRef.current.parentElement;
      if (messagesContainer) {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
      }
    }
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);
  const handleVisitFarm = (farm: Farm) => {
    const farmUrl = farm.name.toLowerCase().replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
    navigate(`/order/${farmUrl}`);
  };
  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input.trim(),
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);
    try {
      const response = await generateResponse(input.trim());
      setIsTyping(false);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: response.text,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
      if (response.suggestedFarms && response.suggestedFarms.length > 0) {
        const farmsMessage: Message = {
          id: (Date.now() + 2).toString(),
          type: 'farms',
          content: '',
          timestamp: new Date(),
          suggestedFarms: response.suggestedFarms
        };
        setMessages(prev => [...prev, farmsMessage]);

        // Highlight farms on map if callback is provided
        if (onFarmsHighlight) {
          onFarmsHighlight(response.suggestedFarms);
        }
      }
      if (response.searchQuery && onSearchQuery) {
        onSearchQuery(response.searchQuery);
      }
    } catch (error) {
      console.error('Error generating response:', error);
      setIsTyping(false);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: "I'm sorry, I encountered an error. Please try again.",
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
  return <div className="h-[600px] flex flex-col bg-gradient-to-b from-white via-green-50/30 to-green-100/50 overflow-hidden">
      {/* Messages Container */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto">
          {messages.length > 0 ? <div className="p-4 space-y-1">
              {messages.map(message => <div key={message.id}>
                  {(message.type === 'user' || message.type === 'ai') && <ChatBubble message={message.content} isUser={message.type === 'user'} timestamp={message.timestamp} />}

                  {message.type === 'farms' && message.suggestedFarms && <div className="mb-4 pl-11">
                      <div className="grid gap-3 max-w-md">
                        {message.suggestedFarms.map(farm => <FarmSuggestionCard key={farm.id} farm={farm} onVisitFarm={handleVisitFarm} />)}
                      </div>
                    </div>}
                </div>)}
              
              {/* Typing Indicator */}
              {isTyping && <TypingIndicator />}
              
              <div ref={messagesEndRef} />
            </div> : <div className="flex items-end justify-center pb-8">
              <div className="text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                  🌱
                </div>
                <div>
                  <p className="text-sm text-muted-foreground/70 mb-1">Hi! I'm your AI farm assistant</p>
                  <p className="text-xs text-muted-foreground/50">Ask me about farms, produce, or seasonal recommendations</p>
                </div>
              </div>
            </div>}
        </div>

        {/* Suggestion Chips */}
        {messages.length === 0 && <div className="px-4 pb-3 flex-shrink-0">
            <div className="flex flex-wrap gap-2 justify-center">
              {predefinedSuggestions.slice(0, 3).map((suggestion, index) => <button key={index} onClick={() => setInput(suggestion)} className="px-3 py-1.5 text-xs bg-green-50 hover:bg-green-100 text-green-700 rounded-full border border-green-200 transition-colors">
                  {suggestion}
                </button>)}
            </div>
          </div>}

        {/* Input Area */}
        <div className="flex-shrink-0 p-4 bg-white/60 backdrop-blur-sm border-t border-green-100">
          <div className="relative max-w-2xl mx-auto">
            <div className="flex items-center gap-3 bg-white border border-green-200/60 rounded-full px-5 py-3 shadow-lg focus-within:shadow-xl focus-within:border-green-300 transition-all duration-200">
              <MessageCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
              <Input type="text" placeholder="Message your farm assistant..." value={input} onChange={e => setInput(e.target.value)} onKeyPress={handleKeyPress} className="border-0 bg-transparent p-0 text-sm placeholder:text-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0 flex-1" disabled={isProcessing} />
              <Button onClick={handleSend} disabled={!input.trim() || isProcessing} size="sm" className="rounded-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-md hover:shadow-lg px-4 py-2 h-9 transition-all duration-200">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default ChatInterface;
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User } from "lucide-react";

interface ChatBubbleProps {
  message: string;
  isUser: boolean;
  timestamp: Date;
}

export const ChatBubble = ({ message, isUser, timestamp }: ChatBubbleProps) => {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={`flex items-start gap-3 mb-4 animate-fade-in ${isUser ? 'flex-row-reverse' : ''}`}>
      {/* Avatar */}
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-gradient-green-avatar flex items-center justify-center text-sm flex-shrink-0 shadow-soft">
          🌱
        </div>
      )}
      
      {isUser && (
        <Avatar className="w-8 h-8 flex-shrink-0">
          <AvatarFallback className="bg-muted text-muted-foreground">
            <User className="w-4 h-4" />
          </AvatarFallback>
        </Avatar>
      )}

      {/* Message Bubble */}
      <div className={`max-w-xs lg:max-w-md ${isUser ? 'text-right' : ''}`}>
        <div
          className={`px-4 py-3 rounded-2xl ${
            isUser
              ? 'bg-muted text-foreground rounded-br-md ml-auto border border-primary/10'
              : 'bg-gradient-green-farmer text-foreground rounded-bl-md border border-primary/20'
          }`}
        >
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{message}</p>
        </div>
        
        {/* Timestamp */}
        <p className={`text-xs text-muted-foreground/60 mt-1 ${isUser ? 'text-right' : 'text-left'}`}>
          {formatTime(timestamp)}
        </p>
      </div>
    </div>
  );
};
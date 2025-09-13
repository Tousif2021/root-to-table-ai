export const TypingIndicator = () => {
  return (
    <div className="flex items-start gap-3 mb-4 animate-fade-in">
      {/* Farmer Avatar */}
      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm flex-shrink-0">
        🌱
      </div>
      
      {/* Typing Bubble */}
      <div className="bg-primary/5 border border-primary/10 rounded-2xl rounded-bl-md px-4 py-3 max-w-xs">
        <div className="flex items-center space-x-1">
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  );
};
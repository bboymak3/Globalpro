import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MessageSquare, X, Minimize2, Maximize2 } from 'lucide-react';

export default function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  return (
    <div className="fixed bottom-24 left-6 z-50">
      {/* Chat Window */}
      {isOpen && (
        <div className={`mb-4 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden transition-all duration-300 ${
          isMinimized ? 'w-72 h-14' : 'w-80 md:w-96 h-[500px]'
        }`}>
          {/* Header */}
          <div className="bg-gp-red text-white p-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              <span className="font-semibold text-sm">GlobalChat IA</span>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-1 hover:bg-white/20 rounded transition-colors"
              >
                {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/20 rounded transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          {/* Chat Content */}
          {!isMinimized && (
            <div className="h-[calc(100%-56px)]">
              <iframe
                src="https://llm-chat-app-template.estilosgrado33.workers.dev/"
                className="w-full h-full border-0"
                title="GlobalChat IA"
                allow=" microphone"
              />
            </div>
          )}
        </div>
      )}

      {/* Toggle Button with Aura Effect */}
      <div className="relative">
        {/* Aura/Pulse Effect */}
        {!isOpen && (
          <>
            <div className="absolute inset-0 bg-gp-red rounded-full animate-ping opacity-30" />
            <div className="absolute -inset-2 bg-gp-red/30 rounded-full animate-pulse" />
            <div className="absolute -inset-4 bg-gp-red/20 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
          </>
        )}
        
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className={`relative w-16 h-16 rounded-full shadow-2xl transition-all duration-300 ${
            isOpen 
              ? 'bg-gray-600 hover:bg-gray-700' 
              : 'bg-gp-red hover:bg-gp-red-dark hover:scale-110'
          }`}
        >
          {/* Floating Label */}
          {!isOpen && (
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gp-red text-white text-xs px-2 py-1 rounded-full whitespace-nowrap animate-bounce">
              GlobalChat
            </span>
          )}
          
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <MessageSquare className="w-7 h-7" />
          )}
        </Button>
      </div>
    </div>
  );
}

import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Send, User, Bot, Loader2, Clipboard, ChevronDown, Sparkles } from 'lucide-react';

const ChatPanel = ({ code, messages, setMessages, loading, setLoading }) => {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setLoading(true);

    try {
      const API_URL = import.meta.env.VITE_API_URL || `http://${window.location.hostname}:5000`;
      const response = await axios.post(`${API_URL}/api/chat`, {
        message: currentInput,
        history: messages,
        code: code
      });

      if (response.data.success) {
        setMessages(prev => [...prev, { role: 'assistant', content: response.data.response }]);
      } else {
        setMessages(prev => [...prev, { role: 'assistant', content: 'I encountered an error. Please try again.' }]);
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { role: 'assistant', content: 'Connection error. Is the server running?' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#0d0d0d] text-[#ececec]">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-[#0d0d0d]/80 backdrop-blur-md sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <div className="bg-white/10 p-1.5 rounded-lg border border-white/10">
            <Sparkles className="w-4 h-4 text-purple-400" />
          </div>
          <span className="font-semibold text-sm tracking-tight">AI Assistant</span>
        </div>
        <button className="p-1.5 hover:bg-white/5 rounded-md transition-colors text-white/50 hover:text-white">
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>
      
      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-2 py-4 custom-scrollbar">
        {messages.length === 0 && !loading && (
          <div className="h-full flex flex-col items-center justify-center opacity-40 px-8 text-center space-y-4 pt-20">
            <Bot className="w-12 h-12" />
            <div>
              <p className="text-lg font-medium">How can I help you today?</p>
              <p className="text-sm mt-1">Ask about your code, bugs, or any IT concept.</p>
            </div>
          </div>
        )}
        
        <div className="max-w-3xl mx-auto space-y-8">
          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-4 px-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex gap-4 group max-w-[95%] sm:max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                {/* Avatar */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border ${
                  msg.role === 'user' 
                    ? 'bg-blue-600 border-blue-500 text-white' 
                    : 'bg-[#19c37d] border-[#19c37d] text-white'
                }`}>
                  {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                {/* Content */}
                <div className="flex flex-col space-y-2 flex-1 min-w-0">
                  <div className={`px-4 py-3 rounded-2xl text-[15px] leading-7 shadow-sm ${
                    msg.role === 'user' 
                      ? 'bg-[#2f2f2f] text-white rounded-tr-none' 
                      : 'bg-[#171717] text-[#d1d1d1] rounded-tl-none border border-white/5'
                  }`}>
                    <div className="whitespace-pre-wrap break-words prose prose-invert prose-sm max-w-none">
                      {msg.content}
                    </div>
                  </div>
                  
                  {/* Actions (visible on hover) */}
                  <div className={`flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity px-2 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <button className="text-white/40 hover:text-white transition-colors" title="Copy to clipboard">
                      <Clipboard className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-[10px] text-white/20 font-mono">
                      {msg.role === 'user' ? 'YOU' : 'AI'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {loading && (
            <div className="flex gap-4 px-2 justify-start">
              <div className="w-8 h-8 rounded-full bg-[#19c37d] flex items-center justify-center shrink-0 border border-[#19c37d] text-white">
                <Bot className="w-4 h-4" />
              </div>
              <div className="flex flex-col space-y-2 flex-1">
                <div className="px-4 py-3 rounded-2xl bg-[#171717] border border-white/5 rounded-tl-none">
                   <div className="flex items-center gap-1">
                      <div className="w-1.5 h-1.5 bg-[#d1d1d1] rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                      <div className="w-1.5 h-1.5 bg-[#d1d1d1] rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                      <div className="w-1.5 h-1.5 bg-[#d1d1d1] rounded-full animate-bounce"></div>
                   </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} className="h-4" />
        </div>
      </div>

      {/* Input */}
      <div className="p-4 bg-[#0d0d0d]">
        <div className="max-w-3xl mx-auto relative group">
          <form onSubmit={handleSend}>
            <textarea
              rows="1"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend(e);
                }
              }}
              placeholder="Message AI Assistant..."
              className="w-full bg-[#2f2f2f] text-white text-[15px] rounded-2xl py-3.5 pl-4 pr-12 focus:outline-none focus:ring-1 focus:ring-white/20 transition-all resize-none shadow-xl border border-white/5 scrollbar-none"
              disabled={loading}
              style={{ minHeight: '52px', maxHeight: '200px' }}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white text-black p-2 rounded-xl hover:bg-[#d1d1d1] disabled:bg-white/10 disabled:text-white/20 transition-all shadow-md group-focus-within:ring-2 ring-white/10"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
          <div className="mt-2 text-center">
            <p className="text-[10px] text-white/30 truncate">
              AI can make mistakes. Check important info.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPanel;

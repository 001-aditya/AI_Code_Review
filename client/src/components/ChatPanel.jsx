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
    <div className="flex flex-col h-full bg-[#0d0d0d] text-[#ececec] overflow-hidden relative font-sans">

      <div className="h-14 flex items-center justify-between px-4 border-b border-white/5 bg-[#0d0d0d]/90 backdrop-blur-xl shrink-0 z-20">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 border border-white/10">
            <Sparkles className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <h2 className="text-sm font-bold tracking-tight">AI Assistant</h2>
            <div className="flex items-center gap-1.5 mt-0.5">
              <div className="h-1.5 w-1.5 rounded-full bg-[#19c37d] animate-pulse" />
              <span className="text-[10px] text-white/40 uppercase tracking-widest font-semibold">
                Online
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Messages - Optimized Scroll Area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {messages.length === 0 && !loading && (
          <div className="h-full flex flex-col items-center justify-center space-y-6 opacity-30 select-none">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
              <Bot className="w-12 h-12" />
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold tracking-tight text-white">
                Code सारथी
              </p>
              <p className="text-sm mt-1 text-white/40">
                Chat about code or request a review.
              </p>
            </div>
          </div>
        )}

        <div className="max-w-3xl mx-auto px-4 py-8 space-y-10">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex w-full group ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`flex gap-3 sm:gap-4 max-w-[92%] sm:max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
              >
                <div
                  className={`h-8 w-8 sm:h-9 sm:w-9 rounded-xl flex items-center justify-center shrink-0 border shadow-lg ${
                    msg.role === 'user'
                      ? 'bg-blue-600 border-blue-500'
                      : 'bg-[#19c37d] border-[#19c37d]'
                  }`}
                >
                  {msg.role === 'user' ? (
                    <User className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  ) : (
                    <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  )}
                </div>

                {/* Content with Perfect Spacing */}
                <div
                  className={`flex flex-col gap-2 min-w-0 ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`px-4 py-3 rounded-2xl text-[14px] sm:text-[15px] leading-relaxed shadow-xl break-words transition-all ${
                      msg.role === 'user'
                        ? 'bg-[#2f2f2f] text-white rounded-tr-none'
                        : 'bg-[#171717] text-[#d1d1d1] rounded-tl-none border border-white/5'
                    }`}
                  >
                    <div className="whitespace-pre-wrap overflow-hidden prose prose-invert prose-sm max-w-none">
                      {msg.content}
                    </div>
                  </div>

                  {/* Action Bar */}
                  <div
                    className={`flex items-center gap-3 px-2 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                  >
                    <button
                      className="p-1 rounded-md text-white/20 hover:text-white hover:bg-white/5 transition-all"
                      onClick={() => navigator.clipboard.writeText(msg.content)}
                      title="Copy"
                    >
                      <Clipboard className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-[10px] text-white/20 font-bold uppercase tracking-tighter">
                      {msg.role === 'user' ? 'You' : 'AI'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex gap-3 sm:gap-4 justify-start">
              <div className="h-8 w-8 sm:h-9 sm:w-9 rounded-xl bg-[#19c37d] border border-[#19c37d] flex items-center justify-center shrink-0 shadow-lg">
                <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div className="px-4 py-4 rounded-2xl bg-[#171717] border border-white/5 rounded-tl-none flex items-center gap-1.5 shadow-xl">
                <div className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce"></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} className="h-10" />
        </div>
      </div>

      {/* Input Section - Refined Floating Layout */}
      <div className="shrink-0 bg-[#0d0d0d] border-t border-white/5 px-4 pb-8 pt-4">
        <div className="max-w-3xl mx-auto relative group">
          <form
            onSubmit={handleSend}
            className="relative flex items-end gap-2 bg-[#2f2f2f] rounded-2xl p-1.5 border border-white/5 transition-all focus-within:border-white/20 shadow-2xl"
          >
            <textarea
              rows="1"
              value={input}
              onChange={(e) => {
                setInput(e.target.value)
                e.target.style.height = 'inherit'
                e.target.style.height = `${e.target.scrollHeight}px`
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  handleSend(e)
                  e.target.style.height = '42px'
                }
              }}
              placeholder="Type your message..."
              className="flex-1 bg-transparent text-white text-[15px] py-3 pl-3 pr-2 focus:outline-none resize-none max-h-40 min-h-[42px] custom-scrollbar"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="h-10 w-10 flex items-center justify-center shrink-0 bg-blue-500 text-white rounded-xl hover:bg-blue-400 disabled:bg-white/5 disabled:text-white/10 transition-all active:scale-95 shadow-lg border border-blue-400/20"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
          <div className="mt-2.5 text-center hidden sm:block">
            <p className="text-[10px] text-white/20 font-medium tracking-tight uppercase">
              AI Assistant • Secure Development Environment
            </p>
          </div>
        </div>
      </div>
    </div>
  )
};

export default ChatPanel;

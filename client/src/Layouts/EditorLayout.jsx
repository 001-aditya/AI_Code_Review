import { useState, useEffect } from 'react';
import CodeEditor from '../components/CodeEditor'
import Terminal from '../components/Terminal';
import ChatPanel from '../components/ChatPanel';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels'
import { Code, Terminal as TerminalIcon, Sparkles } from 'lucide-react';

const EditorLayout = ({
  code,
  setCode,
  input,
  setInput,
  output,
  setOutput,
  loading,
  language,
  messages,
  setMessages,
  aiLoading,
  setAiLoading
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const [activeTab, setActiveTab] = useState('code'); // 'code', 'terminal', 'ai'
  const [direction, setDirection] = useState('horizontal');

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 640);
      setDirection(width < 1024 ? 'vertical' : 'horizontal');
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (isMobile) {
    return (
      <div className="h-full flex flex-col bg-gray-900 text-white overflow-hidden">
        {/* Tab Content */}
        <div className="flex-1 overflow-hidden relative">
          {activeTab === 'code' && (
            <div className="h-full">
              <CodeEditor code={code} setCode={setCode} language={language} />
            </div>
          )}

          {activeTab === 'terminal' && (
            <div className="h-full overflow-auto bg-black p-4">
              <Terminal
                input={input}
                setInput={setInput}
                output={output}
                loading={loading}
              />
            </div>
          )}

          {activeTab === 'ai' && (
            <div className="h-full bg-[#0d0d0d]">
              <ChatPanel 
                code={code} 
                messages={messages} 
                setMessages={setMessages} 
                loading={aiLoading} 
                setLoading={setAiLoading} 
              />
            </div>
          )}
        </div>

        {/* Mobile Tab Bar */}
        <div className="flex bg-slate-950 border-t border-gray-800 h-16 shrink-0">
          <button
            onClick={() => setActiveTab('code')}
            className={`flex-1 flex flex-col items-center justify-center gap-1 transition-colors ${activeTab === 'code' ? 'text-blue-400 bg-blue-400/5' : 'text-gray-500 hover:text-gray-300'}`}
          >
            <Code className="w-5 h-5" />
            <span className="text-[10px] font-medium uppercase tracking-wider">Editor</span>
          </button>

          <button
            onClick={() => setActiveTab('terminal')}
            className={`flex-1 flex flex-col items-center justify-center gap-1 transition-colors ${activeTab === 'terminal' ? 'text-green-400 bg-green-400/5' : 'text-gray-500 hover:text-gray-300'}`}
          >
            <TerminalIcon className="w-5 h-5" />
            <span className="text-[10px] font-medium uppercase tracking-wider">Terminal</span>
          </button>

          <button
            onClick={() => setActiveTab('ai')}
            className={`flex-1 flex flex-col items-center justify-center gap-1 transition-colors ${activeTab === 'ai' ? 'text-purple-400 bg-purple-400/5' : 'text-gray-500 hover:text-gray-300'}`}
          >
            <Sparkles className="w-5 h-5" />
            <span className="text-[10px] font-medium uppercase tracking-wider">AI Assistant</span>
          </button>
        </div>
      </div>
    );
  }

  // Desktop/Tablet view (resizable layout)
  return (
    <div style={{ height: '100%', width: '100%' }} className="bg-gray-900 text-white overflow-hidden">
      <PanelGroup direction={direction} style={{ height: '100%' }}>
        <Panel defaultSize={direction === 'horizontal' ? 70 : 65} minSize={20}>
          <PanelGroup direction="vertical" style={{ height: '100%' }}>
            <Panel defaultSize={70} minSize={20}>
              <div className="h-full bg-slate-900 border-r border-gray-700 font-mono">
                <CodeEditor code={code} setCode={setCode} language={language} />
              </div>
            </Panel>

            <PanelResizeHandle className="h-1 bg-gray-700 hover:bg-blue-500 transition-colors cursor-row-resize" />

            <Panel defaultSize={40} minSize={10}>
              <div className="h-full overflow-auto bg-black p-4 border-r border-gray-700">
                <Terminal
                  input={input}
                  setInput={setInput}
                  output={output}
                  loading={loading}
                />
              </div>
            </Panel>
          </PanelGroup>
        </Panel>

        <PanelResizeHandle
          className={direction === 'horizontal' ? "w-1 bg-gray-700 hover:bg-blue-500 transition-colors cursor-col-resize" : "h-1 bg-gray-700 hover:bg-blue-500 transition-colors cursor-row-resize"}
        />

        <Panel defaultSize={direction === 'horizontal' ? 30 : 35} minSize={15}>
          <div className={`h-full flex flex-col bg-[#0d0d0d] ${direction === 'horizontal' ? 'border-l border-white/10' : 'border-t border-white/10'}`}>
            <ChatPanel 
              code={code} 
              messages={messages} 
              setMessages={setMessages} 
              loading={aiLoading} 
              setLoading={setAiLoading} 
            />
          </div>
        </Panel>
      </PanelGroup>
    </div>
  )
}

export default EditorLayout

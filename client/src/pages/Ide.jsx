import { useState } from 'react'
import axios from 'axios'
import CodeNav from '../components/CodeNav'
import EditorLayout from '../Layouts/EditorLayout'

const Ide = () => {
  // editor code state
  const [code, setCode] = useState('// Write your code here...\nconsole.log("Hello, World!");')

  // selected language
  const [language, setLanguage] = useState('javascript')

  // terminal input
  const [input, setInput] = useState('')

  // execution output
  const [output, setOutput] = useState('')

  // execution loading state
  const [loading, setLoading] = useState(false)

  // AI Chat state
  const [messages, setMessages] = useState([])
  const [aiLoading, setAiLoading] = useState(false)

  const API_URL = import.meta.env.VITE_API_URL || `http://${window.location.hostname}:5000`;

  const runCode = async () => {
    setLoading(true)
    setOutput('')
    try {
      const response = await axios.post(`${API_URL}/api/execute`, {
        language,
        code
      })

      if (response.data.success) {
        const { stdout, stderr, compile_output } = response.data.result
        setOutput(stdout || stderr || compile_output || 'Program executed successfully (no output).')
      } else {
        setOutput('Error: ' + response.data.message)
      }
    } catch (error) {
       setOutput('Execution error: ' + (error.response?.data?.message || error.message))
    } finally {
      setLoading(false)
    }
  }

  const reviewCode = async () => {
    if (aiLoading) return;
    setAiLoading(true);
    
    // Add user message to history
    const userMsg = { role: 'user', content: "Please review my code." };
    setMessages(prev => [...prev, userMsg]);

    try {
      const response = await axios.post(`${API_URL}/api/review`, {
        code
      })
      if (response.data.success) {
        setMessages(prev => [...prev, { role: 'assistant', content: response.data.review }]);
      } else {
        setMessages(prev => [...prev, { role: 'assistant', content: 'Review error: ' + response.data.message }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Review error: ' + (error.response?.data?.message || error.message) }]);
    } finally {
      setAiLoading(false)
    }
  }

  return (
    <div className="h-[calc(100vh-64px)] flex flex-col">
      <CodeNav
        language={language}
        setLanguage={setLanguage}
        loading={loading}
        onRun={runCode}
        onReview={reviewCode}
        reviewLoading={aiLoading}
      />

      <div className="flex-1 overflow-hidden">
        <EditorLayout
          code={code}
          setCode={setCode}
          input={input}
          setInput={setInput}
          output={output}
          setOutput={setOutput}
          loading={loading}
          language={language}
          messages={messages}
          setMessages={setMessages}
          aiLoading={aiLoading}
          setAiLoading={setAiLoading}
        />
      </div>
    </div>
  )
}

export default Ide

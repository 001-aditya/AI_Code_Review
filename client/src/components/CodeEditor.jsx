import { useState, useEffect } from "react";
import MonacoEditor from "@monaco-editor/react";

const CodeEditor = ({code, setCode, language}) => {
  const [fontSize, setFontSize] = useState(18);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) setFontSize(14);
      else if (width < 1024) setFontSize(16);
      else setFontSize(18);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return(
    <div className="h-full">
      <MonacoEditor
        height="100%"
        value={code}
        language={language}
        theme="vs-dark"
        onChange={(value) => (setCode(value || ""))}
        options={{
          fontSize: fontSize,
          minimap: {enabled: false},
          lineNumbers: "on",
          wordWrap: "on",
          automaticLayout: true,
        }}
      />
    </div>
  )
}

export default CodeEditor;

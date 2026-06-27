const Terminal = ({
  input,
  setInput,
  output,
  loading,
}) => {
  return (
    <div className="h-full bg-black text-white font-mono p-3 overflow-y-auto flex flex-col">
      {/* Terminal Header */}
      <div className="border-b border-gray-700 pb-2 mb-3 shrink-0">
        <p className="text-green-400">Terminal</p>
      </div>

      <div className="mb-4 shrink-0">
        <p className="text-yellow-400 mb-2">Input</p>

        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter program input here..."
          className="
            w-full
            h-24
            bg-gray-900
            text-white
            border
            border-gray-700
            rounded
            p-2
            resize-none
            outline-none
          "
        />
      </div>

      {/* Output Section */}
      <div className="flex-1 flex flex-col min-h-0">
        <p className="text-blue-400 mb-2 shrink-0">Output</p>

        <div
          className="
            flex-1
            overflow-y-auto
            bg-gray-900
            border
            border-gray-700
            rounded
            p-2
            whitespace-pre-wrap
          "
        >
          {loading ? (
            <p className="text-green-400">Executing...</p>
          ) : (
            <p>{output}</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Terminal;

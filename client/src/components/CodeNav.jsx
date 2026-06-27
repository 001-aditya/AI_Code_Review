import { useNavigate } from "react-router-dom";
import { Play, Search, ChevronDown } from 'lucide-react';

const CodeNav = ({ language, setLanguage, loading, onRun, onReview, reviewLoading }) => {
  const navigate = useNavigate();

  return (
    <nav className="bg-black border-b border-white/10 px-2 sm:px-4 shrink-0">
      <div className="flex items-center justify-between h-14 max-w-7xl mx-auto gap-2">
        <div className="flex items-center">
          <div className="relative group">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="appearance-none bg-white/5 text-white/90 text-xs sm:text-sm font-medium pl-3 pr-7 py-1.5 rounded-lg border border-white/10 focus:outline-none focus:border-white/30 cursor-pointer transition-all hover:bg-white/10"
            >
              <option value="javascript" className="bg-slate-900 text-white">JavaScript</option>
              <option value="python" className="bg-slate-900 text-white">Python</option>
              <option value="cpp" className="bg-slate-900 text-white">C++</option>
            </select>
            <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 text-white/40 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none group-hover:text-white/60 transition-colors" />
          </div>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-3">
          <button
            onClick={onReview}
            disabled={reviewLoading}
            className={`flex items-center gap-2 px-2.5 py-1.5 sm:px-4 rounded-lg transition-all text-xs sm:text-sm font-bold shadow-lg ${
              reviewLoading
                ? 'bg-purple-900/50 text-white/50 cursor-not-allowed'
                : 'bg-purple-600 hover:bg-purple-500 text-white shadow-purple-500/20 active:scale-95'
            }`}
          >
            <Search className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${reviewLoading ? 'animate-pulse' : ''}`} />
            <span className="hidden min-[400px]:inline sm:inline">{reviewLoading ? '...' : 'Review'}</span>
          </button>

          <button
            onClick={onRun}
            disabled={loading}
            className={`flex items-center gap-2 px-2.5 py-1.5 sm:px-4 rounded-lg transition-all text-xs sm:text-sm font-bold shadow-lg ${
              loading
                ? 'bg-green-900/50 text-white/50 cursor-not-allowed'
                : 'bg-green-600 hover:bg-green-500 text-white shadow-green-500/20 active:scale-95'
            }`}
          >
            <Play className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${loading ? 'animate-spin' : ''}`} />
            <span className="hidden min-[400px]:inline sm:inline">{loading ? '...' : 'Run'}</span>
          </button>
        </div>
      </div>
    </nav>
  )
}

export default CodeNav;

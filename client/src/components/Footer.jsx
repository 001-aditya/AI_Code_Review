import { Link } from 'react-router-dom'
import { Code2 } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-slate-900/50 border-t border-gray-800 py-8 ">
      <div className="max-w-6xl mt-10 mx-auto px-4 flex flex-col justify-between items-center gap-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <Code2 className="w-6 h-6 text-white" />
          <span className="text-xl font-bold text-white">
            CodeReview<span className="text-gray-400">AI</span>
          </span>
        </Link>


      </div>

      {/* Bottom */}
      <div className="mt-6 text-center text-gray-500 text-sm">
        © 2026 CodeReviewAI. All Rights Reserved.
      </div>
    </footer>
  )
}

export default Footer

import { useNavigate } from "react-router-dom";
import Type from "../components/type";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-[calc(100vh-64px)] flex items-center justify-center overflow-hidden bg-gray-600/25 pb-10">




      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl mx-auto">
        <div className="mb-8 mt-40">
          <Type />
        </div>

        <h2 className="text-xl md:text-2xl text-gray-400 mb-10 max-w-2xl leading-relaxed">
          Elevate your development workflow with high-speed execution and
          AI-powered code reviewer system.
        </h2>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => navigate('/ide')}
            className="btn-primary text-xl font-bold px-10 py-4 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all cursor-pointer"
          >
            Get Started
          </button>
          <button
            onClick={() => navigate("/about")}
           className="bg-transparent border border-gray-700 hover:border-blue-500 text-white text-xl font-bold px-10 py-4 rounded-lg transition-all cursor-pointer">
            Learn More
          </button>
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div className="p-6 bg-gray-900/50 rounded-xl border border-gray-800 backdrop-blur-sm">
            <h3 className="text-blue-400 font-bold mb-2">Fast Execution</h3>
            <p className="text-sm text-gray-400">
              Run code in JavaScript, Python, and C++ with real-time output
              using Judge0.
            </p>
          </div>
          <div className="p-6 bg-gray-900/50 rounded-xl border border-gray-800 backdrop-blur-sm">
            <h3 className="text-purple-400 font-bold mb-2">AI Insights</h3>
            <p className="text-sm text-gray-400">
              Get deep code reviews, bug detection, and performance tips from
              Groq AI.
            </p>
          </div>
          <div className="p-6 bg-gray-900/50 rounded-xl border border-gray-800 backdrop-blur-sm">
            <h3 className="text-green-400 font-bold mb-2">Easy Access</h3>
            <p className="text-sm text-gray-400">
              Start reviewing your code immediately without any login or
              registration required.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Home;

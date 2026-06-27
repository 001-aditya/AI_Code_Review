

const About = () => {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-600/25 text-white px-6 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold  mb-8">
          About AI Code Reviewer
        </h1>

        <section className="mb-12">
          <p className="text-xl text-zinc-400 leading-relaxed mb-6">
            AI Code Reviewer is a cutting-edge platform designed to help developers write better, more efficient, and bug-free code. By combining the power of real-time code execution with advanced AI-driven analysis, we provide a seamless environment for both coding and learning.
          </p>
        </section>

        <h2 className="text-3xl font-bold mb-6">How to Use</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800 backdrop-blur-sm">
            <div className="text-zinc-400 text-2xl font-bold mb-4">01.</div>
            <h3 className="text-xl font-bold mb-2">Write Your Code</h3>
            <p className="text-gray-400">
              Select your preferred language (JavaScript, Python, or C++) and start coding in our full-featured code editor.
            </p>
          </div>

          <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800 backdrop-blur-sm">
            <div className="text-zinc-400 text-2xl font-bold mb-4">02.</div>
            <h3 className="text-xl font-bold mb-2">Run & Debug</h3>
            <p className="text-gray-400">
              Click the 'Run' button to execute your program. View detailed output and errors in the built-in terminal.
            </p>
          </div>

          <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800 backdrop-blur-sm">
            <div className="text-zinc-400 text-2xl font-bold mb-4">03.</div>
            <h3 className="text-xl font-bold mb-2">AI Review</h3>
            <p className="text-gray-400">
              Click 'Get Review' to receive instant feedback and Get insights on bugs, optimization, and best practices.
            </p>
          </div>

          <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800 backdrop-blur-sm">
            <div className="text-zinc-400 text-2xl font-bold mb-4">04.</div>
            <h3 className="text-xl font-bold mb-2">No Account Needed</h3>
            <p className="text-gray-400">
              Enjoy all the features of AI Code Reviewer immediately without needing to create an account.
            </p>
          </div>
        </div>

        <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
        <p className="text-lg text-zinc-400 leading-relaxed italic border-l-4 border-purple-500 pl-6">
          "Our mission is to democratize high-quality code reviews and fast execution environments, making it easier for developers everywhere to build the future, one bug-free line at a time."
        </p>
      </div>
    </div>
  );
};

export default About;

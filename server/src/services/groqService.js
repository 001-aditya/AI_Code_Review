const Groq = require("groq-sdk");

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const getCodeReview = async (code) => {
  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are an expert code reviewer. Analyze the provided code for bugs, performance issues, and best practices. Provide a helpful and professional review."
        },
        {
          role: "user",
          content: `Please review this code:\n\n${code}`
        }
      ],
      model: "llama-3.3-70b-versatile",
    });

    return chatCompletion.choices[0]?.message?.content || "No review generated.";
  } catch (err) {
    console.error('Groq error:', err.message);
    throw err;
  }
};

const getChatResponse = async (message, history, code) => {
  try {
    const messages = [
      {
        role: "system",
        content: `You are an expert AI software developer and technical assistant. 
        Your primary focus is assisting with code, software architecture, debugging, and general Information Technology topics.
        
        STRICT RULES:
        1. ONLY answer questions related to Information Technology (IT), software development, coding, computer science, and related technical domains.
        2. If a user asks a question that is OUTSIDE the IT domain (e.g., about cooking, history, sports, personal advice, etc.), politely decline and state that you are only programmed to discuss IT and software development topics.
        3. Use the provided code context to give specific answers if relevant.
        4. Be concise and professional.`
      },
      {
        role: "user",
        content: `Here is the current code for context:\n\`\`\`\n${code}\n\`\`\``
      },
      ...history,
      {
        role: "user",
        content: message
      }
    ];

    const chatCompletion = await groq.chat.completions.create({
      messages,
      model: "llama-3.3-70b-versatile",
    });

    return chatCompletion.choices[0]?.message?.content || "I couldn't generate a response.";
  } catch (err) {
    console.error('Groq Chat error:', err.message);
    throw err;
  }
};

module.exports = { getCodeReview, getChatResponse };

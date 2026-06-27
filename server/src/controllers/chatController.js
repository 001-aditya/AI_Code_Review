const { getChatResponse } = require('../services/groqService');

const chatController = async (req, res) => {
  try {
    const { message, history, code } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        message: 'Message is required'
      });
    }

    const response = await getChatResponse(message, history || [], code || '');

    res.status(200).json({
      success: true,
      response
    });

  } catch (error) {
    console.error('Chat Controller error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Internal server error during chat'
    });
  }
};

module.exports = chatController;

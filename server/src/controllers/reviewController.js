const { getCodeReview } = require('../services/groqService');

const reviewController = async (req, res) => {
  try {
    const { code } = req.body;

    if (!code) {
      return res.status(400).json({
        success: false,
        message: 'Code is required'
      });
    }

    const review = await getCodeReview(code);

    res.status(200).json({
      success: true,
      review
    });

  } catch (error) {
    console.error('Controller error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Internal server error during code review'
    });
  }
};

module.exports = reviewController;

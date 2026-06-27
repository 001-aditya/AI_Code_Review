const axios = require('axios');

const submitCode = async (code, language_id) => {
  try {
    const options = {
      method: 'POST',
      url: process.env.JUDGE0_API_HOST 
        ? `https://${process.env.JUDGE0_API_HOST}/submissions/?base64_encoded=false&wait=true`
        : 'https://ce.judge0.com/submissions/?base64_encoded=false&wait=true',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        source_code: code,
        language_id: language_id,
      }
    };

    if (process.env.JUDGE0_API_KEY) {
      options.headers['X-RapidAPI-Key'] = process.env.JUDGE0_API_KEY;
      options.headers['X-RapidAPI-Host'] = process.env.JUDGE0_API_HOST || 'judge0-ce.p.rapidapi.com';
    }

    const response = await axios.request(options);
    return response.data;

  } catch (err) {
    console.log('Judge0 error:', err.response?.data || err.message);
    throw err;
  }
};

module.exports = submitCode;

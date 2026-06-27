const submitCode = require('../services/judge0Service');
const languageMap = require('../utils/languageMap');

const executefunction = async function(req, res){

 try{
  const {language, code} = req.body;

  // validation
  if(!language || !code){
    return res.status(400).json({
      success: false,
      message: 'language and code are required'
    });
  };

  const language_id = languageMap[language];

  // now checking language exist in map or not

  if (!language_id){
    return res.status(400).json({
      success:false,
      message: 'unsupported language'
    });
  };

  // now call judge0 service

   const result = await submitCode(code, language_id);

   // now send final result
    res.status(200).json({
      success: true,
      result,
    })

 } catch (error){
  console.log('Controller error:', error.message);
  res.status(500).json({
    success: false,
    message: 'internal server error'
  });
 };

};

module.exports = executefunction;

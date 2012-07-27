
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
  console.log('-------------------'+req.sessionID);
  console.log(req.session.value);
};
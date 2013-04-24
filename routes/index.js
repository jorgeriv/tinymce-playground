
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { ptitle: 'TinyMCE - jquery, require, underscore, backbone', dtitle : 'TinyMCE Playground' });
};
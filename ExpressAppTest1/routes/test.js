var express = require('express');
var router = express.Router();

/* GET test page. */
router.get('/', function(req, res, next) {
    res.render('test', { output: ""});
});

/* GET test page. */
router.get('/:id', function(req, res, next) {
    res.render('test', { output: req.params.id});
});

/* POST test page. */
router.post('/submit', function(req, res, next) {
    var id = req.body.id;
    res.redirect('/test/' + id);
});

module.exports = router;
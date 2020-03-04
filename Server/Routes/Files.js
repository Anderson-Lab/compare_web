var Express = require('express');

var router = Express.Router({caseSensitive: true});


router.baseURL = '/Files';
router.get("/", (req, res) => {
   res.status(200).send({express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT'});
});

module.exports = router;

const express = require('express');

const router = express.Router();

router.get('/creatediscussion', (req,res) => {
    res.render('discussions/add');
})

module.exports = router;
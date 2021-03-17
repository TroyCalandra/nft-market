const express = require('express');
const router = express.Router();

router.get('/health', (req, res) => { 
    res.status(200).send({status: 200, message: 'success'})
})

module.exports = router;
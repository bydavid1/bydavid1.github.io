const express = require("express");
const router = express.Router();
const path = require('path')

router.get("/", async (req, res) => {
    res.sendFile(path.join(__dirname, '../public/portfolio.html'))
});

module.exports = router;
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const router = express.Router();

const hardCodedCredentials = {
    username: "naval.ravikant",
    password: "05111974"
};

router.post("/login", (req, res) => {
    const { username, password } = req.body;
    if (username === hardCodedCredentials.username && password === hardCodedCredentials.password) {
        const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: "1h" });
        return res.status(200).json({ JWT: token });
    }
    return res.status(401).json({ error: "Invalid credentials" });
});

module.exports = router;

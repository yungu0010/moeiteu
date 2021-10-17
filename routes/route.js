const express = require('express');

const auth = require('./auth');
const login = auth.login;
const signup = auth.signup;
const isAuth = auth.isAuth;

const router = express.Router();

router.post('/login', login);
router.post('/signup', signup);

router.get('/private', isAuth);
router.get('/public', (req, res, next) => {
    res.status(200).json({ message: "here is your public resource" });
});

// will match any other path
router.use('/', (req, res, next) => {
    res.status(404).json({error : "page not found"});
});

module.exports=router;
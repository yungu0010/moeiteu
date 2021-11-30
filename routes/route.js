const express = require('express');

const auth = require('./auth');
const login = auth.login;
const signup = auth.signup;
const isAuth = auth.isAuth;
const getMountain = auth.getMountain;

const user = require('./user');
const follow = user.follow;
const unfollow = user.unfollow;
const search = user.search;
const badge = user.badge;

const rate = require('./mntrate');
const userRate = rate.userRate;

const router = express.Router();

router.post('/login', login);
router.post('/signup', signup);

router.post('/follow', follow);
router.post('/unfollow', unfollow);
router.post('/search', search);
router.post('/badge', badge);

router.post('/rate', userRate);

router.get('/main',getMountain);

router.get('/private', isAuth);
router.get('/public', (req, res, next) => {
    res.status(200).json({ message: "here is your public resource" });
});

router.use('/', (req, res, next) => {
    res.status(404).json({error : "page not found"});
});

module.exports=router;
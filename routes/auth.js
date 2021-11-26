//const bcrypt = require('bcrypt');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../src/server/models/user');
const Mountain = require('../src/server/models/mountain');
// const { Sequelize } = require('sequelize/types');

const signup = (req, res, next) => {
   
    // 이미 메일이 있으면 409 아니라면 비밀번호 암호화
    User.findOne({ where : {
        email: req.body.email, 
    }})
    .then(dbUser => {
        if (dbUser) {
            return res.status(409).json({message: "email already exists"});
        } else if (req.body.email && req.body.password) {
            // password hash
            bcryptjs.hash(req.body.password, 12, (err, passwordHash) => {
                if (err) {
                    return res.status(500).json({message: "couldnt hash the password"}); 
                } else if (passwordHash) {
                    // DB User 모델에 사용자 추가
                    return User.create(({
                        user_img: "img",
                        username: req.body.name,
                        password: passwordHash,
                        email: req.body.email,
                        total_altitude: 0.0,
                        provider: 'local',
                    }))
                    .then(() => {
                        res.status(200).json({message: "user created"});
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(502).json({message: "error while creating the user"});
                    });
                };
            });
        } else if (!req.body.password) {
            return res.status(400).json({message: "password not provided"});
        } else if (!req.body.email) {
            return res.status(400).json({message: "email not provided"});
        };
    })
    .catch(err => {
        console.log('error', err);
    });
};

const login = (req, res, next) => {
    
    // User 모델에서 해당 사용자를 찾고 없으면 404 
    User.findOne({ where : {
        email: req.body.email, 
    }})
    .then(dbUser => {
        if (!dbUser) {
            return res.status(404).json({message: "user not found"});
        } else {
            // password hash
            bcryptjs.compare(req.body.password, dbUser.password, (err, compareRes) => {
                if (err) { 
                    res.status(502).json({message: "error while checking user password"});
                } else if (compareRes) { // 비밀번호 일치할때
                    const token = jwt.sign({ email: req.body.email }, 'secret', { expiresIn: '1h' });
                    res.status(200).json({message: "user logged in", "token": token});
                } else {                // 비밀번호 틀렸을때
                    res.status(401).json({message: "invalid credentials"});
                };
            });
        };
    })
    .catch(err => {
        console.log('error', err);
    });
};

const isAuth = (req, res, next) => {
    const authHeader = req.get("Authorization");
    if (!authHeader) {
        return res.status(401).json({ message: 'not authenticated' });
    };
    const token = authHeader.split(' ')[1];
    let decodedToken; 
    try {
        decodedToken = jwt.verify(token, 'secret');
    } catch (err) {
        return res.status(500).json({ message: err.message || 'could not decode the token' });
    };
    if (!decodedToken) {
        res.status(401).json({ message: 'unauthorized' });
    } else {
        res.status(200).json({ message: 'here is your resource' });
    };
};

const getMountain=(req,res,next)=>{
    //거리구하는 sql문
    // SELECT name,
    //        6371*acos(cos(radians(유저현재위도))*cos(radians(목표위도))*cos(radians(목표경도)-radians(현재경도))+sin(radians(현재위도))*sin(radians(목표위도)))) AS distance
    // FROM moeiteu.mountain
    // HAVING distance <=0.1  //현재위치로부터 100미터이내
    // ORDER BY distance;
    //이 sql문을 어찌 시퀄라이즈 쿼리로 바꾸노...

// 아래의 sequelize.literal에 req의 유저현재위도,경도 어떻게 해야 넣을수 있을까?
// having절을 시퀄라이즈로 어찌바꾸지?
    Mountain.findAll({
        attributes:[["name"],[Sequelize.literal("6371*acos(cos(radians(유저현재위도))*cos(radians(목표위도))*cos(radians(목표경도)-radians(현재경도))+sin(radians(현재위도))*sin(radians(목표위도)))"),"distance"],],
        where: {
            // having distance<=0.1;
        },
        order: [["distance"]],
    })//산을 찾는코드, 주변 약 100m이내에 산이 있을때?
    //주변에 산이있다는 where 절 어찌하누...?
    .then(Mountain=>{
        if(Mountain){
            //여러개의 산중 가장 가까운산을 특정짓기
            res.status(200).json({message: "산을 찾았다."});//res의 상태와 리턴은 무슨차이지?
            return //weathersetting.js 페이지로 산이름 넣기 
        }
        else{
            //주변에 산이없는것
        }
    }); // 조회
};

module.exports = { signup, login, isAuth, getMountain};
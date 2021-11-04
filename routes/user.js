const User = require('../src/server/models/user');
let myId;

const search = (req,res,next)=>{

    User.findOne({where: {email: req.body.mymail}})
    .then(user=>{myId=user.id})

    User.findOne({where: {email: req.body.searchemail}}) //Follow에서 바디에 friend 객체
    .then(dbUser => {
        if (!dbUser) {
            // 찾는 친구 메일이 없다면
            return res.status(404).json({message: "user not found"});
        } else {
            // 찾는 친구 메일이 있다면 email과 follower 여부 관계 보냄

            let flag = true;
            // 팔로우 상태인지 아닌지 판단하는 코드

            res.status(200).json({"email": dbUser.email, "follow": flag});


            console.log("find friends success")
        }
    })
}

const follow = (req,res,next) => {

    User.findOne({where: {email: req.body.mymail}})
    .then(user=>{myId=user.id})

    User.findOne({where: {email: req.body.searchemail}}) 
    .then( async(dbUser) => {
        if (!dbUser) {
            // 찾는 친구 메일이 없다면
            return res.status(404).json({message: "user not found"});
        } else {
            // 찾는 친구 메일이 있다면 email과 follower 여부 관계 보냄
            await dbUser.addFollowing(parseInt(dbUser.isSoftDeleted, 10));
            res.status(200).json({message:success});
        }
    })
}

const unfollow =(req, res, next) => {

    User.findOne({where: {email: req.body.mymail}})
    .then(user=>{myId=user.id})

    User.findOne({where: {email: req.body.searchemail}}) 
    .then(async(dbUser) => {
        if (!dbUser) {
            // 찾는 친구 메일이 없다면
            return res.status(404).json({message: "user not found"});
        } else {
            // 찾는 친구 메일이 있다면 email과 follower 여부 관계 보냄
            await dbUser.removeFollowing(parseInt(myId, 10));
            res.status(200).json({message:success});
        }
    })
}

module.exports = {search,follow, unfollow};
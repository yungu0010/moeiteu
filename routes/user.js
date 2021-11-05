const User = require('../src/server/models/user');
let mine;

const search = (req,res,next)=>{
    mine= req.body.myId
    User.findOne({where: {email: req.body.searchemail}}) //Follow에서 바디에 friend 객체
    .then(dbUser => {
        if (!dbUser) {
            // 찾는 친구 메일이 없다면
            return res.status(404).json({message: "user not found"});
        } else {
            // 찾는 친구 메일이 있다면 email과 follower 여부 관계 보냄

            // !!! 추가 : 팔로우 상태인지 아닌지 판단하는 코드 (일단 임의로 둠) > 모델 User 가서 뒤적거려야 할거같아
            let flag = false; 

            res.status(200).json({"email": dbUser.email, "follow": flag});


            console.log("find friends success")
        }
    })
}

const follow = (req,res,next) => {
    mine= req.body.myId
    User.findOne({where: {email: req.body.searchemail}}) 
    .then( async(dbUser) => {
        if (!dbUser) {
            // 찾는 친구 메일이 없다면
            return res.status(404).json({message: "user not found"});
        } else {
            // 찾는 친구 메일이 있다면 email과 follower 여부 관계 보냄
            await dbUser.addFollowing(parseInt(mine, 10));
            res.status(200).json({message:"success"});
        }
    })
}

const unfollow =(req, res, next) => {
    mine= req.body.myId // 내 아이디
    User.findOne({where: {email: req.body.searchemail}}) 
    .then(async(dbUser) => {
        if (!dbUser) {
            // 찾는 친구 메일이 없다면
            return res.status(404).json({message: "user not found"});
        } else {
            // 찾는 친구 메일이 있다면 email과 follower 여부 관계 보냄
            await dbUser.removeFollowing(parseInt(mine, 10));
            res.status(200).json({message:"success"});
        }
    })
}

module.exports = {search,follow, unfollow};
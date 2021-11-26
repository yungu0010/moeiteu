const User = require('../src/server/models/user');
const Follow = require('../src/server/models/follow');
const Rating=require('../src/server/models/rating');

let mine;

const search = (req,res,next)=>{
    mine= req.body.myId
    User.findOne({where: {email: req.body.searchemail}}) //Follow에서 바디에 friend 객체
    .then((dbUser) => {
        if (!dbUser) {
            // 찾는 친구 메일이 없다면
            return res.status(404).json({message: "user not found"});
        } else {
            // 찾는 친구 메일이 있다면 email과 follower 여부 관계 보냄
            const friendId=dbUser.id
            Follow.findOne({where:{followerId:friendId, followingId:mine} })
            .then((follow)=>{
                console.log(follow)
                if (!follow){  // 팔로우 관계가 아니라면
                    res.status(200).json({"email": dbUser.email, "follow": false});
                }
                else{ 
                    res.status(200).json({"email": dbUser.email, "follow": true }); 
                }
            })
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

const getBadge=(req,res,next)=>{
    mine=1;
    Rating.findAll({where: {UserId : mine}})
    .then(async(dbBadge)=>{
        if(dbBadge.length==0){
            return res.status(404).json({message: "you have no badges"});
        }else{
            res.status(200).json(dbBadge);
            //dbBadge.map( badge =>{
              //  res.status(200).json({"mountain": badge.mountain_id, "user": UserId});
            //});
            
        }
        return res.end();
    })

}

module.exports = {search,follow, unfollow, getBadge};
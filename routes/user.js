const User = require('../src/server/models/user');
const Follow = require('../src/server/models/follow');
const Record = require('../src/server/models/record');
const Rating = require('../src/server/models/rating');
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

const badge = async(req, res, next) => {
    // 사람 - 산 사이 연관테이블에 기록 생성
    // 근데 record는 등산할때마다 기록해줘야함
    // 
 
    Record.create(({
        temp_altitude: req.body.altitude,
        user_id = req.body.myId,
        mountain_id = req.body.mountainId
    }))
    .then(() => {
        console.log("Record completed")
    })
    .catch(err => {
        console.log(err);
    });
    
    // 근데 만들어진 rating 테이블 보면 userId랑 user_id 둘다 있는데 왠지 모르겠음;;;  UserId인거 보면 시퀄라이즈에서 자동으로 생성한 것 같은데 왠지 흠;;
    // 그리고 관계테이블에 넣을때 create한후에 키?? 각각 테이블에 관계로 넣은 애들도 저렇게 적어도 되는건지 모르겠도;; 일단 써봤는데 테스트를 못해서 어떤지 모르겠듬
    const result= await Rating.findOne({where: {user_id: req.body.myId, mountain_id:req.body.mountainId}})
    if (result == null){ // record에 기록이 없다면 기록하기 즉 뱃지 받은거임 평가는 기본값 있길래 안줌
        Rating.create(({
            user_id: req.body.myId,
            mountain_id: req.body.mountainId
        }))
    }

}

module.exports = {search,follow, unfollow, badge};
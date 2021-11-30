const Rating = require('../src/server/models/rating');

const {
  fn, col, where,
} = require('sequelize');

const userRate = (req, res, next) => {
  // 사용자가 입력한 평가 항목 저장
  Rating.findOne({ where : { UserId: req.body.userId, mountain_id: req.body.mntId }})
  .then(dbUser => {
    if (dbUser) {
      return Rating.update({  // 평점 수정
        r_f: req.body.rateFac, 
        r_s: req.body.rateScene, 
        r_d: req.body.rateDiff, 
      }, { where: { // 산 ID, 사용자 ID가 같으면 수정
        mountain_id: req.body.mntId, 
        UserId: req.body.userId,
      }})
    } else {
      return Rating.create(({ // 평점 생성
        r_f: req.body.rateFac, 
        r_s: req.body.rateScene, 
        r_d: req.body.rateDiff, 
        mountain_id: req.body.mntId, 
        UserId: req.body.userId,
      })) 
    }
  })
  .then(async () => { // 평점 생성 또는 수정 이후 작업
    // 전체 평균 받아오는 코드
    // SQL: SELECT AVG(r_f) FROM ratings WHERE mountain_id = req.body.mntId
    const avgFac = await Rating.findAll({ // Facility Avg
      attributes: [[fn('ROUND', fn('AVG', col('r_f')), 2), 'avgFac']],
      where: { mountain_id: req.body.mntId },
    });

    const avgScene = await Rating.findAll({ // Scene Avg
      attributes: [[fn('ROUND', fn('AVG', col('r_s')), 2), 'avgScene']],
      where: { mountain_id: req.body.mntId },
    });

    const avgDiff = await Rating.findAll({  // Difficulty Avg
      attributes: [[fn('ROUND', fn('AVG', col('r_d')), 2), 'avgDiff']],
      where: { mountain_id: req.body.mntId },
    });

    res.status(200).json({ 
      message: "success rating",
      avgFac: avgFac, 
      avgScene: avgScene, 
      avgDiff: avgDiff,
    });
  })
  .catch(err => {
    console.log(err);
    res.status(502).json({message: "error while creating rating"});
  });
};


module.exports = { userRate };
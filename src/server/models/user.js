const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
        user_img: {
            type: Sequelize.STRING(100),
            allowNull: false,
            // defaultValue: 'profile.png', 기본이미지 제공가능 근데 설정이 은근 어려움
        },
        username: {
            type: Sequelize.STRING(15),
            allowNull: false,
        },
        password: {
            type: Sequelize.STRING(20),
            allowNull: false,
        },
        // ID를 메일로 할거야? 아님 메일도 받고 아이디도 받을거야?
        email: { 
            type: Sequelize.STRING(40),
            allowNull: true,
            unique: true,
        },
        total_altitude: {
            type: Sequelize.FLOAT,
            allowNull:false,
            defaultValue: 0,
        },
        

        // 교슈님이 필요없을것 같다고 했지만 내가 다른 구글, 카카오 여러개 로그인 연동할때 나름 필요했었는뎅 ㅜ
        provider:{
            type:Sequelize.STRING(10),
            allowNull:false,
            defaultValue:'local',
        },
        snsID:{
            type:Sequelize.STRING(30),
            allowNull:true,
        },
    }, {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: 'User',
      tableName: 'users',
      paranoid: false,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    });
  }
  static associate(db) {
    db.User.hasMany(db.Post);
    db.User.belongsToMany(db.Mountain, { through: "Rating", foreignKey: "user_id", sourceKey: "id"});
    db.User.belongsToMany(db.Mountain, { through: "Record", foreignKey: "user_id", sourceKey: "id"});

    // 같은 모델끼리의 다대다 관계 테이블인 팔로워 팔로잉 (노드교과서 415p) => foreignKey 필요
    db.User.belongsToMany(db.User, {
        foreignKey: 'followingId',
        as: 'Followers',
        through: 'Follow'
    });
    db.User.belongsToMany(db.User, {
        foreignKey: 'followerId',
        as: 'Followings',
        through: 'Follow'
    });
  }
};
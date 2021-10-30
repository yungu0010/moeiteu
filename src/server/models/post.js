const Sequelize = require('sequelize');
module.exports = class Post extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
        msg: {
            type: Sequelize.STRING(50),
            allowNull: true,
        },
    }, {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: 'Post',
      tableName: 'posts',
      paranoid: false,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    });
  }
  static associate(db) {
    db.Post.belongsTo(db.User); // 사용자와 게시글은 1:N 관계이므로
    db.Post.belongsToMany(db.User,{through:'Like',as:'Liker'}); // User와 연결된 모델이 두개이므로 as로 구분할 것임 좋아요 테이블
  }
};
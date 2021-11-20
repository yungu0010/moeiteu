const Sequelize = require('sequelize');

module.exports = class Follow extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
    }, {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: 'Follow',
      tableName: 'follows',
      paranoid: false,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    });
  }
  static associate(db) {
    db.Rating.belongsTo(db.User, {
        foreignKey: 'follower', sourceKey: "id"
      });
    db.Rating.belongsTo(db.User, {
        foreignKey: 'following', sourceKey: "id"
      });
  }
};
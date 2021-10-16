const Sequelize = require('sequelize');

module.exports = class Mountain extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
        name: {
            type: Sequelize.STRING(50),
            allowNull: false,
            unique: true,
        },
        total_altitude: {
            type: Sequelize.FLOAT,
            allowNull:false,
        },

        // 공공데이터?? 사용할거 추가할자리

        badge_img: {
            // 이미지 파일값이라서 string
            type: Sequelize.STRING(100),
            allowNull: false,
        },
    }, {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: 'Mountain',
      tableName: 'mountains',
      paranoid: false,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    });
  }
  static associate(db) {
    db.Mountain.belongsToMany(db.User, { through: "Rating", foreignKey: "mountain_id", sourceKey: "id"});
    db.Mountain.belongsToMany(db.User, { through: "Record", foreignKey: "mountain_id", sourceKey: "id"});
  }
};
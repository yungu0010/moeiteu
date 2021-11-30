const Sequelize = require('sequelize');

module.exports = class Mountain extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
        name: {                   // 산 이름
            type: Sequelize.STRING(50),
            allowNull: false,
        },

        total_altitude: {         // 고도
            type: Sequelize.FLOAT,
            allowNull: false,
        },

        location: {               // 위치(주소)
            type: Sequelize.STRING(200),
            allowNull: false,
        },

        badge_img: {              // 뱃지 이미지(초기에는 공공데이터에 저장된 이미지 첨부함)
            // 이미지 파일값이라서 string
            type: Sequelize.STRING(100),
            allowNull: false,
        },
    }, {
      sequelize,
      timestamps: false,
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
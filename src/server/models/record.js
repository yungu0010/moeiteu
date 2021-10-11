const Sequelize = require('sequelize');

module.exports = class Record extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
        // 날짜는 자동으로 timestamp로 찍힐것
        id: {
            type: Sequelize.INTEGER,
            primaryKey:true,
            allowNull:false,
            // autoIncrement?
        },
        temp_altitude: {
            type: Sequelize.FLOAT,
            allowNull:false,
        },
    }, {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: 'Record',
      tableName: 'records',
      paranoid: false,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    });
  }
  // Ratingrhk Record에 항목이 있는데 워크벤치 켜보면 관계인 키들만 들어감 참고: https://any-ting.tistory.com/51 해결해주셈
  static associate(db) {
    db.Rating.belongsTo(db.User, {
        foreignKey: 'user_id', sourceKey: "id"
      });
    db.Rating.belongsTo(db.Mountain, {
        foreignKey: 'mountain_id', sourceKey: "id"
      });
  }
};
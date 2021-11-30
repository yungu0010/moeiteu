const Sequelize = require('sequelize');

module.exports = class Record extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
        // 날짜는 자동으로 timestamp로 찍힐것
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
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
  static associate(db) {
    db.Rating.belongsTo(db.User, {
        foreignKey: 'user_id', sourceKey: "id"
      });
    db.Rating.belongsTo(db.Mountain, {
        foreignKey: 'mountain_id', sourceKey: "id"
      });
  }
};
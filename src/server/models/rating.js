const Sequelize = require('sequelize');

module.exports = class Rating extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
        //1~5점이니까 제약사항 걸었으면 좋겠는뎅 
        r_f:{ 
            type: Sequelize.INTEGER,
            allowNull:false,
            defaultValue: 5,
        },
        r_s:{
            type: Sequelize.INTEGER,
            allowNull:false,
            defaultValue: 5,
        },
        r_d:{
            type: Sequelize.INTEGER,
            allowNull:false,
            defaultValue: 5,
        },
    }, {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: 'Rating',
      tableName: 'ratings',
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
const Sequelize = require('sequelize');

module.exports = class Rating extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
        r_f:{               // facility
            type: Sequelize.FLOAT,
            allowNull:false,
            defaultValue: 5,
            validate: {
              min: 0.5,     // only allow values >= 0.5
              max: 5,       // only allow values <= 5
            },
        },
        r_s:{               // scene
            type: Sequelize.FLOAT,
            allowNull:false,
            defaultValue: 5,
            validate: {
              min: 0.5,     // only allow values >= 0.5
              max: 5,       // only allow values <= 5
            },
        },
        r_d:{               // difficulty
            type: Sequelize.FLOAT,
            allowNull:false,
            defaultValue: 5,
            validate: {
              min: 0.5,     // only allow values >= 0.5
              max: 5,       // only allow values <= 5
            },
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
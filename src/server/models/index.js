const Sequelize = require('sequelize');
const User = require('./user');
const Mountain = require('./mountain');
const Post = require('./post');
const Rating = require('./rating');
const Record = require('./record');

const dbConfig = require("../config/db.config");

const db = {};
const sequelize = new Sequelize(
  dbConfig.database, dbConfig.user, dbConfig.password, dbConfig,
);

db.sequelize = sequelize;
db.User = User;
db.Mountain = Mountain;
db.Post = Post;
db.Rating = Rating;
db.Record= Record;

User.init(sequelize);
Mountain.init(sequelize);
Post.init(sequelize);
Rating.init(sequelize);
Record.init(sequelize);

User.associate(db);
Mountain.associate(db);
Post.associate(db);
Rating.associate(db);
Record.associate(db);

module.exports = db;

// 옵션 뒤에 주는거 가능
// const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
//   host: dbConfig.HOST,
//   dialect: dbConfig.dialect,
//   operatorsAliases: false,

//   pool: {
//     max: dbConfig.pool.max,
//     min: dbConfig.pool.min,
//     acquire: dbConfig.pool.acquire,
//     idle: dbConfig.pool.idle
//   }
// });
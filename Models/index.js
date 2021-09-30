const Sequelize = require('sequelize');
//const env = process.env.NODE_ENV || 'development';
//const config = require('../config/config')[env];
const User = require('./user');
const Post = require('./post');

const db = {};
// 시퀄라이즈 객체 생성하는 코드
const sequelize = new Sequelize(
  config.database, config.username, config.password, config,
);

// 모델들을 시퀄라이즈 객체에 연결하는 코드
db.sequelize = sequelize;
db.User = User;
db.Post = Post;

//init실행 후 테이블이 모델과 연결됨
User.init(sequelize);
Post.init(sequelize);

// 다른 모델들과의 관계 정의
User.associate(db);
Post.associate(db);

module.exports = db;

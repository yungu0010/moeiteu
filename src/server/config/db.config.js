module.exports = {
    user: "root",
    password: "Young101630!",
    database: "moeiteu", // 존재하는 DB 쓸것
    host: "localhost",
    dialect: "mysql",
    // pool 안해도 되는 옵션인듯 싶다.
    pool: {
      // connection in pool의 최대 최소 숫자
      max: 5,
      min: 0,
      // maximum time that a connection can be idle before being released
      acquire: 30000,
      //  maximum time, in milliseconds, that pool will try to get connection before throwing error
      idle: 10000
    }
  };

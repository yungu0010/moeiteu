const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const db = require('./models');

var corsOptions = {
  origin: "http://localhost:8080" // port번호 다르게 하는건지 같게 하는 건지?
};

// cors는 express의 미들웨어로 다양한 기능을 제공함
app.use(cors(corsOptions));

// application/json과 application/x-www-form-urlencoded 응답을 위함, req.body를 만들기 위함
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// 여기부분에 api 추가해서 동작하도록 하면 될듯
app.get("/", (req, res) => {
  res.json({ message: "Welcome to moeiteu." });
});

app.post('/', async function (req, res, next) {
  res.send()
});


// force:true는 원래 있던 테이블 삭제하고 새로운거 연결하란 의미
db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.");
  });

const PORT = 8080; // 포트설정후 응답기다림
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
const express = require('express');
const { sequelize } = require('./models/index');
const router = require('../../routes/route');

const app = express();

app.use(express.urlencoded({ extended: true}));

app.use(express.json());

app.use((_, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use(router);

sequelize.sync(); 

const request = require('request');
const convert = require('xml-js');

const HOST = 'http://openapi.forest.go.kr/openapi/service/trailInfoService/getforeststoryservice';
const API_KEY = '1yBTqgaLdHUNfTFtJ%2F14i5hM8N6WeP4%2FCmvvUoJKXvV0zkSYhS91awCK2t45JtxxrRYyk2ZbhO8iqbwAZgdfLg%3D%3D';
const mntName = '가리왕산'

app.get('/', function(req, res) {
    res.send('rootpage');
    let requestUrl = `${HOST}?mntnNm=${encodeURIComponent(mntName)}&serviceKey=${API_KEY}`;
    request.get(requestUrl, (err, res, body)=> {
        console.log('실행');
        if(err) {
        console.log(`err => ${err}`);
        }
        else {
        console.log(res.statusCode);
        if(res.statusCode == 200) {
            var result = body;
            console.log(`body data => ${result}`);
            var xmlToJson = convert.xml2json(result, {compact: true, spaces: 4});
            console.log(`xml to json => ${xmlToJson}`);
        }
        }
    });
});

app.listen(8080);
//server 파일에 합쳐야 함

const express = require('express'); //express 연동
const http = require('http'); 
const app = express();
let path = require('path');
let server = http.createServer(app);

const request = require('request');
const convert = require('xml-js');

const HOST = 'http://openapi.forest.go.kr/openapi/service/trailInfoService/getforeststoryservice';
const API_KEY = '1yBTqgaLdHUNfTFtJ%2F14i5hM8N6WeP4%2FCmvvUoJKXvV0zkSYhS91awCK2t45JtxxrRYyk2ZbhO8iqbwAZgdfLg%3D%3D';
const mntName = '청계산';
const mntLoc = '경기도 과천시'; // 같은 이름을 가진 산이 여러 개 있을 때 에러 방지 -> 위치 정보 받아와서 시까지만 잘라서 써도 될 듯

app.get('/', function(req, res) {
  res.send('rootpage');
  let requestUrl = `${HOST}?mntnNm=${encodeURIComponent(mntName)}&mntnAdd=${encodeURIComponent(mntLoc)}&serviceKey=${API_KEY}`;
  //let requestUrl = `${HOST}?mntnAdd=${encodeURIComponent(mntLoc)}&serviceKey=${API_KEY}`;
  request.get(requestUrl, (err, res, body)=> {
    if(err) {
      console.log(`err => ${err}`);
    }
    else {
      if(res.statusCode == 200) {
        let result = body;
        let xmlToJson = convert.xml2json(result, {compact: true, spaces: 4});
        //console.log(xmlToJson);
        let mntID = JSON.parse(xmlToJson).response.body.items.item.mntnid._text;
        let mntHeight = JSON.parse(xmlToJson).response.body.items.item.mntninfohght._text;
        let mntName = JSON.parse(xmlToJson).response.body.items.item.mntnnm._text;
        let mntLocation = JSON.parse(xmlToJson).response.body.items.item.mntninfopoflc._text;
        let mntImg = JSON.parse(xmlToJson).response.body.items.item.mntnattchimageseq._text;
        console.log(`ID: ${mntID}\nName: ${mntName}\nHeight: ${mntHeight}\nLocation: ${mntLocation}\nImg src: ${mntImg}`);
      }
    }
  });
});

server.listen('8800', '127.0.0.1');
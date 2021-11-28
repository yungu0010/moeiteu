const mntData = require('../data/mnt_info.json');

const mysql = require('mysql');
const pool  = mysql.createPool({
  connectionLimit : 1600,
  host            : 'localhost',
  user            : 'root',
  password        : '0000',
  database        : 'moeiteu'
});

pool.getConnection(function(err, connection) {
  if (err) throw err; // not connected!
  
    // Use the connection
    mntData.map((item) => {
      // 공식 이미지 아이디 저장
      let img_id = item.MNTN_INFO_IMAGE_URL.split('FileId=')[1];
      if (img_id === "") img_id = "img";
      if (item.MNTN_HG_VL === "") item.MNTN_HG_VL = 0;

      let mnt_info = {name: item.MNTN_NM, total_altitude: item.MNTN_HG_VL, location: item.MNTN_LOCPLC_REGION_NM, badge_img: img_id};
      // SQL에 작성할 시 name='${item.MNTN_NM}', total_altitude=${item.MNTN_HG_VL}, location='${item.MNTN_LOCPLC_REGION_NM}', badge_img='${img_id}'

      // 쿼리
      connection.query('INSERT INTO mountains SET ?', mnt_info, function (error, results, fields) {

        // Handle error after the release.
        if (error) throw error;
      });
    });
  console.log("insert success");
});
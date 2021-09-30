import MySqlConnection from 'react-native-my-sql-connection';

let config = {
  host:'hostname',
  database:'mydatabase',
  user:'myUser',
  password:'myPassword',
  port:3306, //optional default 3306
  params:'?zeroDateTimeBehavior=convertToNull' // optional
};
try{
  const connection = await MySqlConnection.createConnection(config);
  let res = await connection.executeQuery('SELECT * FROM myTable');
  connection.close();
}catch(err){
  // handle error
}
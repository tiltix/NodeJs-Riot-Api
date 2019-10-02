const fs = require('fs');
const mysql = require('mysql');
const fetch = require('node-fetch');
const url = require('url');

let connection = mysql.createConnection({
  host : 'localhost',
  user : 'root',
  password : '12345678',
  database : 'methalol'
})

  async function makeRequest(){
    const url = 'http://localhost/probuilds.json'; // oluşturulan dizin ve dosya adi.
      fetch(url).then(response =>  response.json())
      .then(result =>{
          for (let i = 0; i < result.length; i++) {
            const name = result[i].id;
            const item = result[i].Itemkey;
            const sqlSorgusu = 'INSERT INTO probuilds VALUES(NULL,?,?,?,?)';
            const kayitSorgusu = [name,item,'all','9.19.1'];
            connection.query(sqlSorgusu,kayitSorgusu,(err,result)=>{
              if(err) throw err;
              console.log('Başarılı...') // + name + item
            })
            console.log(name+item)
          }
      })
    };
  makeRequest();


  
  connection.connect((err)=>{
    if (err) throw err;



  })
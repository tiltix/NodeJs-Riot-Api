const fs = require('fs');
const mysql = require('mysql');

let connection = mysql.createConnection({
    host: 'localhost',
    user:'root',
    password:'12345678',
    database:'methalol'
})

let sqlSorgusu = 'INSERT INTO probuilds VALUES(NULL,?,?,?,?,?,?,?,?,?,?)';
// İD KEY NAME LANE PATH 1 2 3 4 5 6
let kayitSorgusu = ['','Aatrox','','','1','2','3','4','5','6'];

connection.connect((err)=>{
    if (err) throw err;

    fs.readdir('./1/',(ex,files)=>{
        if(ex){console.log(ex)}
        else{
            for (let i = 0; i < files.length; i++) {
                let element = files[i];
                var data = fs.readFileSync('./1/'+element);
                
                var bol = element.split('.json')
                var champions = bol.join(' ')
    
                var config = JSON.parse(data);
                // console.log(element+'Config : '+config[0].ItemId)
                for (let d = 0; d < 6; d++) {
                    let ItemId = config[d].ItemId;
                    var yazdir = '{"id" : "'+champions+'",'+ ' "Itemkey" : "'+ ItemId+'"},';
    
                    console.log(yazdir)
                    fs.appendFileSync('data3.json',yazdir,(err)=>{
                        console.log('Saved!')
                    })
                }
    
            }
        }
    })




    connection.query(sqlSorgusu,kayitSorgusu,(err,results)=>{
        if(err) throw err;
        console.log('Başarılı')
    })

    connection.end((err)=>{
        if(err) throw err;
        console.log('Mysql Close')
    })
})




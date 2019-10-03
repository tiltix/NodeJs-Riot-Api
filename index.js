/*
        Yapılacaklar 
    => Get ile gelen heroya göre heronun bilgileri listelenecek.
*/

const fs = require('fs');
const url = require('url');
const path = require('path');
const http = require('http');

const _kayn = require('kayn')
const Kayn = _kayn.Kayn
const REGIONS = _kayn.REGIONS

const kayn = Kayn("RGAPI-f0e72484-972b-4cf6-b169-c1c73a44ed7e")({
    region : REGIONS.TURKEY,
    locale : 'tr_TR'
})

const express = require('express');
const app = express();
const router = express.Router();


const PORT = 3000;
const RIOT_API_KEY = 'RGAPI-f0e72484-972b-4cf6-b169-c1c73a44ed7e'; // ileride fazla sayfa yaratmak istersek fs ile txt belgesinden çekebiliriz.

const PUBLIC = 'public//'

app.get('/',(req,res)=>{res.sendFile(path.join(__dirname,PUBLIC,'index.html'))});
// Anasayfa || Şampiyonlar || İtemler || Haritalar || Rünler || Sihirdar Büyüleri
// Şampiyonalar için ayrı sayfa'da o şampiyon bilgileri yer alacak. 


router.get('/', async (req,res)=>{
    res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'})
     kayn.DDragon.Champion.list()
        .callback( (error,champions)=>{
            res.write("<html><head><style>.card h6,h6 a{ color:black; font-size:12px; text-decoration: none;}</style><link rel='stylesheet' href='https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css' integrity='sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T' crossorigin='anonymous'></head><body><div class='container'><h1 class='text-center'>Şampiyonlar</h1><div class='card'><div class='card-body'><div class='row'>")
            Object.keys(champions.data).forEach(function(element){
                res.write("<div class='col-sm-1 pt-1'><div class='card'><a href='/champions/"+element+"'><img src='http://ddragon.leagueoflegends.com/cdn/9.19.1/img/champion/"+element+".png' class='card-img-top'><h6 class='text-center pt-2'>"+element+"</a></h6></div></div>")
            })
            res.write('</div></div></div></div></body></html>')
            res.end();
        })
})
    var i = 0;
router.get('/:adi',(req,res)=>{
    res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'})
    var ChampsAdi = req.params.adi;
    kayn.DDragon.Champion.list()
        .callback((error,champions)=>{
            Object.keys(champions.data).forEach(function(element){
                if (element == req.params.adi)
                {
                    kayn.DDragon.Champion.getDataById(req.params.adi)
                        .callback((error,data)=>{
                            console.log(data.data[req.params.adi].lore)
                            res.write(data.data[req.params.adi].lore)
                            res.end();
                            // var veriler = datas.data[ChampsAdi].blurb
                            //  do something
                            // console.log(veriler)
                            // res.send(veriler)
                        })
                    i=1;
                    //  res.send(req.params.adi + '- Şampiyon Bilgileri')
                }
            })
            if (i==0){res.send('ADamım böyle bir sihirdar yok :D')}
        })

})

app.get('/main.html',(req,res)=>{
    // champion.list'ten id sini alacağız
    // sonra id'sine ait 
    res.sendFile(path.join(__dirname,PUBLIC,'main.html'))
})  

app.use('/Champions',router)
app.use('/Champions/',router)


app.listen(PORT,()=>console.log(`Dinlenen Port : ${PORT}`))

kayn.DDragon.Champion.listDataByIdWithParentAsId()
.callback(function(err,list) {
    let ids =[{},{},{}]
    const champions = []
    for (let i = 0; i < 1; ++i) {
        // champions.push(list.data[555]) // id si ile listeledik.
    }
    console.log(champions);
})
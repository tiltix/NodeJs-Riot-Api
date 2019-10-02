const path = require('path');
const url = require('url');
const fetch = require('node-fetch')

var Xray = require('x-ray')
var x = Xray()

let i = 0;
async function makeRequest() {
    const url = 'http://localhost/champkey.json';
    fetch(url).then( response => response.json())
      .then(result => {
        let  sayi =  result.data.length;
        // console.log(result.data[1].id);
        setInterval(()=> {
            let key = result.data[i].key;
            let id  = result.data[i].id;
            x('https://www.probuilds.net/champions/details/'+key,'.bigData',[{
                ItemName : '.item-name',
                ItemId : '.item@data-id'
            }])
            .write('1/'+id+'.json')
            console.log(i+' Yazılan id : '+id)
            i++;

        }, 1000);
        //  for ( let i = 0; i < result.data.length; i++) {
        //     let key = result.data[i].key;
        //     let id  = result.data[i].id;
        //     x('https://www.probuilds.net/champions/details/'+key,'.bigData',[{
        //         itemName : '.item-name',
        //         itemId : '.item@data-id'
        //     }])
        //     .write('champions/'+id+'.json')
        //     console.log('Yazılan id : '+id)
        // }


    });
  }

  makeRequest();

//   (async ()=>{})();

// x('https://www.probuilds.net/champions/details/103','.bigData',[{
//     itemName : '.item-name',
//     itemId : '.item@data-id'
// }])
// .write('ne.json')
const fs = require('fs');
const axios = require('axios');

function webCat(url){
    axios.get(url)
    .then(res=>{
        handleOutput(res.data);
    })
    .catch(err=>{
        console.log('ERROR FETCHING: '+err);
        process.exit(1);
    })
}

function cat(path){
    fs.readFile(path, 'utf8', function(err, data){
        if (err){
            console.log('ERROR READING: '+path+' \n'+err);
            process.exit(1);
        }
        handleOutut(data);
    });
}

module.exports={webCat, cat}

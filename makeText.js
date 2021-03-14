/** Command-line tool to generate Markov text. */
const axios = require('axios');
const fs = require('fs');
const {MarkovMachine} = require('./markov');

function handleOutput(data){
    const mm = new MarkovMachine(data);
    console.log(mm.makeText());
}

async function webCat(url){
    axios.get(url)
    .then(res=>{
        handleOutput(res.data);
    })
    .catch(err=>{
        console.log('ERROR FETCHING: '+err);
        process.exit(1);
    })
}

async function cat(path){
    fs.readFile(path, 'utf8', function(err, data){
        if (err){
            console.log('ERROR READING: '+path+' \n'+err);
            process.exit(1);
        }
        handleOutput(data);
    });
}

function main(){
    const arg = process.argv[2];
    const path = process.argv[3];
    if (arg === 'file'){
        cat(path);
    }else if (arg === 'url'){
        webCat(path);
    }else{
        console.log('Invalid commands '+arg);
    }
}

module.exports={webCat, cat, handleOutput, main}
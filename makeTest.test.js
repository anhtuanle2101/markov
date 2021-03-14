const {webCat, cat, main, handleOutput} = require('./makeText');

describe('Testing makeText.js ', function(){
    test('file path', function(){
        process.argv[2]='file';
        process.argv[3]='test.txt';
        
        main();
    })
    test('url path', function(){
        process.argv[2]='url';
        process.argv[3]='http://google.com';
        
        main();
    })
})
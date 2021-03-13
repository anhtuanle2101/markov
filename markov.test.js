const {MarkovMachine} = require('./markov');


describe('Class methods testing', function(){
    let instance;
    beforeEach(function(){
        instance = new MarkovMachine('this is a test');
    });
    test('this.words working', function(){
        expect(instance.words).toEqual(['this', 'is', 'a', 'test']);
    });
    test('makeChain() is working', function(){
        instance.makeChains();
        expect(instance.chain).toEqual({'this': ['is'], 'is': ['a'], 'a': ['test'], 'test': [null]});
    });
    test('makeText() is working', function(){
        instance.makeChains();
        const text = instance.makeText();
        expect(text.length).toBeLessThan(100);
        expect(text).toEqual(expect.any(String));
    })
})
/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    // TODO
    this.chain = {};
    for (let i=0; i<this.words.length; i++){
      if (this.words[i-1] && this.words[i]){
        if (this.words[i+1]){
          this.chain[`${this.words[i-1]} ${this.words[i]}`] = (this.chain[`${this.words[i-1]} ${this.words[i]}`] || []);
          this.chain[`${this.words[i-1]} ${this.words[i]}`].push(this.words[i+1]);
        }else{
          this.chain[`${this.words[i-1]} ${this.words[i]}`] = (this.chain[`${this.words[i-1]} ${this.words[i]}`] || []);
          this.chain[`${this.words[i-1]} ${this.words[i]}`].push(null);
        }
      }
    }
  }
  /** return random text from chains */

  makeText(numWords = 100) {
    if (numWords<1){
      return '';
    }
    let randomIndex = Math.floor(Math.random()*Object.keys(this.chain).length);
    let lastWord = Object.keys(this.chain)[randomIndex];
    while (lastWord.charAt(0) !== lastWord.charAt(0).toUpperCase()){
      randomIndex = Math.floor(Math.random()*Object.keys(this.chain).length);  
      lastWord = Object.keys(this.chain)[randomIndex];
    }
    let Text = lastWord;
    let count = 1;
    while (count<numWords){
      if (lastWord.charAt(lastWord.length-1)==='.'){
        break;
      }
      count++;
      let nextWords = Object.keys(this.chain).filter(word=>{
        if (this.chain[lastWord].some(word2=>word.includes(word2))){
          return word;
        }
      });
      let nextRandIdx = Math.floor(Math.random()*nextWords.length);
      let nextWord = nextWords[nextRandIdx];
      
      if (nextWord){
        Text += ' '+nextWord;
        lastWord = nextWord;
      }else{
        return Text;
      }
    }
    return Text;
  }
}

module.exports={
  MarkovMachine
}
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
      if (!this.chain[this.words[i]]){
        this.chain[this.words[i]]=[];
      }
      if (this.words[i+1]){
        this.chain[this.words[i]].push(this.words[i+1]);
      }else{
        this.chain[this.words[i]].push(null);
      }
    }
  }
  /** return random text from chains */

  makeText(numWords = 100) {
    if (numWords<1){
      return '';
    }
    const randomIndex = Math.floor(Math.random()*this.words.length);
    let lastWord = this.words[randomIndex];
    let Text = lastWord;
    let count = 1;
    while (count<numWords){
      let nextWords = this.chain[lastWord];
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
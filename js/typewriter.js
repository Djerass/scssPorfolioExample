class TextWriter {
  constructor(selector) {
    let temp = document.querySelector(selector);
    this.output = temp;
    this.words = JSON.parse(temp.getAttribute("data-words")); // Array of Strings
    this.delay = Number.parseInt(temp.getAttribute("data-delay")); // Delay number
    this.deleteDelay = this.delay / 2;
    this.letterIndex = 0;
    this.wordIndex = 0;
    this.word = this.words[this.wordIndex];
    this.type();
  }
  type() {
    // Type letter of the word, if previous letter was last start deleting
    if (this.letterIndex < this.word.length) {
      setTimeout(() => this._addLetter(), this.delay);
    } else {
      setTimeout(() => this.remove(), this.delay);
    }
  }
  remove() {
    //Remove letter
    setTimeout(() => this._removeLetter(), this.deleteDelay);
  }

  _addLetter() {
    this.output.textContent += `${this.word[this.letterIndex]}`;
    this.letterIndex++;
    this.type();
  }
  _removeLetter() {
    // Delete letters until end of the word, then move to a next word
    const text = this.output.textContent;
    if (text.length > 0) {
      this.output.textContent = text.slice(0, text.length - 1);
      this.remove();
    } else {
      this.letterIndex = 0;
      if (this.wordIndex === this.words.length - 1) {
        this.wordIndex = 0;
      } else {
        this.wordIndex++;
      }
      this.word = this.words[this.wordIndex];
      this.type();
    }
  }
}

document.addEventListener(
  "DOMContentLoaded",
  () => new TextWriter("#txt-type")
);

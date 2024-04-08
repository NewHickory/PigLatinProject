"use strict";

// brings in the assert module for unit testing
const assert = require("assert");
// brings in the readline module to access the command line
const readline = require("readline");
// use the readline module to print out to the command line
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// const userInput = (element) => {
//   input = element.value
//   console.log("User input is: ", input)
// }

const pigLatin = (word) => {
  let pig_latin_array = [];

  // Split input into an array of words
  let words = word.split(" ");
  console.log("Input to array:", words);

  // Iterate through words in array and perform operations based on position of first vowel in word
  for (let w of words) {
    w = w.trim();
    w = w.toLowerCase();
    console.log("Word in array:", w);

    // Find position of first vowel in word with regex
    let position = w.search(/[aeiou]/);
    console.log("Position of first vowel:", position);

    // If first letter in word is vowel, add 'yay' to end of word and push to new array
    if (position === 0) {
      let new_w = w + "yay";
      let count = pig_latin_array.push(new_w);
      console.log("Pig Latin array length:", count);
      console.log(pig_latin_array);
    }

    // If first letter in word is not a vowel, take all consonants up to first vowel, move to end of new word followed by 'yay'
    else if (position > 0) {
      let from_vowel = w.slice(position);
      let consonants = w.slice(0, position);
      let new_w = from_vowel + consonants + "ay";
      let count = pig_latin_array.push(new_w);
      console.log("Pig Latin array length:", count);
      console.log(pig_latin_array);
    }
  }

  // Join new array to string and then replace commas with spaces for readability
  let result = pig_latin_array.join().replace(",", " ");
  console.log("New pig latin phrase:", result);
  return result;
};

// the first function called in the program to get an input from the user
// to run the function use the command: node main.js
// to close it ctrl + C
const getPrompt = () => {
  rl.question("word ", (answer) => {
    console.log(pigLatin(answer));
    getPrompt();
  });
};

// Unit Tests
// to use them run the command: npm test main.js
// to close them ctrl + C
if (typeof describe === "function") {
  describe("#pigLatin()", () => {
    it("should translate a simple word", () => {
      assert.equal(pigLatin("car"), "arcay");
      assert.equal(pigLatin("dog"), "ogday");
    });
    it("should translate a complex word", () => {
      assert.equal(pigLatin("create"), "eatecray");
      assert.equal(pigLatin("valley"), "alleyvay");
    });
    it('should attach "yay" if word begins with vowel', () => {
      assert.equal(pigLatin("egg"), "eggyay");
      assert.equal(pigLatin("emission"), "emissionyay");
    });
    it("should lowercase and trim word before translation", () => {
      assert.equal(pigLatin("HeLlO "), "ellohay");
      assert.equal(pigLatin(" RoCkEt"), "ocketray");
    });
  });
} else {
  getPrompt();
}

// **********
//   HINTS
// **********

// break your code into pieces and focus on one piece at a time...
// 1. if word begins with a vowel send to one function: adds "yay"
// 2. if word begins with a consonant send to another function: splices off beginning, returns word with new ending.
// 3. if multiple words, create array of words, loop over them, sending them to different functions and creating a new array with the new words.

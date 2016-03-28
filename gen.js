'use strict';
let cards = [7, 2, 3, 4, 5, 1, 9, 8, 10, 6, 11, 12, 13, 14, 15, 16]; // illegal state

while ([5, 6, 9, 10].indexOf(cards.indexOf(7)) === -1 ||
  ((Math.abs(cards.indexOf(8) % 4 - cards.indexOf(9) % 4)
  + Math.abs(parseInt(cards.indexOf(8) / 4, 10) - parseInt(cards.indexOf(9) / 4, 10))) < 3)) {
  cards = shuffle(cards);
  console.log(cards.indexOf(8), cards.indexOf(8) % 4);
  console.log(cards.indexOf(9), cards.indexOf(9) % 4);
  console.log(cards.indexOf(8) % 4 - cards.indexOf(9) % 4);
  console.log(cards.indexOf(8), parseInt(cards.indexOf(8) / 4, 10));
  console.log(cards.indexOf(9), parseInt(cards.indexOf(9) / 4, 10));
  console.log(parseInt(cards.indexOf(8) / 4, 10) - parseInt(cards.indexOf(9) / 4, 10));
  console.log("\n");
}

let i, output = '';
for (i = 0; i < cards.length; i += 1) {
    if (cards[i] < 10) output += " ";
    output += cards[i] + " ";
    if (i % 4 === 3) output += "\n";
}
console.log(output);


function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

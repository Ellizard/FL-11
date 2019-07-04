let side1 = +prompt('Side 1');
let side2 = +prompt('Side 2');
let side3 = +prompt('Side 3');

let side1IsCorrect = side1 < side2 + side3;
let side2IsCorrect = side2 < side1 + side3;
let side3IsCorrect = side3 < side2 + side1;

if (side1IsCorrect && side2IsCorrect && side3IsCorrect) {
  if (side1 === side2 && side1 === side3 && side1 !== null) {
    console.log('Eequivalent triangle');
  } else if (side1 === side2 || side2 === side3 || side1 === side3) {
    console.log('Isosceles triangle');
  } else if (side1 !== side2 && side1 !== side3 && side3 !== side2) {
    console.log('Normal triangle');
  }
} else {
  console.log('Triangle doesn’t exist');
}

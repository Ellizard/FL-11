let ax = +prompt('Point A1:');
let ay = +prompt('Point A2:');

let bx = +prompt('Point B1:');
let by = +prompt('Point B2:');

let cx = +prompt('Point C2:');
let cy = +prompt('Point C2:');

let counter = 2;

let middlePointX = (ax + bx) / counter;
let middlePointY = (ay + by) / counter;

if (cx === middlePointX && cy === middlePointY) {
  console.log(true);
} else {
  console.log(false);
}

function create(object) {
  function Object() {
    // For new object.
  }
  Object.prototype = object;
  return new Object()
}

const obj1 = { prop: 5 };
const obj2 = create(obj1);


console.log(Object.getPrototypeOf(obj2) === obj1);
console.log(obj2.prop);
function assign(newObj) {
  for (let i=1; i < arguments.length; i++) {
    for (let key in arguments[i]) {
      if (key !== undefined) {
        newObj[key] = arguments[i][key];
      }
    }
  }
  return newObj;
}

const defaults = { a: 123, b: 777 };
const options = { a: 456 };
const configs = assign({}, defaults, options); // => {a: 456, b: 777}

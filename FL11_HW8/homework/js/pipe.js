function addOne(x) {
  return x + 1;
}

function pipe(num) {
  let result = num;

  for(let i = 1; i < arguments.length; i++) {
    result = arguments[i](result);
  }

  return result;
}

pipe(1,addOne);



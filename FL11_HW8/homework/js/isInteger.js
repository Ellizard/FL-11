let isInteger = (value) => {
  if (isNaN(value)) {
    return false;
  }
  let x = parseFloat(value);
  return (x | 0) === x;
};

isInteger(1.1);

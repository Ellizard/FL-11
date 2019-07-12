function reverseNumber(number) {
  let reversed = 0;

  while (number !== 0) {
    reversed *= 10;
    reversed += number % 10;
    number -= number % 10;
    number /= 10;
  }
  return reversed;

}

reverseNumber(-456);

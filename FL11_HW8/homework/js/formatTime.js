function formatTime(min) {
  let m = min % 60;
  let h = Math.floor(min / 60);
  let d = Math.floor(h / 24);
  h %= 24;

  return d + ' day(s) ' + h + ' hour(s) ' + m + ' minute(s)';
}

formatTime(3601);
let getNubers = (string) => {
  let numbers = [];
  for (let i=0; i < string.length; i++) {
    if (string[i] >=0 || string[i] <= 0) {
      numbers.push(string[i]);
    }
  }
  return numbers;
};
//console.log(getNubers('n1um3ber95’'));

function findTypes() {
  let foundedTypes = {};

  for (let i=0; i < arguments.length; i++) {
    let currentType = typeof arguments[i];
    console.log(currentType);

    if (!('' + currentType + '' in foundedTypes) ) {
      foundedTypes['' + currentType + ''] = 0;
      foundedTypes['' + currentType + ''] += 1;
    } else {
      foundedTypes['' + currentType + ''] += 1;
    }
  }
  return foundedTypes;
}
//console.log(findTypes(null, 5, 'hello'));


function executeforEach(arr, f) {
  for (let i=0; i < arr.length; i++) {
    f(arr[i]);
  }
}

// executeforEach([1,2,3], function(el) {
//   console.log(el);
// });


// Task 3:
function mapArray (arr, fun) {
  let nArray = [];
  executeforEach(arr, function(x) {
    nArray.push(fun(x));
  });
  return nArray;
}
// console.log(mapArray([11, 3, 6], function(el) {
//   return el + 3
// }));

function filterArray (arr, fun) {
  let nArray = [];
  executeforEach(arr, function(x){
    if (fun(x)) {
      nArray.push(x);
    }
  });
  return nArray;
}
// console.log(filterArray([2,5,6], function(el){
//   return el > 3;
// }));


function showFormattedDate(date) {
  let formattedDate = new Date(date);
  let fullDate;

  let month = formattedDate.toLocaleString('en-US', {
    month: 'short'
  });

  let day = formattedDate.toLocaleString('en-US', {
    day: 'numeric'
  });

  let year = formattedDate.toLocaleString('en-US', {
    year: 'numeric'
  });

  fullDate = 'Date: ' + month + ' ' + day + ' ' + year;

  return fullDate;
}
// console.log(showFormattedDate(new Date('2019-01-27T01:10:00')));


function canConvertToDate(date) {
  return !!Date.parse(date);
}
// console.log(canConvertToDate('2016-12-18T00:00:00'));


function daysBetween(d1, d2) {
  let date1 = d1.getTime();
  let date2 = d2.getTime();
  let difference = date2 - date1;
  difference = Math.ceil(difference / (1000 * 60 * 60 * 24));
  return difference;
}
//daysBetween(new Date('2016-03-18T00:00:00'), new Date('2016-04-19T00:00:00'));

let persons = [
  {
    '_id': '5b5e3168c6bf40f2c1235cd6',
    'index': 0,
    ' birthday ': '2016-03-18T00:00:00',
    'eyeColor': 'green',
    'name': 'Stein',
    'favoriteFruit': 'apple'
  },
  {
    '_id': '5b5e3168e328c0d72e4f27d8',
    'index': 1,
    ' birthday ': '1991-02-11T00:00:00',
    'eyeColor': 'blue',
    'name': 'Cortez',
    'favoriteFruit': 'strawberry'
  },
  {
    '_id': '5b5e3168cc79132b631c666a',
    'index': 2,
    ' birthday ': '1984-04-17T00:00:00',
    'eyeColor': 'blue',
    'name': 'Suzette',
    'favoriteFruit': 'apple'
  },
  {
    '_id': '5b5e31682093adcc6cd0dde5',
    'index': 3,
    ' birthday ': '1994-04-17T00:00:00',
    'eyeColor': 'green',
    'name': 'George',
    'favoriteFruit': 'banana'
  }
];
function getAmountOfAdultPeople(persons) {
  // Target property.
  let foundProp = ' birthday ';
  // People are over 18
  let personCount = 0;

  filterArray(persons, function(x) {
      if( x.hasOwnProperty(foundProp) ) {
        let dateNow = new Date();
        let birthTime = new Date(x[foundProp]);
        let personAge = daysBetween(birthTime, dateNow ) / 365;
        if (personAge >= 18) {
          personCount++;
        }
      }
  });

  return personCount;
}
//console.log(getAmountOfAdultPeople(persons));


function keys(o) {
  let array = [];
  for (let key in o){
    if (o.hasOwnProperty(key)){
      array.push(key);
    }
  }
  return array;
}
// console.log(keys({keyOne: 1, keyTwo: 2, keyThree: 3}));


function values(o) {
  let array = [];

  for (let key in o){
    if (o.hasOwnProperty(key)){
      array.push(o[key]);
    }
  }
  return array;
}
//console.log(values({keyOne: 1, keyTwo: 2, keyThree: 3}));




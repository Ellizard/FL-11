// // Task 1.
const array = [1, 2, 3, 4, 56, 7, 78, 8, 1111, 23, 345, 348, 54, 24];
const maxelement = (array) => Math.max(...array);
//console.log(maxelement(array));


// // Task 2.
const copyArray = (array) => [...array];
const copiedArray = copyArray(array);
// console.log(array, copiedArray);
// console.log(array === copiedArray);


// Task 3.
const addUniqueId = (object) => {
  // Make copy of object,
  const newObj = {
    ...object,
  };
  // Add new property / value with symbol type.
  for (key in object) {
    newObj[Symbol(key)] = object[key];
  }
  return newObj
};

const obj = {
  name: 123,
};
// const obj2 = addUniqueId(obj);
// console.log(obj, obj2);


// Task 4.
const oldObj = {
  name: 'Someone',
  details: {
    id: 1,
    age: 11,
    university: 'UNI'
  }
};

const regroupObject = (object) => {
  const obj = {
    university: object.details.university,
    user: {
      age: object.details.age,
      firstName: object.name,
      id: object.details.id,
    }
  };

  return obj;
};
//console.log(oldObj, regroupObject(oldObj));

// Task 5.
const numArray = [1,2,3,4,5,6,7,4,3,2,2,5,6,22,7,8,5,2,2,4,5,6,7,8, 22];
const findUniqueElements = (numArray) =>  numArray.filter((item, i, ar) => ar.indexOf(item) === i);
//console.log(findUniqueElements(array));


// Task 6.
const number = 80931215100;
const hideNumber = (number) => {
  const num = number.toString();
  const last4Digits = num.slice(-4);
  return last4Digits.padStart(num.length, '*');
};
// console.log(hideNumber(number));


// Task 7.
const add = (num1, num2) => {
  function check(num1, num2) {
    if (num1 === undefined || num2 === undefined) {
      throw "Missing property";
    }
  }

  try {
    check(num1, num2);
    return num1 + num2;
  } catch (e) {
    console.log(e);
  }
};
// console.log(add(1, 2 ));
// console.log(add(1 ));


// Task 8.
let myPromise = (url) => {
  let array = [];
  const promise = new Promise((resolve, reject) => {
    const Http = new XMLHttpRequest();
    const url = 'https://api.github.com/users/Ellizard/repos';
    Http.open("GET", url);
    Http.send();
    Http.onload = (e) => {
      resolve(array = JSON.parse(Http.responseText));
    }
  });

  promise.then( (array) => {
    let names = [];
    for(let i=0; i<array.length; i++) {
      names.push(array[i].name);
    }
    console.log(names.sort());
  });
};


// Task 9.
const request = async () => {
  const response = await fetch('https://api.github.com/users/Ellizard/repos');
  const data = await response.json();
  return data;
};

request().then((json) => {
  let names = [];
  for (key in json) {
    names.push(json[key].name);
  }
  console.log(names);
});


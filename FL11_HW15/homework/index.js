function Hamburger(type, calories, secretIsAdded = false) {
  let cal = calories;
  let withCheese = false;
  let tomato = 0;
  let secretBlocked = secretIsAdded;
  let secretAdded = secretIsAdded;
  let hamburgerIsLocked = false;
  let bitCounter = 0;
  const cheeseCalories = 120;
  const tomatoCalories = 20;
  const maxTomato = 2;
  const secretIngredientCalories = 100;
  this.type = type;

  // Check for secret ingredient on start.
  if (secretIsAdded) {
    cal += secretIngredientCalories;
  }

  // Get current calories.
  this.getCalories = function() {
    return cal;
  };

  // Override calories.
  this.setCalories = function(calories) {
    cal = calories;
  };

  this.addCheesee = function() {
    // Check for burger lock.
    if (hamburgerIsLocked) {
      console.log('Sorry, you can not add cheese!');
      return false;
    }

    // Check if cheese was added.
    if (!withCheese) {
      cal += cheeseCalories;
      withCheese = true;
      secretBlocked = true;
    } else {
      console.log('Sorry, you can add cheese only once!');
    }
  };

  this.addTomatos = function() {
    // Check for burger lock.
    if (hamburgerIsLocked) {
      console.log('Sorry, you can not add tomato!');
      return false;
    }

    // Add tomato if their length less the max value.
    if (tomato < maxTomato) {
      tomato++;
      cal += tomatoCalories;
      secretBlocked = true;
    } else {
      console.log('Sorry, you can add cheese only twice!');
    }
  };

  // Add secret ingredient.
  this.addSecretIngredient = function() {

    // Check for burger lock.
    if (hamburgerIsLocked) {
      console.log('Sorry, you can not add secret ingredient');
      return false;
    }

    // Add Secret ingredient.
    if (!secretBlocked) {
      cal += secretIngredientCalories;
      secretBlocked = true;
      secretAdded = true;
    } else if (secretAdded) {
      // Fired if secret ingredient was added before.
      console.log('Sorry, you can add secret ingredient only once!');
    } else {
      // Fired when user try to add secret ingredient after another one.
      console.log('Sorry, you can add secret ingredient only before another ingredients!');
    }
  };

  // Lock all burger and increment bite.
  this.bite = function() {
    hamburgerIsLocked = true;
    bitCounter++;
  };

  this.info = function() {
    // Ingredients messages.
    let typePattern = `${this.type} hamburger: `;
    let uppercaseType = `${typePattern.charAt(0).toUpperCase()}${typePattern.slice(1)}`;
    let secretPattern = secretAdded ? 'with secret ingredient' : 'without secret ingredient';
    let cheesePattern = withCheese ? 'with cheese' : 'without cheese';
    let tomatoPattern = tomato ? `with ${tomato} tomato` : 'without tomato';
    let bitPattern = `is bit ${bitCounter} times.`;
    let caloriesPattern = `Total calories: ${cal}`;

    // Output burger info.
    return `${uppercaseType} ${secretPattern}, ${cheesePattern}, ${tomatoPattern}, ${bitPattern} ${caloriesPattern}`;
  }

}

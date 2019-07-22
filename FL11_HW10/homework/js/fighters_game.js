function Fighter(obj) {

  let name = obj.name;
  let damage = obj.damage;
  let hp = obj.hp;
  let agility = obj.agility;
  let maxHp = obj.hp;
  let win = 0;
  let lose = 0;

  // Get player name.
  this.getName = function() {
    return name;
  };

  // Get player damage.
  this.getDamage = function() {
    return damage;
  };

  // Get player health.
  this.getHealth = function() {
    return hp;
  };

  // Get player agility.
  this.getAgility = function() {
    return agility;
  };

  // Show player history.
  this.logCombatHistory = function() {
    console.log('Name: ' + name + ', Wins: ' + win + ', Losses: ' + lose);
  };

  // Heal player.
  this.heal = function(healCount) {
    if (healCount >= maxHp || maxHp - hp < healCount) {
      hp = maxHp;
    } else {
      hp += healCount;
    }
  };

  // Hit target.
  this.dealDamage = function(attack) {
    if (hp > 0 && hp > attack) {
      hp -= damage;
    } else {
      hp = 0;
    }
  };

  // Add win.
  this.addWin = function() {
    win++;
  };

  // Add lose.
  this.addLoss = function() {
    lose++;
  };

  // Attack logic.
  this.attack = function(target) {
    // Max agility.
    let max = 100;
    // Hit chance.
    let random = max - target.getAgility();
    // Hit or not.
    let success = Math.round(Math.random() * random);

    if (success < random) {
      // Fired on hit.
      target.dealDamage(damage);
      let attackMessage = `${this.getName()} make ${this.getDamage()} damage to ${target.getName()}`;
      console.log(attackMessage);
    } else {
      // Fired on miss.
      let missedMessage = `${this.getName()} attack missed`;
      console.log(missedMessage);
    }
  }
}

// Main battle function.
function battle(player1, player2) {
  // Get player max hp.
  let pl1Hp = player1.getHealth();
  let pl2Hp = player2.getHealth();

  // Start battle if both players are live.
  if (pl1Hp > 0 && pl2Hp > 0) {
    // While both of player is a life.
    while (pl1Hp > 0 && pl2Hp > 0) {
      // Player 1 attack.
      if (pl1Hp > 0) {
        player1.attack(player2);
        pl2Hp = player2.getHealth();
      }
      // Player 2 attack.
      if (pl2Hp > 0) {
        player2.attack(player1);
        pl1Hp = player1.getHealth();
      }
    }
    // End of the battle.
    if (pl1Hp > 0) {
      player1.addWin();
      player2.addLoss();
      console.log(`${player1.getName()} Win.`);
    } else {
      player2.addWin();
      player1.addLoss();
      console.log(`${player2.getName()} Win.`);
    }
    // Show combat results.
    let pl1Info = `${player1.getName()} has ${player1.getHealth()}hp`;
    let pl12nfo = `${player2.getName()} has ${player2.getHealth()}hp`;
    console.log(`Fight result: ${pl1Info} and ${pl12nfo}`);
  } else {
    // If some of players are dead.
    if (pl1Hp === 0) {
      console.log(`${player1.getName()} is dead.`);
    } else {
      console.log(`${player2.getName()} is dead.`);
    }
  }
}

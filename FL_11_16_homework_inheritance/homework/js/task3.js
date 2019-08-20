function Charmander() {
  this.type = 'Fire';
  this.specie = 'Lizard Pokemon';
  this.pokemonType = 'Charmander';
  this.fly = false;
}

function Charmeleon() {
  this.type = 'Fire';
  this.specie = 'Flame Pokemon';
  this.pokemonType = 'Charmeleon';
  this.fly = false;
}

function Charizard() {
  this.type = 'Fire';
  this.specie = 'Flame Pokemon';
  this.pokemonType = 'Charizard';
  this.fly = true;
}

function Pokemon() {
  this.getType = function () {
    return this.type;
  };
  this.getSpecie = function () {
    return this.specie;
  };
  this.canFly = function () {
    return this.fly;
  };
  this.getPokemonType = function () {
    return this.pokemonType;
  };
  this.evolve = function () {
    if (this.__proto__.getPokemonType()) {
      return new this.__proto__.__proto__.constructor();
    } else {
      return this;
    }
  }
}

Charmander.prototype = new Pokemon();
Charmeleon.prototype = new Pokemon();
Charizard.prototype = new Pokemon();

const charmander = new Charmander();
const charmeleon = new Charmeleon();
const charizard = new Charizard();

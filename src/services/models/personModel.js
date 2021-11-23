const { v4: uuidv4 } = require('uuid');

module.exports = class Person {
  constructor({
    id = uuidv4(),
    name = 'unnamed',
    age = 18,
    hobbies = [],
  } = {}) {
    this.id = id;
    this.name = name;
    this.age = age;
    this.hobbies = hobbies;
  }
}
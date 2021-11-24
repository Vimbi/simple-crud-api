const persons = require('../../data/persons');
const Person = require('../models/personModel');

const getAll = async () => persons;

const addPerson = (data) => {
  let person = '';
  if (Object.prototype.hasOwnProperty.call(data, 'name') && Object.prototype.hasOwnProperty.call(data, 'age') && Object.prototype.hasOwnProperty.call(data, 'hobbies')) {
    person = new Person(data);
    persons.push(person);
    return person;
  }
  return person;
}

module.exports = {
  getAll,
  addPerson,
}
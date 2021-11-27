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

const getPerson = (data) => {
  const searchedPerson = persons.find(person => person.id === data);
  return searchedPerson;
}

const updatePerson = (personId, data) => {
  let searchedPerson = persons.find(person => person.id === personId);
  // const { name, age, hobbies } = data;
  if (searchedPerson && data) {
    searchedPerson = { ...searchedPerson, ...data };
    persons[personId] = searchedPerson;
    return searchedPerson;
  }
  return '';
}

const deletePerson = (personId) => {
  const index = persons.findIndex(person => person.id === personId);
  let result;
  if (index !== -1) {
    persons.splice(index, 1);
    result = true;
  } else {
    result = false;
  }
  return result;
}

module.exports = {
  getAll,
  addPerson,
  getPerson,
  updatePerson,
  deletePerson,
}
const safelyParseJSON = (data) => {
  try {
    return JSON.parse(data);
  } catch (error) {
    console.log('Parsing error')
    return '';
  }
};

module.exports = safelyParseJSON;
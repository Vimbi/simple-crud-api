const safelyParseJSON = (data) => {
  try {
    return JSON.parse(data);
  } catch (error) {
    return '';
  }
};

module.exports = safelyParseJSON;
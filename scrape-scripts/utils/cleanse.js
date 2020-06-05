const valuesAreEmptyReducer = (keys) => (result, value, index) => {
  if (value !== '' && keys[index] !== 'category') {
    return false;
  }
  return result;
};

// Removes null or empty values
module.exports = (result, item) => {
  if (item) {
    if (!Object.values(item).reduce(valuesAreEmptyReducer(Object.keys(item)), true)) {
      return result.concat(item);
    }
  }
  return result;
}

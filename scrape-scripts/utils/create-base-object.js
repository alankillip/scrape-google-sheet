const mutateObj = (obj, defaultValue = '') => (field) => {
  obj[field] = defaultValue
};

module.exports = (columnIds, category) => {
    const obj = {category};
    columnIds.map(mutateObj(obj));
    return obj;
};

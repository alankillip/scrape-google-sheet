const { extractData } = require('./extract-data');

const fieldNames = ['name', 'link', 'type'];

extractData('Links', 2, 5, fieldNames);

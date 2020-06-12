const { extractData } = require('./scrape');

const fieldNames = ['name', 'link', 'type'];

extractData('Links', 2, 5, fieldNames);

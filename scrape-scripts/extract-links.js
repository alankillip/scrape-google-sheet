const { extractData } = require('./scrape');

const fieldNames = ['content', 'link', 'type'];

extractData('Links', 2, 5, fieldNames);

require('dotenv').config();
const { extractData } = require('./scrape');

// Link is extracted from the name column
const columnsIds = ['type', 'name', 'phone', 'desc'];
const additionalFields = ['link'];

extractData('PsychHelp', 1, 4, columnsIds.concat(additionalFields));

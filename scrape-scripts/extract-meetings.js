const { extractData } = require('./extract-data');

const columnsIds = ['date', 'agenda', 'minutes', 'linkToJoin', 'chair', 'summary'];

extractData('Meetings', 2, 3, columnsIds);

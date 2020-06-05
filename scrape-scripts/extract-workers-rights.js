
const { extractData } = require('./scrape');

const columnsIds = ['name', 'topic', 'type', 'website', 'detailsNotes', 'targetGroup'];

extractData('WorkersRights', 6, 7, columnsIds);

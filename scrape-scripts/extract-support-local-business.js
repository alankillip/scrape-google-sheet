const { extractData } = require('./extract-data');

const columnsIds = ['name', 'details', 'howYouCanHelp', 'links'];

extractData('SupportLocalBusiness', 1, 2, columnsIds);

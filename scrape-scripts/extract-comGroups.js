const { extractData } = require('./extract-data');

const columnsIds = ['name', 'basedIn', 'whatDoYouDo', 'support', 'contactFromOrg', 'repName', 'repContact', 'link', 'otherInfo'];

extractData('CommGroups', 4, 5, columnsIds);

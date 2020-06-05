require('dotenv').config();
const cleanseNull = require('./utils/cleanse');
const extractHyperLink = require('./utils/extract-hyperlink');
const createCell = require('./utils/create-cell');
const createBaseObject = require('./utils/create-base-object');


module.exports = (data, titleRow, startDataRow, columnsIds, category) => {
  const cells = data.map(createCell);
  const links = [];
  const processCell = (cell) => {
    if (!links[cell.row]) {
      links[cell.row] = createBaseObject(columnsIds, category);
    }
    if (cell.row >= startDataRow) {
      const link = links[cell.row];
      if (cell.col === 1) {
        link.content = cell.content;
        link.link = extractHyperLink(cell);

      }
      if (cell.col === 2) {
        link.type = cell.content;
      }
    }
  };
  cells.map(processCell);
  return links.reduce(cleanseNull, []);
};

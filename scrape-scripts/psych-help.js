const cleanse = require('./utils/cleanse');
const extractHyperLink = require('./utils/extract-hyperlink');
const createCell = require('./utils/create-cell');
const createBaseObject = require('./utils/create-base-object');

module.exports = (data, titleRow, startDataRow, columnsIds, category) => {
  const cells = data.map(createCell);
  const groups = [];
  let currentType;
  const processCell = (cell) => {
    if (!groups[cell.row]) {
      groups[cell.row] = createBaseObject(columnsIds, category);
    }
    const { content, row, col } = cell;
    if (row >= startDataRow) {
      const group = groups[row];
      group[columnsIds[col - 1]] = content;
      if (col === 1) {
        currentType = content;
      }
      if (col === 2) {
        group.link = extractHyperLink(cell);
      }
      group.type = currentType;
    }
  };
  cells.map(processCell);
  return {
    groups: groups.reduce(cleanse, []),
    columns: ['Support For', 'Name', 'Number', 'Description', 'Link']
  };
};

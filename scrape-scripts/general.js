const cleanse = require('./utils/cleanse');
const createCell = require('./utils/create-cell');
const createBaseObject = require('./utils/create-base-object');

module.exports = (data, titleRow, startDataRow, columnsIds, category) => {
  const cells = data.map(createCell);
  const groups = [];
  const columns = [];
  const processCell = (cell) => {
    if (!groups[cell.row]) {
      groups[cell.row] = createBaseObject(columnsIds, category);
    }
    const { content, row, col } = cell;
    if (row === titleRow) {
      columns[col - 1] = content;
    }
    if (row >= startDataRow) {
      const group = groups[row];
      group[columnsIds[col - 1]] = content;
    }
  };
  cells.map(processCell);
  return {
    groups: groups.reduce(cleanse, []),
    columns,
  };
};

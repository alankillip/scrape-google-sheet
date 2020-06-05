module.exports = entry => ({
  content: entry.gs$cell.$t,
  link: entry.gs$cell.inputValue,
  col: Number(entry.gs$cell.col),
  row: Number(entry.gs$cell.row),
});

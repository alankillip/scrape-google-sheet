module.exports = (cell) => {
  if (cell.link.indexOf('HYPERLINK') > -1) {
    const regex = new RegExp(/=HYPERLINK\("(.*)",/);
    const extractedHypeLinkData = regex.exec(cell.link);
    if (extractedHypeLinkData) {
      return extractedHypeLinkData[1];
    }
    console.warn('no url extracted from ', cell.content);
    return '';
  }
  console.warn('no hyperlink for ', cell.content);
  return '';
}

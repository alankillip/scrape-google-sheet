const fs = require('fs');
const axios = require('axios');
const links = require('./links');
const general = require('./general');
const psych = require('./psych-help');

const createTypescriptInterface = require('./utils/create-typescript-interface');

const sheetId = process.env.SHEET_ID;
const dataDirectory = `../${process.env.OUTPUT_DATA_PATH}/`;
const typescriptDirectory = `../${process.env.OUTPUT_TYPESCRIPT_PATH}/`;

if (!fs.existsSync(dataDirectory)) {
  fs.mkdirSync(dataDirectory);
}

if (!fs.existsSync(typescriptDirectory)) {
  fs.mkdirSync(typescriptDirectory);
}

const pages = {
  Links: { pageId: '2', processor: links },
  CommGroups: { pageId: '5', processor: general },
  SupportLocalBusiness: { pageId: '7', processor: general },
  Meetings: { pageId: '8', processor: general },
  WorkersRights: { pageId: '11', processor: general },
  PsychHelp: { pageId: '12', processor: psych },
};

const dataExtracted = title => (err, promise) => {
  console.log('dataExtracted', title, err);
};

const writeFile = (title, data, dir = dataDirectory, suffix = '.json') => {
  console.log('writing file for ', title);
  let fileContents = data;
  if (typeof (fileContents) !== 'string') {
    fileContents = JSON.stringify(data);
  }
  fs.writeFile(`${dir}/${title}${suffix}`, fileContents, dataExtracted(title));
};

const sheetExtracted = (pageKey, titleRow, startDataRow, columnsIds) => (data) => {
  console.log('sheetExtracted', data.data.feed.entry.length, ' cells');
  writeFile(pageKey, pages[pageKey].processor(data.data.feed.entry, titleRow, startDataRow, columnsIds, pageKey));
};

const extractSheet = async (pageKey) => {
  const sheetDataUrl = `https://spreadsheets.google.com/feeds/cells/${sheetId}/${pages[pageKey].pageId}/public/full?alt=json`;
  console.log('sheetDataUrl', sheetDataUrl);
  try {

    return await axios.get(sheetDataUrl);
  } catch (error) {
    console.error(error);
    return error;
  }
};

const extractData = (id, titleRow, startDataRow, fields) => {
  extractSheet(id).then(sheetExtracted(id, titleRow, startDataRow, fields));
  writeFile(id, createTypescriptInterface(id, fields.concat('category')), typescriptDirectory, '.ts');
};

module.exports = {
  extractData,
};

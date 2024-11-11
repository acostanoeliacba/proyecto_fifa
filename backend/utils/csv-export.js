const { parse } = require('json2csv');
exports.toCSV = (data) => parse(data);

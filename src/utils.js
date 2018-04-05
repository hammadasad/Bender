// Imports
import fs from 'fs';
import path from 'path';

// Manage environment variables by reading files in config folder ie. port
import config from 'config';

// Writing data into csv files
import csvWriter from 'csv-write-stream';

// For logging
import morgan from 'morgan';
import tracer from 'tracer';

// Creating directories
import mkdirp from 'mkdirp';


// Logging wrapper
export const log = (() => {
  const logger = tracer.colorConsole();
  logger.requestLogger = morgan('dev');
  return logger;
})();

// delays
export const delay = time => new Promise((resolve) => {
  setTimeout(() => {
    resolve();
  }, time);
});

// Checking if a file exists
export const fileExists = async (filePath) => {
  let exists = true;
  try {
    fs.accessSync(filePath);
  } catch (err) {
    if (err.code === 'ENOENT') {
      exists = false;
    } else {
      throw err;
    }
  }
  return exists;
};

// Writing to our CSV files
export const writeToCsv = ({ headers, records, filePath }) => {
  const writer = csvWriter({ headers });
  writer.pipe(fs.createWriteStream(filePath));
  records.forEach(r => writer.write(r));
  writer.end();
};

// Retrieving directories
export const getReportFilesDir = () => {
  let reportFilesDir;
  try {
    reportFilesDir = path.join(__dirname, `../${config.get('reportFilesDir')}`);
    mkdirp.sync(reportFilesDir);
    return reportFilesDir;
  } catch (err) {
    throw err;
  }
};

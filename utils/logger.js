const getInfoLog = (method, url) => {
  console.log(`INFO (${new Date().toUTCString()}): ${method} - ${url}`);
};

const getErrorLog = (url) => {
  console.warn(`ERROR (${new Date().toUTCString()}): requested url ${url} doesn't exist.`);
};

const getProcessLog = (message) => {
  console.log(`PROCESS (${new Date().toUTCString()}): ${message}`);
};

module.exports = {
  getInfoLog,
  getErrorLog,
  getProcessLog,
};

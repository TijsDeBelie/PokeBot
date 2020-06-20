let { players } = require("./dataStore.js");
const fs = require("fs");

const savePlayers = () => {
  let data = JSON.stringify(players, null, 2);
  fs.writeFile("storage.json", data, (err) => {
    if (err) throw err;
    console.log("Data written to file");
  });
};

module.exports = savePlayers;

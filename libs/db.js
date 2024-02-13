// Setup
const fs = require("fs");
const path = require("path");

// Database inital structures
const DATABASE_STRUCTS = require("../config").db_structs;
const DATABASE_NAMES = Object.keys(DATABASE_STRUCTS);

// db/ folder
function DBFolderExist() {
    return fs.existsSync(path.join(__dirname, "../db"));
}
function makeDBFolder() {
    if (!DBFolderExist()) fs.mkdirSync(path.join(__dirname, "../db"));
    return DBFolderExist();
}

// Databases
function doesDBExist(name) {
    return fs.existsSync(path.join(__dirname, `../db/${name}.json`));
}
function getMissingDBs() {
    let missing = [];

    DATABASE_NAMES.forEach(function (name) {
        if (!doesDBExist(name)) missing.push(name);
    });

    return missing;
}
function makeDB(name) {
    if (!doesDBExist(name)) {
        fs.writeFileSync(path.join(__dirname, `../db/${name}.json`), JSON.stringify(DATABASE_STRUCTS[name]), "utf-8");
    }
    return doesDBExist(name);
}
function makeAllDBs() {
    let made = [];
    DATABASE_NAMES.forEach(function (name) {
        makeDB(name);
        made.push(name);
    });
    return made;
}

// Init Function
function initDatabases(callback) {
    makeDBFolder();
    makeAllDBs();
    callback();
}

// Exports
module.exports = initDatabases;
module.exports.DBFolderExist = DBFolderExist;
module.exports.makeDBFolder = makeDBFolder;
module.exports.getMissingDBs = getMissingDBs;
module.exports.makeAllDBs = makeAllDBs;
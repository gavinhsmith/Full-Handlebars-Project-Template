// Setup
const http = require("http");
const config = require("./config");

// Libs
const initDatabases = require("./libs/db");
const logger = require("./libs/logger");
const express = require("./libs/express");

// Create Folders
logger.debug("Initiating Program...");
initDatabases(_ => {
    logger.debug("Initiated!");
});

// Server
const server = http.createServer(express);

// Launch
server.listen(config.port, _ => {
    logger.info(`Started at *:${config.port}!`);
})
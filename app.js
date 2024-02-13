// Setup
const http = require("http");
const config = require("./config");
const {initFiles} = require("./libs/init");
const logger = require("./libs/logger");
const express = require("./libs/express");

// Create Folders
logger.debug("Initiating Program...");
initFiles(_ => {
    logger.debug("Initiated!");
});

// Server
const server = http.createServer(express);

// Launch
server.listen(config.port, _ => {
    logger.info("Started!");
})
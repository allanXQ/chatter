const { Client, LocalAuth, MessageMedia } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
const fs = require("fs");
const path = require("path");
const log = require("./logger"); // Assuming you have a logger utility

const SESSION_FILE_PATH = path.join(__dirname, "session.json");
let sessionCfg;

if (fs.existsSync(SESSION_FILE_PATH)) {
  sessionCfg = require(SESSION_FILE_PATH);
}

// Configuration options for the client
const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: { headless: true }, // Run puppeteer in headless mode
  session: sessionCfg,
});

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
  log.info("QR Code received, scan to log in.");
});

client.on("ready", () => {
  log.info("Client is ready!");
});

client.on("authenticated", (session) => {
  log.info("Client is authenticated");
  fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), (err) => {
    if (err) {
      log.error(err);
    }
  });
});

client.on("auth_failure", (msg) => {
  log.error("Authentication failure", msg);
  fs.unlinkSync(SESSION_FILE_PATH); // Remove the session file if authentication fails
});

client.on("disconnected", (reason) => {
  log.info("Client was logged out", reason);
  fs.unlinkSync(SESSION_FILE_PATH);
  client.initialize(); // Reinitialize client
});

// Initialize the client
client.initialize();

module.exports = { client, MessageMedia };

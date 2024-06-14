const { Client, LocalAuth, MessageMedia } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
const fs = require("fs");
const path = require("path");
const { logger } = require("../utils");

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
  logger.info("QR Code received, scan to logger in.");
});

client.on("ready", () => {
  logger.info("Client is ready!");
});

client.on("authenticated", (session) => {
  logger.info("Client is authenticated");
  //get all contacts and chats
  //extract groups and group members & id
  client.getContacts().then((contacts) => {
    fs.writeFile(
      path.join(__dirname, "contacts.json"),
      JSON.stringify(contacts),
      (err) => {
        if (err) {
          logger.error(err);
        }
      }
    );
  });
  client.getChats().then((chats) => {
    fs.writeFile(
      path.join(__dirname, "chats.json"),
      JSON.stringify(chats),
      (err) => {
        if (err) {
          logger.error(err);
        }
      }
    );
  });
  fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), (err) => {
    if (err) {
      logger.error(err);
    }
  });
});

client.on("auth_failure", (msg) => {
  logger.error("Authentication failure", msg);
  fs.unlinkSync(SESSION_FILE_PATH); // Remove the session file if authentication fails
});

client.on("disconnected", (reason) => {
  logger.info("Client was logged out", reason);
  fs.unlinkSync(SESSION_FILE_PATH);
  client.initialize(); // Reinitialize client
});

// Initialize the client
client.initialize();

module.exports = { client, MessageMedia };

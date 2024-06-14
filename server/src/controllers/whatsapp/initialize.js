const { whatsappClient } = require("../../utils");

const clientInitialize = async (req, res) => {
  whatsappClient.initialize();
};

module.exports = clientInitialize;

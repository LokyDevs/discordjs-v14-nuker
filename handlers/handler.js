/**
 * @author B1BXONTY
 * @url https://github.com/b1bxonty
 */

const fs = require("fs");
const config = require("../settings/config");
const BOT = require("./Client");

/**
 *
 * @param {BOT} client
 */
module.exports = async (client) => {
  const { guildID, embed: ee } = client.config;
  // LOADING SLASH COMMANDS
  try {
    let arrayOfcommands = [];
    fs.readdirSync("./Commands").forEach((cmd) => {
        let pull = require(`../Commands/${cmd}`);
        if (pull.name) {
          client.commands.set(pull.name, pull);
          arrayOfcommands.push(pull);
        }
    });
    client.on("ready", async () => {
      // // for global slash commands
      client.guilds.cache.get(config.controlguild).commands.set(arrayOfcommands);
       client.user.setActivity({
        type: 0,
        name: "GitHub/@b1bxonty"})
    });
    console.log(`${client.commands.size} Slash Commands Loaded`);
  } catch (e) {
    console.log(e);
  }

  
};

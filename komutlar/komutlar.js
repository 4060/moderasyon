const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
    try {
      
      let embed = new Discord.MessageEmbed()
    .setColor('f5f5f5')
     .setDescription(`Komut listesinde ${client.commands.size} adet komut bulunmaktadır.\nBulunan komutlar sırasıyla \n${client.commands.map(props => `\`${props.help.name}\``).join(" - ")} olarak bulunmaktadır.`);
     
      await message.channel.send(embed).then(m =>m.delete({timeout: 120000}))
    } catch (e) {
        throw e;
    }
}

module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["commands"],
  permLevel: 0
};

module.exports.help = {
  name: 'komutlar',
  description: 'Botta bulunan tüm komutları gösterir',
  usage: 'commands'
};
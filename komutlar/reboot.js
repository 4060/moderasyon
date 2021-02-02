const Discord = require("discord.js");
const bot = new Discord.Client();
const ayarlar = require("../ayarlar.json");
let emoji = (':tik1:')
module.exports.run = async (bot, message, args) => {
  if (message.author.id !== ayarlar.sahip)
  if (message.author.id !== ayarlar.admin)
    return message.channel.send(
      "Geliştiricim değilsiniz bu yüzden bu komutu kullanamazsınız"
    );

  message.channel.send(`${emoji} Sistem yenilemesi başarılı.`);
  message.delete(60).then(msg => {
    console.log(`✅ | Bot Yeniden Başlatıldı...`);

    process.exit(0);
  });
};
module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["r", "reboot", "yenile", "yeniden başlat"],
  permLevel: 0
};

module.exports.help = {
  name: "reboot",
  description: "",
  usage: "reboot"
};
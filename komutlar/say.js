const Discord = require('discord.js');

exports.run = async (client, message, args) => {
    if (!message.guild) return message.author.send('Amacın ne knk:D');
    if (message.author.bot) return;
    let i = 1;
        const botssize = message.guild.members.cache.filter(m=>m.user.bot).map(m=>`${i++} - <@${m.id}>`);
    const voiceChannels = message.guild.channels.filter(c => c.type === 'voice');
    let count = 0;
    for (const [id, voiceChannel] of voiceChannels) count += voiceChannel.members.cache.size;
  let tag = 'Tag'//Tagınızı yazın
    const rademoon = new Discord.MessageEmbed()
        .setColor("f5f5f5")
        .addField("Sunucudaki üye sayısı", message.guild.memberCount)
        .addField("Çevrimiçi üye sayısı", message.guild.members.cache.filter(m => !m.user.bot && m.user.presence.status !== "offline").size)
        .addField("Seslideki üye sayısı", count)
        .addField("Tagdaki üye sayısı", message.guild.members.cache.filter(m => m.user.username.includes(tag)).size)
        .addField("Sunucu da bulunan boost sayısı", message.guild.premiumSubscriptionCount|| '0')
        .addField("Sunucu da bulunan bot sayısı", message.guild.members.cache.filter(m=>m.user.bot).size)
       .setFooter(`CodeArius`)
    message.channel.send(rademoon);

}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['sayı'],
    permLevel: 0
};

exports.help = {
    name: 'say',
    description: 'Say',
}
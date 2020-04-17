const Discord = require('discord.js');
const config = require('./config.json');
const client = new Discord.Client(config.token);
const hook = new Discord.WebhookClient(config.webhookID, config.webhookToken);
client.login(process.env.test_bot);
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
  client.user.setActivity('everything', { type: 'WATCHING' });
});
client.on('messageUpdate', (oldM, newM) => {
  const embed = new Discord.MessageEmbed()
    .setTitle('Message Update')
    .addField('Channel', oldM.channel.name, false)
    .addField('Old Message', oldM.content, true)
    .addField('New Message', newM.content, true)
    .setTimestamp()
    .setAuthor(oldM.author.username, oldM.author.avatarURL());
  hook.send(embed);
});
client.on('messageDelete', (message) => {
  const embed = new Discord.MessageEmbed()
    .setTitle('Message Deleted')
    .addField('Channel', message.channel.name, false)
    .addField('Message', message.content, true)
    .setTimestamp()
    .setAuthor(message.author.username, message.author.avatarURL());
  hook.send(embed);
});
client.on('message', (message) => {
  if (
    message.content
      .toLowerCase()
      .includes('discord.gg' || 'discordapp.com/invite')
  ) {
    const embed = new Discord.MessageEmbed()
      .setTitle('Invite posted')
      .addField('Channel', message.channel.name, false)
      .addField('Message', message.content, true)
      .setTimestamp()
      .setAuthor(message.author.username, message.author.avatarURL());
    hook.send(embed);
  }
});

const config = require('../../config');

class MessageController {
  handleMessage(message) {
    if (message.content[ 0 ] !== config.prefix) return;
    const isBot = message.author.bot;
    const isGlobalMessage = this.global;

//removed !isBot &&
    if (isGlobalMessage) {
      const date = new Date();
      console.log(`[${date.toUTCString()}] ${message.author.username}: ${message.content}`);
      this.handler(message);
    }
  }
}

module.exports = MessageController;
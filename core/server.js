const client = require('./client');

class Server {
  constructor() {
    if (client.readyAt) {
      this.getServer();
    } else {
      client.on('ready', () => {
        console.log(`I am ready... Are You?`);
        this.getServer();
      })
    }
  }

  getServer() {
    this.server = client.guilds.first();
    this.channel = this.server.channels.find('name', 'general');
  }
  getMemberById(id) {
    return this.server.members.find('id', id);
  }

  send(message) {
    this.channel.send(message);
  }
}

module.exports = new Server();
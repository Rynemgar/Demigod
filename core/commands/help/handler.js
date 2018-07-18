const MessageController = require('../message-controller')

const daemon = require('turtlecoin-rpc').TurtleCoind

const rpc = new daemon({
  host: process.env.DAEMON_HOST,
  port: process.env.DAEMON_PORT,
  timeout: process.env.DAEMON_TIMEOUT
})

class helpCommand extends MessageController {
  constructor () {
    super()
    this.global = true
    this.cooldown = 20000
  }

  handler (message) {
    if (this.lastUsed + this.cooldown > Date.now()) return
    this.lastUsed = Date.now()

    message.channel.send('```hashrate \ndifficulty \nheight \nsupply \nreward```')
  }
}

module.exports = new helpCommand()
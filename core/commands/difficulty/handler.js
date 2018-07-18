const MessageController = require('../message-controller')

const daemon = require('turtlecoin-rpc').TurtleCoind

const rpc = new daemon({
  host: process.env.DAEMON_HOST,
  port: process.env.DAEMON_PORT,
  timeout: process.env.DAEMON_TIMEOUT
})

class difficultyCommand extends MessageController {
  constructor () {
    super()
    this.global = true
    this.cooldown = 20000
  }

  handler (message) {
    if (this.lastUsed + this.cooldown > Date.now()) return
    this.lastUsed = Date.now()

    rpc.getInfo()
    .then((response) => {
      var count = response.difficulty.toLocaleString()

      message.channel.send('The difficulty is **' + count + '**.')
    }).catch((err) => {
      console.log(err)
    })
  }
}

module.exports = new difficultyCommand()
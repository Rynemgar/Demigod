const MessageController = require('../message-controller')
const request = require('request-promise-native')

class HashrateCommand extends MessageController {
  constructor () {
    super()
    this.global = true
    this.cooldown = 20000
  }

  handler (message) {
    if (this.lastUsed + this.cooldown > Date.now()) return
    this.lastUsed = Date.now()

    request({
      uri: 'http://explorer.athx.org/q/hashrate/',
      method: 'GET'
    }).then((response) => {
      var count = response
      message.channel.send(`The current network hashrate is ${count}h/s`)
      console.log(`Current network hashrate is ${count}`)
    }).catch((err) => {
      console.log(err)
    })
  }
}

module.exports = new HashrateCommand()
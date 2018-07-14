const MessageController = require('../message-controller')
const request = require('request-promise-native')

class SupplyCommand extends MessageController {
  constructor () {
    super()
    this.global = true
    this.cooldown = 20000
  }

  handler (message) {
    if (this.lastUsed + this.cooldown > Date.now()) return
    this.lastUsed = Date.now()

    request({
      uri: 'http://explorer.athx.org/q/supply/',
      method: 'GET'
    }).then((response) => {
      var count = response
      message.channel.send(`The total circulating supply is ${count}`)
      console.log(`Total circulating supply is ${count}`)
    }).catch((err) => {
      console.log(err)
    })
  }
}

module.exports = new SupplyCommand()
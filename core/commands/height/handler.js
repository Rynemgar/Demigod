const MessageController = require('../message-controller')
const request = require('request-promise-native')

class HeightCommand extends MessageController {
  constructor () {
    super()
    this.global = true
    this.cooldown = 20000
  }

  handler (message) {
    if (this.lastUsed + this.cooldown > Date.now()) return
    this.lastUsed = Date.now()

    request({
      uri: 'http://explorer.athx.org/q/height/',
      method: 'GET'
    }).then((response) => {
      var count = response
      console.log(`The current response from API is height ${response}`)
      message.channel.send(`The current height is ${count}`)
      console.log(`Current height is ${count}`)
    }).catch((err) => {
      console.log(err)
    })
  }
}

module.exports = new HeightCommand()
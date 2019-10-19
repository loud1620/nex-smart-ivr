"use strict"
const app = require('express')()
const bodyParser = require('body-parser')
const path = require('path')
const port = process.env.PORT || 3000
const webhooks = 'http://76e4ca33.ngrok.io'

app.use(bodyParser.json())

app.get("/", function(req, resp){
  resp.sendFile('index.html', {root: path.join(__dirname, './files')})
})

app.get('/webhooks/answer', (req, res) => {
  const ncco = [
    {
      action: 'talk',
      voiceName : "Kendra",
      bargeIn: true,
      text: "<speak><break time='1s' /><prosody volume='loud'>Hello </prosody><break time='0.5s' /><prosody rate='fast'> and welcome to </prosody> <prosody pitch='x-low'>HSBC customer assistance center.</prosody><break time='2s' />For account balance enquiry,<break time='0.5s' /> press 1.<break time='1s' /> For funds transfer,<break time='0.5s' /> press 2 <break time='1s' />or press 3 to transfer to an agent.<break time='10'/></speak>"
    },
    {
      action: 'input',
      eventUrl: [`https://morning-refuge-61975.herokuapp.com/webhooks/dtmf`]
    }
  ]

  res.json(ncco)
})

app.post('/webhooks/events', (req, res) => {
  console.log(req.body)
  res.sendStatus(200);
})

app.post('/webhooks/dtmf', (req, res) => {
  console.log(req.body)
  const ncco = [
    {
      action: 'talk',
      text: `You pressed ${req.body.dtmf}`
    }
  ]


  res.json(ncco)
})

app.listen(port)
console.log("Server Status: => Active\nCurrent Mode: => Running...")

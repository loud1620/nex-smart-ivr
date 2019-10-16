"use strict"
const app = require('express')()
const bodyParser = require('body-parser')
const path = require("path")
const port = process.env.PORT || 3000

app.use(bodyParser.json())

app.get("/", function(req, resp){
  resp.sendFile('index.html', {root: path.join(__dirname, './files')})
})

app.get('/webhooks/answer', (req, res) => {
  const ncco = [{
      action: 'talk',
      voiceName : "Kendra",
      bargeIn: true,
      text: 'Hello. and welcome to HSBC customer care center, please provide your customer ID'
    },
    {
      action: 'input',
      maxDigits: 1,
      eventUrl: [req.protocol + "://" + req.get('host') + "/webhooks/dtmf"]
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
  const ncco = [{
    action: 'talk',
    text: `You pressed ${req.body.dtmf}`
  }]

  res.json(ncco)
})

app.listen(port)
console.log("Server Status: => Active\nCurrent Mode: => Running...")

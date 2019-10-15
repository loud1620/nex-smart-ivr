const app = require('express')()
const bodyParser = require('body-parser')

app.use(bodyParser.json())

app.get('/webhooks/answer', (req, res) => {
  const ncco = [{
      action: 'talk',
      voiceName : "Kendra",
      bargeIn: true,
      text: 'Hello. and welcome to HSBC customer care center, please provide your customer ID'
    },
    {
      action: 'input',
      voiceName : "Kendra",
      maxDigits: 10,
      eventUrl: [`http://3841331a.ngrok.io/webhooks/dtmf`]
    }
  ]

  res.json(ncco)
})

app.post('/webhooks/events', (req, res) => {
  console.log(req.body)
  res.send(200);
})

app.post('/webhooks/dtmf', (req, res) => {
  const ncco = [{
    action: 'talk',
    text: `You pressed ${req.body.dtmf}`
  }]

  res.json(ncco)
})

app.listen(3000)
console.log("Welcome...")

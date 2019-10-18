

const NEXMO_API_KEY = process.env.NEXMO_API_KEY
const NEXMO_API_SECRET = process.env.NEXMO_API_SECRET

const Nexmo = require('nexmo')

var nexmo = new Nexmo({
    apiKey: "7e4dd0ef",
    apiSecret: "sbgGDDc78415jgf"
}, {
    debug: true
});

nexmo.applications.create({
    name: 'new_smart_ivr',
    capabilities: {
        voice: {
            webhooks: {
                answer_url: {
                    address: "https://example.com/webhooks/answer",
                    http_method: "GET"
                },
                event_url: {
                    address: "https://example.com/webhooks/event",
                    http_method: "POST"
                }
            }
        }
    }
}, (error, result) => {
    if(error) {
        console.error(error);
    }
    else {
        console.log(result);
    }
});

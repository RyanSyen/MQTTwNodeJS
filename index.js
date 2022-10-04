
// connect to mqtt server
const mqtt = require('mqtt')

// set MQTT broker connection param
const host = 'broker.emqx.io'
const port = '1883'
const clientId = `mqtt_${Math.random().toString(16).slice(3)}`

// write MQTT connection function
const connectUrl = `mqtt://${host}:${port}`
const client = mqtt.connect(connectUrl, {
  clientId,
  clean: true,
  connectTimeout: 4000,
  username: 'emqx',
  password: 'public',
  reconnectPeriod: 1000,
})

// subscribe to topics
/*
- monitor connection status
- subscribe to topic in the callback function after connection is successful
- topic = /nodejs/mqtt 
*/
const topic = '/nodejs/mqtt/ryan'
client.on('connect', () => {
  console.log('Connected')
  client.subscribe([topic], () => {
    console.log(`Subscribe to topic '${topic}'`)
  })

  // publish msg where the msg needs to be published after the MQTT connection is successful, so we write it in the callback function after connection is successful
  client.publish(topic, 'nodejs mqtt test', { qos: 0, retain: false }, (error) => {
    if (error) {
      console.error(error)
    }
  })
})

// after subscribing successfully, then we use on function of receiving the message
// when msg is received, then we can get the topic & msg in the callback func
client.on('message', (topic, payload) => {
  console.log('Received Message:', topic, payload.toString())
})

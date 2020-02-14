import express from 'express';
import { createClient } from './server/create-client';
import { EventEmitter } from 'events';

class OnDataEmitter extends EventEmitter {}
const onData = new OnDataEmitter();


const app = express();
const client = createClient({
  exclusive: true,
  host: 'localhost',
  port: '9670'
});

client.on('data', (data) => {
  console.log('Receiving data!');
});

client.write(JSON.stringify({ data: true }))

app.get('/', (req, res) => {

  res.json({ status: 'ok' })
})


app.listen(8080, () => console.log("WEB APP IS RUNNING 8080"))
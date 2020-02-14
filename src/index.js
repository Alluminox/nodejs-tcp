import {createServer} from './server/create-server';

createServer({
  host: '0.0.0.0',
  port: 9670,
  exclusive: true
})
import { createClient } from './server/create-client';

createClient({
  host: 'localhost',
  port: '9670',
  exclusive: true
})
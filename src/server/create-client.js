import net from 'net';

export const createClient = ({ host, port, exclusive }) => {

  let timeout = 3000;
  let retrying = false;

  const config = {
    host,
    port,
    exclusive,
  }

  const client = net.Socket();

  const makeConnection = () => {
    client.connect(config.port, config.host)

  }

  client.on('connect', () => {
    console.log('[x] Connected to server');
    console.log({
      port: client.remotePort,
      host: client.remoteAddress
    }, 'has been connected!')

    retrying = false;
  });

  client.on('error', () => {
    if (!retrying) retrying = true;
    setTimeout(makeConnection, timeout)
  });

  client.on('close', () => {

    if (retrying) return false;

    console.log('Server has been closed');
    console.log(`Reconnecting ... in${timeout / 1000}s`);

    if (!retrying) retrying = true;
    setTimeout(makeConnection, timeout)
  });

  makeConnection();


  return client;

}


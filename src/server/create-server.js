import net from 'net';


export const createServer = ({ host, port, exclusive }) => {

  const config = { 
    host, 
    port, 
    exclusive 
  }

  const server = net.createServer();

  server.on('connection', (socket) => {
    console.log('new client connected', socket.remoteAddress);

    socket.on('data', (data) => {
      console.log('Receiving data from socket -> ', JSON.parse(data));
    });


    socket.on('error', (err) => {
      console.log('Socket has error -> ', err);


      // Remove from database
      socket.destroy(JSON.stringify({
        error: 'connection error',
        code: 500
      }));

      socket.end();
    });

  });

  server.listen(config);

  server.on('listening', () => {
    console.log('TCP Server is running on %j', config.port);
  })
  

  server.on('error', err => {
    if (err.code === 'EADDRINUSE') {
      setTimeout(() => {
        server.close();
        server.listen(config); // MAKE A SERVER
      }, 5000)
    } else {
      console.log({ err })
    }
  })

  
}


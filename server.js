const app = require('./app/app');
const colors = require('colors');
const port = process.env.PORT || 3001;

 const server = app.listen(process.env.PORT || 3001);
 console.log(colors.green(`Server is up on port ${port}!`));

 const shutdown = function() {
    console.log(colors.yellow('Server is shutting down'));
    server.close();
  };
  
  process.once('SIGINT', shutdown);
  process.once('SIGTERM', shutdown);
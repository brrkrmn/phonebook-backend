const express = require('./app');
const config = require('./utils/config')
const logger = require('./utils/logger');

// const morgan = require('morgan');
// app.use(morgan(':method :url :status :data'));
// morgan.token('data', (req) => {
//   return(JSON.stringify(req.body));
// })

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})
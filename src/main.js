const app = require('./app')
const logger = require('./logger')

const port = Number(process.env.PORT) || 3000

function whenListening() {
  logger.info(`Listening on port ${port}`)
}

app.listen(port, whenListening)

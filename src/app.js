const express = require('express')
const logger = require('./logger')

const app = express()

app.get('/:floor,:direction', (req, res) => {
  const { floor, direction } = req.params
  logger.info(`Elevator requested at floor "${floor}" with direction "${direction}"`)
  res.json({})
})

module.exports = app

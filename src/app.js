const express = require('express')
const logger = require('./logger')
const { ElevatorPlatformCommand, ElevatorCabinCommand } = require('./commands')

const app = express()

app.get('/:floor,:direction', (req, res) => {
  const { floor, direction } = req.params
  logger.info(`Elevator requested at floor "${floor}" with direction "${direction}"`)
  const command = ElevatorPlatformCommand.parse(floor, direction)
  logger.info('Parsed command:', command)
  res.json({})
})

app.get('/cabin/:floor', (req, res) => {
  const { floor } = req.params
  logger.info(`Elevator requested to floor "${floor}" from cabin`)
  const command = ElevatorCabinCommand.parse(floor)
  logger.info('Parsed command:', command)
  res.json({})
})

module.exports = app

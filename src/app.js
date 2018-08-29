const express = require('express')
const logger = require('./logger')
const { ElevatorPlatformCommand, ElevatorCabinCommand, isParseError } = require('./commands')

const app = express()

app.get('/:floor,:direction', (req, res) => {
  const { floor, direction } = req.params
  logger.info(`Elevator requested at floor "${floor}" with direction "${direction}"`)
  try {
    const command = ElevatorPlatformCommand.parse(floor, direction)
    logger.info('Parsed command:', command)
  } catch (err) {
    if (isParseError(err)) {
      res.status(400).json({message: err.message})
      return
    } else {
      throw err
    }
  }
  res.json({})
})

app.get('/:floor', (req, res) => {
  const { floor } = req.params
  logger.info(`Elevator requested to floor "${floor}" from cabin`)
  try {
    const command = ElevatorCabinCommand.parse(floor)
    logger.info('Parsed command:', command)
  } catch (err) {
    if (isParseError(err)) {
      res.status(400).json({message: err.message})
      return
    } else {
      throw err
    }
  }
  res.json({})
})

module.exports = app

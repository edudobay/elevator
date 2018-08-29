const express = require('express')
const logger = require('./logger')
const { ElevatorPlatformCommand, ElevatorCabinCommand, isParseError } = require('./commands')

const app = express()

function parseCommand(parse, resolve, reject) {
  let parsed
  try {
    parsed = parse()
  } catch (err) {
    if (isParseError(err)) {
      reject(err)
      return
    } else {
      throw err
    }
  }
  resolve(parsed)
}

function parseErrorHandler(req, res) {
  return err => {
    res.status(400).json({message: err.message})
  }
}

app.get('/:floor,:direction', (req, res) => {
  const { floor, direction } = req.params
  logger.info(`Elevator requested at floor "${floor}" with direction "${direction}"`)
  parseCommand(
    () => ElevatorPlatformCommand.parse(floor, direction),
    command => {
      logger.info('Parsed command:', command)
      res.json({})
    },
    parseErrorHandler(req, res)
  )
})

app.get('/:floor', (req, res) => {
  const { floor } = req.params
  logger.info(`Elevator requested to floor "${floor}" from cabin`)
  parseCommand(
    () => ElevatorCabinCommand.parse(floor),
    command => {
      logger.info('Parsed command:', command)
      res.json({})
    },
    parseErrorHandler(req, res)
  )
})

module.exports = app

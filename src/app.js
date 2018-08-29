const express = require('express')
const logger = require('./logger')

const app = express()

function parseFloor(floor) {
  const _floor = Number.parseInt(floor)
  if (Number.isNaN(_floor)) {
    throw new Error('invalid floor')
  }
  return _floor
}

const UP = Symbol('up')
const DOWN = Symbol('down')

const knownDirections = {
  'up': UP,
  '↑': UP,
  'down': DOWN,
  '↓': DOWN,
}

function parseDirection(direction) {
  const _direction = knownDirections[direction.toLowerCase()]
  if (!_direction) {
    throw new Error('invalid direction')
  }
  return _direction
}

class ElevatorPlatformCommand {
  constructor(floor, direction) {
    this.floor = floor
    this.direction = direction
  }

  static parse(floor, direction) {
    return new ElevatorPlatformCommand(
      parseFloor(floor),
      parseDirection(direction)
    )
  }
}

app.get('/:floor,:direction', (req, res) => {
  const { floor, direction } = req.params
  logger.info(`Elevator requested at floor "${floor}" with direction "${direction}"`)
  const command = ElevatorPlatformCommand.parse(floor, direction)
  logger.info('Parsed command:', command)
  res.json({})
})

module.exports = app

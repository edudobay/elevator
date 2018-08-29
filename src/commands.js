const UP = Symbol('up')
const DOWN = Symbol('down')

const knownDirections = {
  'up': UP,
  '↑': UP,
  'down': DOWN,
  '↓': DOWN,
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

class ElevatorCabinCommand {
  constructor(floor) {
    this.floor = floor
  }

  static parse(floor) {
    return new ElevatorCabinCommand(parseFloor(floor))
  }
}

function parseFloor(floor) {
  const _floor = Number.parseInt(floor)
  if (Number.isNaN(_floor)) {
    throw parseError('invalid floor')
  }
  return _floor
}

function parseDirection(direction) {
  const _direction = knownDirections[direction.toLowerCase()]
  if (!_direction) {
    throw parseError('invalid direction')
  }
  return _direction
}

function parseError(message) {
  const err = new Error(message)
  err.code = 'PARSE_ERROR'
  return err
}

function isParseError(err) {
  return err.code === 'PARSE_ERROR'
}

module.exports = { ElevatorPlatformCommand, ElevatorCabinCommand, isParseError }

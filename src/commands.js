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
    throw new Error('invalid floor')
  }
  return _floor
}

function parseDirection(direction) {
  const _direction = knownDirections[direction.toLowerCase()]
  if (!_direction) {
    throw new Error('invalid direction')
  }
  return _direction
}

module.exports = { ElevatorPlatformCommand, ElevatorCabinCommand }

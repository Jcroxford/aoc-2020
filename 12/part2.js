const { pullDataForDay } = require('../utils/importData')

function part2() {
  const data = pullDataForDay(12)
    .split('\n')
    .map(direction => [direction.slice(0, 1), Number(direction.slice(1))])
    .reduce(({ directionValues, waypoint, currentDirection }, [ command, value ]) => {
      let forward
      let sideways
      if(command == 'L') {
        forward = waypoint[currentDirection]
        sideways = waypoint[(currentDirection - 1 + 4) % 4]
        currentDirection = (currentDirection - (value / 90) + 4) % 4

        waypoint = [ 0, 0, 0, 0]
        waypoint[currentDirection] = forward
        waypoint[(currentDirection - 1 + 4) % 4] = sideways
      }
      else if(command == 'R') {
        forward = waypoint[currentDirection]
        sideways = waypoint[(currentDirection - 1 + 4) % 4]
        currentDirection = (currentDirection + (value / 90)) % 4

        waypoint = [ 0, 0, 0, 0]
        waypoint[currentDirection] = forward
        waypoint[(currentDirection - 1 + 4) % 4] = sideways
      }
      else if(command == 'N') {
        if(currentDirection == 2 || currentDirection == 3) {
          waypoint[2] -= value
        } else {
          waypoint[0] += value
        }
      }
      else if(command == 'E') {
        if(currentDirection == 3 || currentDirection == 0) {
          waypoint[3] -= value
        } else {
          waypoint[1] += value
        }
      }
      else if(command == 'S') {
        if(currentDirection == 0 || currentDirection == 1) {
          waypoint[0] -= value
        } else {
          waypoint[2] += value
        }
      }
      else if(command == 'W') {
        if(currentDirection == 1 || currentDirection == 2) {
          waypoint[1] -= value
        } else {
          waypoint[3] += value
        }
      }
      else if(command == 'F') {
        directionValues[currentDirection] += waypoint[currentDirection] * value
        directionValues[(currentDirection - 1 + 4) % 4] += waypoint[(currentDirection - 1 + 4) % 4] * value
      }
    return { directionValues, waypoint, currentDirection }
    }, { directionValues: [ 0, 0, 0, 0 ], waypoint: [ 1, 10, 0, 0 ], currentDirection: 1 }) // 'north','east','south','west'

  const [ N, E, S, W ] = data.directionValues
  return Math.abs(N - S) + Math.abs(E - W)
}

module.exports = { part2 }

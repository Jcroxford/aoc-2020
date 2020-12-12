const { pullDataForDay } = require('../utils/importData')

function part1() {
  const data = pullDataForDay(12)
    .split('\n')
    .map(direction => [direction.slice(0, 1), Number(direction.slice(1))])
    .reduce(({ directionValues, currentDirection }, [ command, value ]) => {
        if(command == 'L') currentDirection = (currentDirection - (value / 90) + 4) % 4
        else if(command == 'R') currentDirection = (currentDirection + (value / 90)) % 4
        else if(command == 'N') directionValues[0] += value
        else if(command == 'E') directionValues[1] += value
        else if(command == 'S') directionValues[2] += value
        else if(command == 'W') directionValues[3] += value
        else if(command == 'F') directionValues[currentDirection] += value

      return { directionValues, currentDirection }
    }, { directionValues: [ 0, 0, 0, 0 ], currentDirection: 1 }) // [ 'N','E','S','W' ]

  const [ N, E, S, W ] = data.directionValues
  return Math.abs(N - S) + Math.abs(E - W)
}

module.exports = { part1 }

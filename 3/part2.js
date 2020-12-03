const { pullDataForDay } = require('../utils/importData')
const { part1 } = require('./part1')

function part2() {
  const entries = pullDataForDay(3)

  // [x, y] pair
  const paths = [[1, 1],[3, 1],[5, 1],[7, 1],[1, 2]]

  return paths.map(([x, y]) => part1(x, y)).reduce((total, next) => total *= next, 1)
}

console.log(part2())
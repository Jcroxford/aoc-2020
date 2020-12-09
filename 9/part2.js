const { pullDataForDay } = require('../utils/importData')
const { part1 } = require('./part1')

function part2() {
  const data = pullDataForDay(9).split('\n').map(Number)
  const badNum = part1()

  while(data.length) {
    for (let i = 1; i < data.length; i++) {
      const result = data.slice(0, i).reduce((total, next) => total += next)

      if(result > badNum) break
      if(result == badNum) {
        const properSet = data.slice(0, i).sort((a, b) => a - b)
        return properSet[0] + properSet[properSet.length - 1]
      }
    }

    data.shift()
  }
}

module.exports = { part2 }
part2()
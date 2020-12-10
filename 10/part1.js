const { pullDataForDay } = require('../utils/importData')

function part1() {
  const data = pullDataForDay(10)
    .split('\n')
    .map(Number)
    .sort((a,b) => a - b)
    .reduce((dict, next) => {
      const increase = next - dict.currentJoltage

      if(increase > 3) throw new Error('greater than 3')
      dict[increase]++
      dict.currentJoltage = next
      return dict
    }, { currentJoltage: 0, 1: 0, 2: 0, 3: 1 })

  return data[1] * data[3]
}

module.exports = { part1 }

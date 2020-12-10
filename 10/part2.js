const { pullDataForDay } = require('../utils/importData')

function part2() {
  const data = pullDataForDay(10)
    .split('\n')
    .map(Number)
    .sort((a,b) => a - b)

    // add start and end points
    data.push(data[data.length - 1] + 3)
    data.unshift(0)
    let i = 0
    let total = 1
    while(i < data.length) {
      const currentNum = data[i]
      if(data.slice(i, i + 5)[4] - currentNum == 4) {
        // 2^3 - 1. can't skip all 3
        total *= 7
        i += 5
      } else if(data.slice(i, i + 4)[3] - currentNum == 3) {
        total *= 4
        i += 4
      } else if(data.slice(i, i + 3)[2] - currentNum == 2) {
        total *= 2
        i += 3
      } else {
        i++
      }
    }

    return total
}

module.exports = { part2 }

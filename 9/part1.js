const { pullDataForDay } = require('../utils/importData')

function part1() {
  const data = pullDataForDay(9).split('\n').map(Number)

  const preambleSize = 25

  const previousSet = data.slice(0, preambleSize)
  const restOfSet = data.slice(preambleSize)

  for(let num of restOfSet) {
    const matches = previousSetMatchesNextNum(previousSet, num)

    if(!matches) return num
    previousSet.push(num)
    previousSet.shift()
  }
  return -1
}

function previousSetMatchesNextNum(previousSet, nextNum) {
  for (let i = 0; i < previousSet.length; i++) {
    const firstNum = previousSet[i]
    for (let j = i+ 1; j < previousSet.length; j++) {
      const secondNum = previousSet[j]

      if(firstNum + secondNum == nextNum) return true
    }
  }
  return false
}

module.exports = { part1 }
part1()
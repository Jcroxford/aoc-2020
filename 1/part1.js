const { pullDataForDay } = require('../utils/importData')

function part1() {
  const entries = pullDataForDay(1).split('\n').map(Number)

  for(let entry of entries) {
    for(let entryTwo of entries) {
      if(entry + entryTwo == 2020) {
        return entry * entryTwo
      }
    }
  }
}

module.exports = { part1 }

const { pullDataForDay } = require('../utils/importData')

function part2() {
  const entries = pullDataForDay(1).split('\n').map(Number)

  for(let entry of entries) {
    for(let entryTwo of entries) {
      for(let entryThree of entries) {
        if(entry + entryTwo + entryThree == 2020) {
          return entry * entryTwo * entryThree
        }
      }
    }
  }
}

module.exports = { part2 }

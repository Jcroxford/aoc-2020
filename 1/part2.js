const { pullDataForDay } = require('../utils/importData')

function find2020Entries() {
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

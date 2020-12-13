const { pullDataForDay } = require('../utils/importData')

function part1() {
  let [ earliestDeparture, busIds ] = pullDataForDay(13)
    .split('\n')

  busIds = busIds.split(',').filter(x => x != 'x').map(Number)
  earliestDeparture = Number(earliestDeparture)
  let actualDeparture = earliestDeparture
  while(true) {
    for(let busId of busIds) {
      if(!(actualDeparture % busId)) return (actualDeparture - earliestDeparture) * busId
    }

    actualDeparture++
  }
}

module.exports = { part1 }

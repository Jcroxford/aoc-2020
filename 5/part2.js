const { pullDataForDay } = require('../utils/importData')
const { getSortedSeatIds } = require('./part1')

function part2() {
  const seats = getSortedSeatIds()

  for(let i = 0; i < seats.length; i++) {
    const currentSeat = seats[i]
    const prospectSeat = seats[i+1]

    if(currentSeat - prospectSeat > 1) return currentSeat - 1
  }
}

module.exports = { part2 }

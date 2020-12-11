const { pullDataForDay } = require('../utils/importData')

function part1() {
  const occupied = '#'
  const vacant = 'L'
  const floor = ''
  const data = pullDataForDay(11)
    .split('\n')
    .map(r => r.split(''))
    

  let previousIteration = []
  let currentIteration = data
  while(previousIteration.map(r => r.join('')).join('') !== currentIteration.map(r => r.join('')).join('')) {
    previousIteration = currentIteration

    currentIteration = currentIteration.map((row, rI, rows) => row.map((col, cI) => {
      if(col == floor) return col

      let adjacentOccupied = 0
      for (let r = rI - 1; r < rI + 2; r++) {
        for (let c = cI - 1; c < cI + 2; c++) {
          if(r == rI && c == cI) continue

          if(rows[r] && rows[r][c] === occupied) adjacentOccupied++
        }
      }

      if(col == vacant && adjacentOccupied == 0) return occupied
      if(col == occupied && adjacentOccupied >= 4) return vacant
      return col
    }))
  }
  return currentIteration
    .map(r => r
      .map(c => c == occupied ? 1 : 0)
      .reduce((total, next) => total += next)
    )
    .reduce((total, next) => total += next)
}

module.exports = { part1 }

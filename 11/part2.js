const { pullDataForDay } = require('../utils/importData')

function part2() {
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

    currentIteration = currentIteration.map((row, rI, rows) => row.map((col, cI, cols) => {
      if(col == floor) return col

      let adjacentOccupied = 0
      // look up
      for (let r = rI - 1; r >= 0; r--) {
        if(rows[r][cI] == occupied) {
          adjacentOccupied++
          break
        } else if(rows[r][cI] == vacant) {
          break
        }
      }
      // look down
      for (let r = rI + 1; r < rows.length; r++) {
        if(rows[r][cI] == occupied) {
          adjacentOccupied++
          break
        } else if(rows[r][cI] == vacant) {
          break
        }
      }

      // look left
      for (let c = cI - 1; c >= 0; c--) {
        if(rows[rI][c] == occupied) {
          adjacentOccupied++
          break
        } else if(rows[rI][c] == vacant) {
          break
        }
      }
      // look right
      for (let c = cI + 1; c < cols.length; c++) {
        if(rows[rI][c] == occupied) {
          adjacentOccupied++
          break
        } else if(rows[rI][c] == vacant) {
          break
        }
      }

      // look top left
      let r = rI - 1
      let c = cI - 1
      while(r >= 0 && c >= 0) {
        if(rows[r][c] == occupied) {
          adjacentOccupied++
          break
        } else if(rows[r][c] == vacant) {
          break
        } else {
          r--
          c--
        }
      }

      // look top right
      r = rI - 1
      c = cI + 1
      while(r >= 0 && c < cols.length) {
        if(rows[r][c] == occupied) {
          adjacentOccupied++
          break
        } else if(rows[r][c] == vacant) {
          break
        } else {
          r--
          c++
        }
      }

      // look bot left
      r = rI + 1
      c = cI - 1
      while(r < rows.length && c >= 0) {
        if(rows[r][c] == occupied) {
          adjacentOccupied++
          break
        } else if(rows[r][c] == vacant) {
          break
        } else {
          r++
          c--
        }
      }

      // look bot right
      r = rI + 1
      c = cI + 1
      while(r < rows.length && c < cols.length) {
        if(rows[r][c] == occupied) {
          adjacentOccupied++
          break
        } else if(rows[r][c] == vacant) {
          break
        } else {
          r++
          c++
        }
      }
      if(col == vacant && adjacentOccupied == 0) return occupied
      if(col == occupied && adjacentOccupied >= 5) return vacant

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

module.exports = { part2 }

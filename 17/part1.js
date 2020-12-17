const { pullDataForDay } = require('../utils/importData')

function part1() {
  const data = pullDataForDay(17)
    .split('\n')
    .map(x => x.split(''))


  let grid = [ data ]
  for (let i = 0; i < 6; i++) {
    // add new rows/layers that could contain a '#'
    grid = grid.map(x => [ new Array(x.length + 2).fill('.'), ...x.map(y => [ '.', ...y, '.' ]), new Array(x.length + 2).fill('.') ])
    grid.push(addNewZLayer(grid))
    grid.unshift(addNewZLayer(grid))

    grid = grid.map((currentZ, zI, grid) => currentZ.map((currentX, xI) => currentX.map((currentY, yI) => {
      let neighbors = 0
      for (let z = zI - 1; z < zI + 2; z++) {
        if(!grid[z]) continue
        for (let x = xI - 1; x < xI + 2; x++) {
          if(!grid[z][x]) continue
          for (let y = yI - 1; y < yI + 2; y++) {
            if(!grid[z][x][y]) continue
            if(z == zI && x == xI && y == yI) continue

            if(grid[z][x][y] == '#') neighbors++
          }
        }
      }

      if(currentY == '.' && neighbors == 3) return '#'
      if(currentY == '#' && (neighbors == 2 || neighbors == 3)) return '#'
      else return '.'
    })))
  }

  return grid
    .reduce((list, z) => [ ...list, ...z], [])
    .reduce((listX, x) => [ ...listX, ...x ], [])
    .filter(x => x == '#')
    .length
}

function addNewZLayer(grid) {
  return new Array(grid[0].length).fill(new Array(grid[0][0].length).fill('.'))
}

module.exports = { part1 }

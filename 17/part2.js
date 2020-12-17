const { pullDataForDay } = require('../utils/importData')

function part2() {
  const data = pullDataForDay(17)
    .split('\n')
    .map(x => x.split(''))


  let grid = [[ data ]]

  for (let i = 0; i < 6; i++) {
    // add new rows/layers that could contain a '#'
    grid = grid.map(zGrid => {
      zGrid = zGrid.map(x => [ new Array(x.length + 2).fill('.'), ...x.map(y => [ '.', ...y, '.' ]), new Array(x.length + 2).fill('.') ])
      zGrid.push(addNewZLayer(zGrid))
      zGrid.unshift(addNewZLayer(zGrid))

      return zGrid
    })
    grid.push(addNewWLayer(grid))
    grid.unshift(addNewWLayer(grid))

    grid = grid.map((currentW, wI, grid) => currentW.map((currentZ, zI) => currentZ.map((currentX, xI) => currentX.map((currentY, yI) => {
      let neighbors = 0
      for (let w = wI - 1; w < wI + 2; w++) {
        if(!grid[w]) continue
        for (let z = zI - 1; z < zI + 2; z++) {
          if(!grid[w][z]) continue
          for (let x = xI - 1; x < xI + 2; x++) {
            if(!grid[w][z][x]) continue
            for (let y = yI - 1; y < yI + 2; y++) {
              if(!grid[w][z][x][y]) continue
              if(w == wI && z == zI && x == xI && y == yI) continue

              if(grid[w][z][x][y] == '#') neighbors++
            }
          }
        }
      }

      if(currentY == '.' && neighbors == 3) return '#'
      if(currentY == '#' && (neighbors == 2 || neighbors == 3)) return '#'
      else return '.'
    }))))
  }

  return grid
    .reduce((list, w) => [ ...list, ...w], [])
    .reduce((list, z) => [ ...list, ...z], [])
    .reduce((listX, x) => [ ...listX, ...x ], [])
    .filter(x => x == '#')
    .length
}

function addNewZLayer(grid) {
  return new Array(grid[0].length).fill(new Array(grid[0][0].length).fill('.'))
}

function addNewWLayer(grid) {
  return new Array(grid[0].length).fill(addNewZLayer(grid[0]))
}

module.exports = { part2 }

const { pullDataForDay } = require('../utils/importData')

function part1(traverseX = 3, traverseY = 1) {
  const grid = pullDataForDay(3).split('\n').map(row => row.split(''))

  let currentX = 0
  let currentY = 0

  const height = grid.length
  const width = grid[0].length

  let treesEncountered = 0
  while(currentY < height) {
    const currentPosition = grid[currentY][currentX]
    if (currentPosition == '#') treesEncountered++

    currentX = (currentX + traverseX) % width
    currentY = (currentY + traverseY)
  }

  return treesEncountered
}

module.exports = { part1 }

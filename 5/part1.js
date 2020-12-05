const { pullDataForDay } = require('../utils/importData')

function part1() {
  return getSortedSeatIds()[0]
}

function getSortedSeatIds() {
  return pullDataForDay(5)
    .split('\n')
    .map(partition => [partition.slice(0, 7), partition.slice(7)])
    .map(([row, seat]) => [row.split(''), seat.split('')])
    .map(([row, seat]) => [
      spacePartition(127, 0, row, (char) => char === 'F' ? 0 : 1),
      spacePartition(7, 0, seat, (char) => char === 'L' ? 0 : 1)
    ])
    .map(([row, seat]) => row * 8 + seat)
    .sort((a, b) => b - a)
}

/**
 * @param {number} upperBound
 * @param {number} lowerBound
 * @param {string[]} chars
 * @param {function} parseCharCallback
 */
function spacePartition(upperBound, lowerBound, [ currentChar, ...chars], parseCharCallback) {
  const gap = Math.ceil((upperBound - lowerBound) / 2)

  // 0 means down 1 means up
  const direction = parseCharCallback(currentChar)

  if(!chars.length && direction) return upperBound
  if(!chars.length && !direction) return lowerBound
  if(!direction) return spacePartition(upperBound - gap, lowerBound, chars, parseCharCallback)
  if(direction) return spacePartition(upperBound, lowerBound + gap, chars, parseCharCallback)
}

module.exports = { part1, getSortedSeatIds }

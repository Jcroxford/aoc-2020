const { pullDataForDay } = require('../utils/importData')

function part1() {
  return pullDataForDay(6)
    .split(/\n\n/)
    .map(group => group.replace(/\n/g, '').split(''))
    .map(group => new Set(group).size)
    .reduce((total, next) => total += next, 0)
}


module.exports = { part1 }

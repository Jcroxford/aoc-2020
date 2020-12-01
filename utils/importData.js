const fs = require('fs')

/**
 * @param {number} day
 */
export function pullDataForDay(day) {
  return fs.readFileSync(`../${day}/input.txt`, 'utf-8')
}

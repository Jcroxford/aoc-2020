const fs = require('fs')

module.exports = {
  /**
   * @param {number} day
   */
  pullDataForDay(day) {
    return fs.readFileSync(`${__dirname}/../${day}/input.txt`, 'utf-8')
  }
}

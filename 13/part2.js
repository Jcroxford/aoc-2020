const { pullDataForDay } = require('../utils/importData')

function part2() {
  const [ _, data ] = pullDataForDay(13)
    .split('\n')

  const busIds = data
    .split(',')
    .map((x, i) => ({ value: x == 'x' ? 0 : Number(x), offset: i }))
    .filter(num => num.value)

  let t = busIds[0].value
  // start easy
  let incrementBy = 1
  for (let i = 0; i < busIds.length; i++) {
    const busId = busIds[i]

    // make sure we find a number that works for the current bus
    while(true) {
      // once we find a number that works for the current bus, we can start incrementing by
      // a multiple of it's any other previous bus values (reverse prime facotrization?)
      if((t + busId.offset) % busId.value == 0) {
        incrementBy *= busId.value
        break
      }
      // if we don't have a match for current bus, increment and keep looking
      t += incrementBy
    }
  }

  return t
}

module.exports = { part2 }

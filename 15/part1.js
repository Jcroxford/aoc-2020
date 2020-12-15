const { pullDataForDay } = require('../utils/importData')

function part1(upTo = 2020) {
  const startingData = pullDataForDay(15)
    .split(',')
    .map(Number)

  const dict = new Map()
  let previousAnswer = 0
  for (let i = 1; i <= upTo; i++) {
    if(!(i % 100000)) console.log(`${i / 1000000}M`)
    // give starting numbers
    if(i <= startingData.length) {
      if(!dict.get(startingData[i - 1])) dict.set(startingData[i - 1], new Map([['secondToLast', null], ['last', null]]))
      addTurnToDict(dict.get(startingData[i - 1]), i)
      previousAnswer = startingData[i - 1]
    } else if(dict.get(previousAnswer) && !(dict.get(previousAnswer).get('secondToLast'))) {
      previousAnswer = 0
      if(!dict.get(previousAnswer)) dict.set(previousAnswer, new Map([['secondToLast', null], ['last', null]]))
      addTurnToDict(dict.get(previousAnswer), i)
    } else {
      const last = dict.get(previousAnswer).get('last')
      const secondToLast = dict.get(previousAnswer).get('secondToLast')
      previousAnswer = last - secondToLast

      if(!dict.get(previousAnswer)) dict.set(previousAnswer, new Map([['secondToLast', null], ['last', null]]))
      addTurnToDict(dict.get(previousAnswer), i)
    }
  }
  return previousAnswer
}

function addTurnToDict(obj, turn) {
  if(!obj.get('last')) obj.set('last', turn)
  else {
    const temp = obj.get('last')
    obj.set('last', turn)
    obj.set('secondToLast', temp)
  }
}

module.exports = { part1 }

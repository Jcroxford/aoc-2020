const { pullDataForDay } = require('../utils/importData')

function part1() {
  const colorDict = buildColorDictionary()

  let bagsWithChosenColor = ['shiny gold']
  for (let validBag of bagsWithChosenColor) {
    for(let potentialOwner in colorDict) {
      if(colorDict[potentialOwner][validBag] && !~bagsWithChosenColor.findIndex(x => x == potentialOwner)) {
        bagsWithChosenColor.push(potentialOwner)
      }
    }
  }

  return bagsWithChosenColor.length - 1
}

function buildColorDictionary() {
  return pullDataForDay(7)
    .split('\n')
    .map((bag) => bag.split(' bags contain '))
    .map(([bag, contents]) => {

      return [
        bag,
        contents
          .replace('.', '')
          .split(', ')
          .map(content => content.replace('no other', '0').replace(/(\d+)(.*)(bags|bag)/, '$1, $2').split(', ').map(x => x.trim()))
          .reduce((dict, [count, color]) => count == '0' ? dict : { [color]: count, ...dict }, {})
      ]
    })
    .reduce((dict, [color, contents]) => ({ [color]: contents, ...dict }), {})
}

module.exports = { part1, buildColorDictionary }

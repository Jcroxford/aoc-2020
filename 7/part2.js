const { buildColorDictionary } = require('./part1')

function part2() {
  const colorDict = buildColorDictionary()
  return count(colorDict, 'shiny gold')
}

function count(colorDict, color) {
  if(!Object.keys(colorDict[color]).length) return 0

  return Object.keys(colorDict[color]).reduce((total, bag) => total + Number(colorDict[color][bag]) + colorDict[color][bag] * count(colorDict, bag), 0)
}


module.exports = { part2 }
part2()
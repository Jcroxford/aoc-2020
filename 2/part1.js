const { pullDataForDay } = require('../utils/importData')

function part1() {
  const entries = pullDataForDay(2)
    .split('\n')
    .map(password => password.replace(/(\d+)-(\d+) ([a-zA-Z]{1}): (.+)/, '$1 $2 $3 $4').split(' '))
    .map(([lowerStr, upperStr, testCase, password]) => {
      const lower = Number(lowerStr)
      const upper = Number(upperStr)

      const matches = password.match(new RegExp(`${testCase}`, 'g'))

      if (!matches) return 0
      if (matches.length >= lower && matches.length <= upper) return 1
      else return 0
    })
    .reduce((total, next) => total += next, 0)

  return entries
}

console.log(part1())
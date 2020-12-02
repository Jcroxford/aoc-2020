const { pullDataForDay } = require('../utils/importData')

function part2() {
  const entries = pullDataForDay(2)
    .split('\n')
    .map(password => password.replace(/(\d+)-(\d+) ([a-zA-Z]{1}): (.+)/, '$1 $2 $3 $4').split(' '))
    .map(([lowerIndexStr, upperIndexStr, testCase, password]) => {
      const lowerChar = password[Number(lowerIndexStr) - 1]
      const upperChar = password[Number(upperIndexStr) - 1]

      if (lowerChar == testCase && upperChar == testCase) return 0
      if (lowerChar == testCase) return 1
      if (upperChar == testCase) return 1
      else return 0
    })
    // @ts-ignore
    .reduce((total, next) => total += next, 0)

  return entries
}

console.log(part2())
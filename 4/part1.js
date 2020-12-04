const { pullDataForDay } = require('../utils/importData')

function part1() {
  return pullDataForDay(4)
    .split('\n\n')
    .map(passport => {
      if(!passport.match(/byr:/)) return 0
      if(!passport.match(/iyr:/)) return 0
      if(!passport.match(/eyr:/)) return 0
      if(!passport.match(/hgt:/)) return 0
      if(!passport.match(/hcl:/)) return 0
      if(!passport.match(/ecl:/)) return 0
      if(!passport.match(/pid:/)) return 0
      return 1
    })
    .reduce((total, next) => total += next, 0)
}

module.exports = { part1 }

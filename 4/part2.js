const { pullDataForDay } = require('../utils/importData')

function part2() {
  // byr (Birth Year) - four digits; at least 1920 and at most 2002.
  // iyr (Issue Year) - four digits; at least 2010 and at most 2020.
  // eyr (Expiration Year) - four digits; at least 2020 and at most 2030.
  // hgt (Height) - a number followed by either cm or in:
  // If cm, the number must be at least 150 and at most 193.
  // If in, the number must be at least 59 and at most 76.
  // hcl (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
  // ecl (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
  // pid (Passport ID) - a nine-digit number, including leading zeroes.
  // cid (Country ID) - ignored, missing or not.

  return pullDataForDay(4)
    .split('\n\n')
    .map(passport => {
      const birthYear = Number((passport.match(/byr:(\d{4})/) || [])[1])
      if((!passport.match(/byr:\d{4}/) && !birthYear)) return 0
      if((birthYear < 1920 || birthYear > 2002)) return 0

      const issueYear = Number((passport.match(/iyr:(\d{4})/) || [])[1])
      if((!passport.match(/iyr:/) && !issueYear)) return 0
      if((issueYear < 2010 || issueYear > 2020)) return 0

      const expYear = Number((passport.match(/eyr:(\d{4})/) || [])[1])
      if((!passport.match(/eyr:/) && !expYear)) return 0
      if((expYear < 2020 || expYear > 2030)) return 0

      const validHeight = Number((passport.match(/hgt:(\d+)(cm|in)/) || [])[1])
      const heightMetric = (passport.match(/hgt:(\d+)(cm|in)/) || [])[2]
      if(!passport.match(/hgt:/) || !validHeight || !heightMetric) return 0
      if(heightMetric == 'cm' && validHeight <= 150 && validHeight >= 193) return 0
      if(heightMetric == 'in' && validHeight <= 59 && validHeight >= 76) return 0

      if(!passport.match(/hcl:#[0-9a-f]{6}/)) return 0

      if(!passport.match(/ecl:(amb|blu|brn|gry|grn|hzl|oth)/)) return 0
      if(!passport.match(/pid:\d{9}/)) return 0
      return 1
    })
    .reduce((total, next) => total += next, 0)
}

module.exports = { part2 }

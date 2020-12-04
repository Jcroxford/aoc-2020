const { pullDataForDay } = require('../utils/importData')

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

function part2() {
  return pullDataForDay(4)
    .split('\n\n')
    .map(row => (
      row
        .split(/( |\n)/)
        .filter(x => x != '\n' && x != ' ')
        .map(x => x.split(':'))
        .reduce((dict, [type, val]) => ({ ...dict, [type]: val }), {})
    ))
    .map((dict) => {
      if(!dict['byr'] || !dict['iyr'] || !dict['eyr'] || !dict['hgt'] || !dict['hcl'] || !dict['ecl'] || !dict['pid']) return 0

      if((dict['byr'] < 1920 || dict['byr'] > 2002)) return 0

      if((dict['iyr'] < 2010 || dict['iyr'] > 2020)) return 0

      if((dict['eyr'] < 2020 || dict['eyr'] > 2030)) return 0

      if(!/(cm|in)/.test(dict['hgt'])) return 0
      const height = Number((dict['hgt'].match(/\d+/) || [])[0])
      if(/cm/.test(dict['hgt']) && (height < 150 || height > 193)) return 0
      if(/in/.test(dict['hgt']) && (height < 59 || height > 76)) return 0

      if(!/#[0-9a-f]{6}/.test(dict['hcl'])) return 0

      if(!/(amb|blu|brn|gry|grn|hzl|oth)/.test(dict['ecl'])) return 0

      if(!/^\d{9}$/.test(dict['pid'])) return 0

      return 1
    })
    .reduce((total, next) => total += next, 0)
}

module.exports = { part2 }

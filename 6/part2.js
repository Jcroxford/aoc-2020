const { pullDataForDay } = require('../utils/importData')

function part2() {
  return pullDataForDay(6)
    .split(/\n\n/)
    .map(group => group.split('\n').map(person => person.split('')))
    .map(group => {
      const groupSize = group.length

      const aggregateAnswers = group.reduce((dict, person) => {
        person.forEach(answer => {
          if(!dict[answer]) dict[answer] = 0

          dict[answer] += 1
        })

        return dict
      }, {})

      return Object.keys(aggregateAnswers).reduce((total, answer) => aggregateAnswers[answer] == groupSize ? total + 1 : total, 0)
    })
    .reduce((total, next) => total += next, 0)
}


module.exports = { part2 }

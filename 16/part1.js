const { pullDataForDay } = require('../utils/importData')

function part1() {
  const [ rules, myTicket, nearbyTickets ] =  formatData()

  return nearbyTickets
    .reduce((allVals, ticket) => [ ...allVals, ...ticket ], [])
    .filter(val => {
      for(let { firstRange: [ firstRangeLow, firstRangeHigh ], secondRange: [ secondRangeLow, secondRangeHigh ] } of rules) {
        if(val >= firstRangeLow && val <= firstRangeHigh) return false
        if(val >= secondRangeLow && val <= secondRangeHigh) return false
      }

      return true
    })
    .reduce((total, next) => total += next, 0)
}

function formatData() {
  let [ rules, myTicket, nearbyTickets ] = pullDataForDay(16)
    .split('\n\n')
    .map(x => x.split('\n'))

  rules = rules.map(x => {
    const [ ruleName, firstRange, secondRange ] = x.replace(/(.*): (\d+-\d+) or (\d+-\d+)/, '$1:$2:$3').split(':')

    return { ruleName, firstRange: firstRange.split('-').map(Number), secondRange: secondRange.split('-').map(Number) }
  })

  myTicket = myTicket[1].split(',').map(Number)
  nearbyTickets = nearbyTickets.slice(1).map(ticket => ticket.split(',').map(Number))

  return [ rules, myTicket, nearbyTickets ]
}

module.exports = { part1, formatData }

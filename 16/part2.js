// @ts-nocheck
const { formatData } = require('./part1')

function part2() {
  let [ rules, myTicket, nearbyTickets ] =  formatData()

  rules = rules.map(rule => ({ ...rule, possibleIndeces: myTicket.reduce((dict, _, i) => ({ ...dict, [i]: 1 }), {}) }))
  nearbyTickets = nearbyTickets
    // throw out invalid tickets
    .filter(ticket => {
      return ticket.length == ticket.filter(val => {
        for(let { firstRange: [ firstRangeLow, firstRangeHigh ], secondRange: [ secondRangeLow, secondRangeHigh ] } of rules) {
          if(val >= firstRangeLow && val <= firstRangeHigh) return true
          if(val >= secondRangeLow && val <= secondRangeHigh) return true
        }
        return false
      }).length
    })

  // remove all invalid indeces for each rule. just brute force checking
  for(let nearbyTicket of nearbyTickets) {
    for (let i = 0; i < nearbyTicket.length; i++) {
      const val = nearbyTicket[i]

      for(let rule of rules) {
        let { firstRange: [ firstRangeLow, firstRangeHigh ], secondRange: [ secondRangeLow, secondRangeHigh ] } = rule
        if(val >= firstRangeLow && val <= firstRangeHigh) continue
        if(val >= secondRangeLow && val <= secondRangeHigh) continue
        delete rule.possibleIndeces[i]
      }
    }
  }

  return rules
    // at least one of the rules should have 1 index so sort from lowest to highest
    .sort((a, b) => Object.keys(a.possibleIndeces).length - Object.keys(b.possibleIndeces).length)
    // since we start with 1 rule that has 1 possible index only, map and delete this index
    // propogating all the way through the list
    .map((rule, i, rules) => {
      const ruleIndex = Object.keys(rule.possibleIndeces)[0]
      for (let j = i + 1; j < rules.length; j++) {
        const nextRule = rules[j]
        delete nextRule.possibleIndeces[ruleIndex]
      }

      return rule
    })
    // get rules we care about
    .filter(rule => rule.ruleName.includes('departure'))
    // get our ticet values
    .map(rule => myTicket[Object.keys(rule.possibleIndeces)[0]])
    // get answer
    .reduce((total, next) => total *= next, 1)
}

module.exports = { part2 }

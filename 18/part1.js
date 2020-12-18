const { pullDataForDay } = require('../utils/importData')

function part1() {
  const data = pullDataForDay(18)
    .split('\n')
    .map(x => x.split(' '))
    .map(equation => equation.reduce((list, next) => [ ...list, ...next.split('') ], []))
    .map(evaluate)
    .reduce((total, next) => total += next, 0)

  return data
}

function evaluate(equation) {
  let result = null
  let symbol = ''
  while(equation.length) {
    const char = equation.shift()
    if(char == '(') {
      if(result ==  null) result = evaluate(equation)
      else if(symbol == '+') {
        result += evaluate(equation)
      } else {
        result *= evaluate(equation)
      }
    } else if(char == ')') {
      return result
    } else if(char == '+' || char == '*') {
      symbol = char
    } else {
      if(result ==  null) result = Number(char)
      else {
        if(symbol == '+') {
          result += Number(char)
        } else {
          result *= Number(char)
        }
      }
    }
  }

  return result
}

module.exports = { part1 }

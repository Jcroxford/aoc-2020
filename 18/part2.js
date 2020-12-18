const { pullDataForDay } = require('../utils/importData')

function part2() {
  const data = pullDataForDay(18)
    .split('\n')
    .map(x => x.split(' '))
    .map(equation => equation.reduce((list, next) => [ ...list, ...next.split('') ], []))
    .map(createParensGroup)
    .map(evaluateWithPrecedence)
    .reduce((total, next) => total += next, 0)

  return data
}

function createParensGroup(list, nextChar) {
  let innerList = []
  while(list.length) {
    const char = list.shift()
    if(char == '(') innerList.push(createParensGroup(list))
    else if(char == ')') return innerList
    else innerList.push(char)
  }

  return innerList
}

function evaluateWithPrecedence(equation) {
  // do all parens first
  for (let i = 0; i < equation.length; i++) {
    const x = equation[i]

    if(Array.isArray(x)) {
      equation[i] = evaluateWithPrecedence(x)
    }
  }
  let result = null
  while(equation.length) {
    // do all addition ops
    const plusOperation = equation.findIndex(x => x == '+')
    if(~plusOperation) {
      const [ numOne, _, numTwo ] = equation.splice(plusOperation - 1, 3)

      equation.splice(plusOperation - 1, 0, Number(numOne) + Number(numTwo))
    } else {
      // do all multiplication
      const char = equation.shift()
      if(char == '*') continue
      else if(result == null) result = Number(char)
      else result *= Number(char)
    }
  }

  return result
}

module.exports = { part2 }

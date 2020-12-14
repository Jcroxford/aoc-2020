const { pullDataForDay } = require('../utils/importData')

function part1() {
  const memory = []
  let mask = ''
  pullDataForDay(14)
    .split('\n')
    .forEach(command => {
      if(command.match(/mask = (.*)/)) return mask = command.replace(/mask = (.*)/, '$1').split('').reverse().join('')

      const [ address, value] = command.replace(/mem\[(\d+)\] = (\d+)/, '$1,$2').split(',').map(Number)
      const binaryVal = value.toString(2).split('').reverse().join('')
      const maskedValue = []
      for (let i = 0; i < mask.length; i++) {
        const bit = mask[i]

        if(bit === 'X') maskedValue[i] = binaryVal[i] || '0'
        else maskedValue[i] = mask[i]
      }
      memory[address] = maskedValue.reverse().join('')
    })

  return memory.filter(x => x).map(x => parseInt(x, 2)).reduce((total, next) => total += next, 0)
}

module.exports = { part1 }

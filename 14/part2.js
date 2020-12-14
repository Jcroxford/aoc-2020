const { pullDataForDay } = require('../utils/importData')

function part2() {
  const memory = {}
  let mask = ''
  pullDataForDay(14)
    .split('\n')
    .forEach((command, i) => {
      if(command.match(/mask = (.*)/)) return mask = command.replace(/mask = (.*)/, '$1').split('').reverse().join('')

      const [ address, value] = command.replace(/mem\[(\d+)\] = (\d+)/, '$1,$2').split(',').map(Number)
      const binaryAddr = address.toString(2).split('').reverse().join('')
      const maskedAddr = []

      // convert to masked addr
      for (let i = 0; i < mask.length; i++) {
        const bit = mask[i]

        if(bit === 'X' && (binaryAddr[i] == '0' || binaryAddr[i] == '1')) maskedAddr[i] = 'X'
        else if(bit === 'X') maskedAddr[i] = '0'
        else if(mask[i] == '1' || binaryAddr[i] == '1') maskedAddr[i] = '1'
        else maskedAddr[i] = '0'
      }

      // push value to all possible masked addr locations
      const totalXs = maskedAddr.filter(x => x == 'X').length
      const matches = totalXs ? 2**totalXs : 0
      for (let i = 0; i < matches; i++) {
        const bit = i.toString(2)
        const replacementBits = new Array(totalXs).fill('0').join('').substr(bit.length) + bit

        // swap Xs out for actual binary
        let copyOfMaskedAddr = [ ...maskedAddr ].reverse().join('')
        for (let j = 0; j < totalXs; j++) {
          copyOfMaskedAddr = copyOfMaskedAddr.replace(/X/, replacementBits[j])
        }

        memory[parseInt(copyOfMaskedAddr, 2)] = value
      }
    })

  return Object.keys(memory).reduce((total, addr) => total += memory[addr], 0)
}

module.exports = { part2 }

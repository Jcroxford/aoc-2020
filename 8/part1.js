const { pullDataForDay } = require('../utils/importData')

function part1() {
  const instructions = pullDataForDay(8)
    .split('\n')
    .map(instruction => [ ...instruction.split(' '), 0])
    .map(([ instruction, input, timesRun ]) => [ instruction, Number(input), timesRun ])

  let currentInstruction = 0
  let accumulator = 0
  while(true) {
    const [ instruction, input, timesRun ] = instructions[currentInstruction]

    if(instructions[currentInstruction][2] == 1) return accumulator

    switch(instruction) {
      case 'nop':
        instructions[currentInstruction][2] = timesRun + 1
        currentInstruction++
        break
      case 'acc':
        accumulator += input
        instructions[currentInstruction][2] = timesRun + 1
        currentInstruction++
        break
      case 'jmp':
        instructions[currentInstruction][2] = timesRun + 1
        currentInstruction += input
        break
    }
  }
}

module.exports = { part1 }

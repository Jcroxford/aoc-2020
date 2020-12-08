const { pullDataForDay } = require('../utils/importData')

function part2() {
  let instructions = pullDataForDay(8)
    .split('\n')
    .map(instruction => [ ...instruction.split(' '), 0])
    .map(([ instruction, input, timesRun ]) => [ instruction, Number(input), timesRun ])

  for(let i = 0; i < instructions.length; i++) {
    if(instructions[i][0] == 'acc') continue

    instructions[i][0] == 'nop' ? instructions[i][0] = 'jmp' : instructions[i][0] = 'nop'

    let accumulator = 0
    let currentInstruction = 0
    while(currentInstruction < instructions.length) {
      const [ instruction, input, timesRun ] = instructions[currentInstruction]
      const num = Number(input)

      if(instructions[currentInstruction][2] == 1) break

      switch(instruction) {
        case 'nop':
          instructions[currentInstruction][2] = timesRun + 1
          currentInstruction++
          break
        case 'acc':
          accumulator += num
          instructions[currentInstruction][2] = timesRun + 1
          currentInstruction++
          break
        case 'jmp':
          instructions[currentInstruction][2] = timesRun + 1
          currentInstruction += num || 1
          break
      }
    }

    if(currentInstruction == instructions.length) return accumulator

    instructions[i][0] == 'nop' ? instructions[i][0] = 'jmp' : instructions[i][0] = 'nop'
    instructions = instructions.map(([ instruction, input ]) => [ instruction, input, 0 ])
  }
}

module.exports = { part2 }

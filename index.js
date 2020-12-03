// when calling index provide args for day (1-24) and part (1 or 2)
const [_, __, day, part] = process.argv

const scope = require(`./${day}/part${part}.js`)

console.log(Number(part) == 1 ? scope.part1() : scope.part2())

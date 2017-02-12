#!/usr/bin/env node
const ben = require('ben');

const {Wall, Vec2D} = require('../lib');

const args = process.argv.slice(2);

var iter = parseInt(args[0])

if (isNaN(iter)) iter = 1000;

function benchmark(cols, rows) {
  var wall = new Wall(cols, rows);

  console.log(`Iterating: ${iter} ${cols}x${rows}`)

  var ms = ben(iter, () => {
    wall.closeAll().carve()
    return wall.toString()
  })
  console.log(`Elapsed time: ${ms} ms/iter`)
}

benchmark(10, 10)
benchmark(20, 20)
benchmark(50, 50)
benchmark(100, 100)

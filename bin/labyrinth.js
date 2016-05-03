#!/usr/bin/env node

const {Wall, Vec2D} = require('../lib');

const args = process.argv.slice(2);

var cols = args.length > 0 ? parseInt(args.shift()) : 10;
var rows = args.length > 0 ? parseInt(args.shift()) : cols;
var deep = args.length > 0 ? parseInt(args.shift()) : 1;
var concurrency = args.length > 0 ? parseInt(args.shift()) : require('os').cpus().length;

if (isFinite(cols) && isFinite(rows) && isFinite(deep) && isFinite(concurrency)) {
  if (rows > 0 && cols > 0) {
    if (concurrency <= 1) {
      /* Linear implementation */
      while(deep-- > 0) {
        let wall = new Wall(cols, rows);
        wall.carve();
        wall.print();
      }
    } else {
      /* Parallel implementation */
      parallel(cols, rows, deep, concurrency);
    }
  } else {
    console.log("Hey, give me numbers bigger than 0");
  }
} else {
  console.log("Hey, give me a number.");
}


function parallel(cols, rows, deep, concurrency) {
  const cluster = require('cluster');

  if (concurrency > deep) concurrency = deep;

  if (cluster.isMaster) {
    for (var i = concurrency; i-- > 0;) cluster.fork().send(deep--);

    cluster
    .on('exit', (worker, code, signal) => {
      if (code != 0) process.exit(code);
      if (concurrency-- <= 0)
        process.exit();
    })
    .on('message', (worker, wall) => {
      Wall.setPrototype(wall);
      process.stdout.write(wall.toString());
      if (deep-- > 0)
        worker.send(deep);
      else
        worker.disconnect();
    });
  } else {
    process.on('message', (deep) => {
      let wall = new Wall(cols, rows);
      wall.carve();
      process.send(wall);
    });
  }
}

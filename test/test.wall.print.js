const test = require('tap').test;
const Wall = require("../lib").Wall;
const Direction =  require("../lib/direction").Direction;

const Up = Direction.Up;
const Down = Direction.Down;
const Left = Direction.Left;
const Right = Direction.Right;

test('should_draw_a_labyrinth', (t) => {
    var labyrinth = new Wall(2, 2);
    t.equal(labyrinth.toString(),
`┏━┳━┓
┣━╋━┫
┗━┻━┛
`);
    labyrinth.open(0, 0, Right);
    t.equal(labyrinth.toString(),
`┏━━━┓
┣━┳━┫
┗━┻━┛
`);
    labyrinth.open(1, 0, Down);
    t.equal(labyrinth.toString(),
`┏━━━┓
┣━┓ ┃
┗━┻━┛
`);
    labyrinth.open(1, 1, Left);
    t.equal(labyrinth.toString(),
`┏━━━┓
┣━╸ ┃
┗━━━┛
`);
    labyrinth.open(0, 1, Up);
    t.equal(labyrinth.toString(),
`┏━━━┓
┃   ┃
┗━━━┛
`);
    labyrinth.open(0, 0, Left);
    t.equal(labyrinth.toString(),
`╺━━━┓
╻   ┃
┗━━━┛
`);
    labyrinth.open(0, 0, Up);
    t.equal(labyrinth.toString(),
`  ╺━┓
╻   ┃
┗━━━┛
`);
    labyrinth.open(1, 0, Up);
    t.equal(labyrinth.toString(),
`    ╻
╻   ┃
┗━━━┛
`);
    labyrinth.open(1, 0, Right);
    t.equal(labyrinth.toString(),
`     
╻   ╻
┗━━━┛
`);
    labyrinth.open(0, 1, Left);
    t.equal(labyrinth.toString(),
`     
    ╻
╺━━━┛
`);
    labyrinth.open(0, 1, Down);
    t.equal(labyrinth.toString(),
`     
    ╻
  ╺━┛
`);
    labyrinth.open(1, 1, Down);
    t.equal(labyrinth.toString(),
`     
    ╻
    ╹
`);
    labyrinth.open(1, 1, Right);
    t.equal(labyrinth.toString(),
`     
     
     
`);

  t.end();
});

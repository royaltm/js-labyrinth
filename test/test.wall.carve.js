const test = require('tap').test;
const Wall = require("../lib").Wall;
const { Up, Down, Left, Right } = require("../lib/direction").Direction;

function count_open(labyrinth) {
  var opened = 0;
  for(let y = 0, len = labyrinth.rows; y < len; ++y) {
    for(let x = 0, len = labyrinth.cols; x < len; ++x) {
      if (labyrinth.isOpen(x, y, Up))    opened+= 1;
      if (labyrinth.isOpen(x, y, Right)) opened+= 1;
      if (labyrinth.isOpen(x, y, Left))  opened+= 1;
      if (labyrinth.isOpen(x, y, Down))  opened+= 1;
    }
  }
  return opened;
}

test('should_carve_a_labyrinth', (t) => {
  var labyrinth = new Wall(137, 111);
  t.equal(0, count_open(labyrinth));
  labyrinth.carve();
  t.equal(137*111*2-2, count_open(labyrinth));
  labyrinth.closeAll();
  t.equal(0, count_open(labyrinth));
  labyrinth.carve();
  t.equal(137*111*2-2, count_open(labyrinth));

  t.end();
});

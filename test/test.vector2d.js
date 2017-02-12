const test = require('tap').test;
const Vec2D = require("../lib").Vec2D;

test('should_create_empty_vector', (t) => {
  var v2d = new Vec2D(0, 0, 0);
  t.equal(0, v2d.numCols());
  t.equal(0, v2d.numRows());

  t.end();
});

test('should_create_vector_with_value', (t) => {
  var v2d = new Vec2D(3, 2, 'x');
  t.equal(3, v2d.numCols());
  t.equal(2, v2d.numRows());
  for(let row = 0; row < 2; ++row) {
    for(let col = 0; col < 3; ++col) {
      t.equal('x', v2d.get(col, row));
    }
  }
  v2d.set(1, 0, 'a');
  t.equal('a', v2d.get(1, 0));
  t.equal('x', v2d.get(0, 1));

  t.end();
});

test('should_fill_vector_with_value', (t) => {
  var v2d = new Vec2D(4, 8, '@');
  t.equal(4, v2d.numCols());
  t.equal(8, v2d.numRows());
  for(let row = 0; row < 8; ++row) {
    for(let col = 0; col < 4; ++col) {
      t.equal('@', v2d.get(col, row));
    }
  }
  v2d.fill('!');
  for(let row = 0; row < 8; ++row) {
    for(let col = 0; col < 4; ++col) {
      t.equal('!', v2d.get(col, row));
    }
  }

  t.end();
});

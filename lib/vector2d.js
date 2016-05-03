class Vec2D {
  /** Create two-dimensional vector containing `rows` vectors of `cols` size each.
  **/
  constructor(cols, rows, value) {
    this.cols = cols;
    this.rows = Array.from({length: rows}, () => Array.from({length: cols}, () => value));
  }
  fill(value) {
    for (var row of this.rows) {
      for (let i = row.length; i-- > 0;) {
        row[i] = value;
      }
    }
  }
  numRows() { return this.rows.length; }
  numCols() { return this.cols; }
  set(col, row, value) {
    this.rows[row][col] = value;
  }
  get(col, row) {
    return this.rows[row][col];
  }
}

module.exports.Vec2D = Vec2D;

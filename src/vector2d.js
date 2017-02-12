export class Vec2D {
  /** Create two-dimensional vector containing `rows` vectors of `cols` size each.
  **/
  constructor(cols, rows, value) {
    this.cols = cols;
    this.rows = Array.from({length: rows}, () => Array.from({length: cols}, () => value));
  }
  fill(value) {
    const rows = this.rows;
    for (let i = rows.length; i-- > 0;) {
      let row = rows[i];
      for (let n = row.length; n-- > 0;) {
        row[n] = value;
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

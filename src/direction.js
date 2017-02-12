export const Direction = {
  Up: 0,
  Right: 1,
  Down: 2,
  Left: 3
};

const { Up, Down, Left, Right } = Direction;

function up() { return new Move( 0, -1) }
function rt() { return new Move( 1,  0) }
function dn() { return new Move( 0,  1) }
function lt() { return new Move(-1,  0) }

export class Move {
  /**
   * @member {number} dx
   * @member {number} dy
  **/
  constructor(dx, dy) {
    this.dx = dx;
    this.dy = dy;
  }
  /* 
   * @param {Dirtion} dir
   * @return {Mo}
  **/
  static fromDir(dir) {
    switch(dir) {
      case Up:    return up();
      case Right: return rt();
      case Down:  return dn();
      case Left:  return lt();
      default:
        throw new Error(`Invalid direction: ${dir}`);
    }
  }
  /**
   * @return {Direction}
  **/
  toDir() {
    var dx = this.dx, dy = this.dy;
    switch(dx) {
      case 0:
        switch(dy) {
          case 1:  return Down;
          case -1: return Up
        }
        break;
      case -1: if (dy === 0) return Left;
      case 1:  if (dy === 0) return Right;
    }
    throw new Error(`Invalid Move value: {${dx},${dy}}`);
  }
  back()   { this.dx = -this.dx; this.dy = -this.dy; }
  turnRt() { 
    let dx = this.dx;
             this.dx = -this.dy; this.dy =  dx;
  }
  turnLt() {
    let dx = this.dx;
             this.dx =  this.dy; this.dy = -dx; }
}

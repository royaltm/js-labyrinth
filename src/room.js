import { Vec2D } from './vector2d';

export class Room extends Vec2D {
  constructor(rows, cols) {
    super(cols, rows, false);
  }
  mark(x, y) {
    this.set(x, y, true);
  }
}

Room.prototype.wasMarked = Room.prototype.get;

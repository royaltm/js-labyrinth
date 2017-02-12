import { Room } from "../room";
import { Direction } from "../direction";

const { Up, Down, Left, Right } = Direction;

/**
 *  Print a labyrinth to stdout using UNICODE BOX characters.
**/
export function print() {
  var stdout = process.stdout;
  var writer = (s) => { stdout.write(s); };
  this.draw(writer);
}

/**
 *  Draw a labyrinth as a String using UNICODE BOX characters.
 *
 *  @return {string}
**/
export function toString() {
  var out = '';
  this.draw(s => { out += s });
  return out;
}
/**
 *  Draw a labyrinth using UNICODE BOX characters to a `writer`.
 *
 *  @param {function({string})} writer
**/
export function draw(writer) {
  for(let y = 0, len = this.rows; y < len; ++y) {
    for(let x = 0, len = this.cols; x < len; ++x) {
      if (x == 0 || this.isOpen(x - 1, y, Up)) {
        if (y == 0 || this.isOpen(x, y - 1, Left)) {
          if (this.isOpen(x, y, Up)) {
            writer(this.isOpen(x, y, Left) ? "  " : "╻ ");
          } else {
            writer(this.isOpen(x, y, Left) ? "╺━" : "┏━");
          }
        } else {
          if (this.isOpen(x, y, Up)) {
            writer(this.isOpen(x, y, Left) ? "╹ " : "┃ ");
          } else {
            writer(this.isOpen(x, y, Left) ? "┗━" : "┣━");
          }
        }
      } else {
        if (y == 0 || this.isOpen(x, y - 1, Left)) {
          if (this.isOpen(x, y, Up)) {
            writer(this.isOpen(x, y, Left) ? "╸ " : "┓ ");
          } else {
            writer(this.isOpen(x, y, Left) ? "━━" : "┳━");
          }
        } else {
          if (this.isOpen(x, y, Up)) {
            writer(this.isOpen(x, y, Left) ? "┛ " : "┫ ");
          } else {
            writer(this.isOpen(x, y, Left) ? "┻━" : "╋━");
          }
        }
      }
    }
    let x = this.cols;
    if (this.isOpen(x - 1, y, Up)) {
      if (y == 0 || this.isOpen(x, y - 1, Left)) {
        writer(this.isOpen(x, y, Left) ? " " : "╻");
      } else {
        writer(this.isOpen(x, y, Left) ? "╹" : "┃");
      }
    } else {
      if (y == 0 || this.isOpen(x, y - 1, Left)) {
        writer(this.isOpen(x, y, Left) ? "╸" : "┓");
      } else {
        writer(this.isOpen(x, y, Left) ? "┛" : "┫");
      }
    }
    writer("\n");
  }
  let y = this.rows;
  for(let x = 0, len = this.cols; x < len; ++x) {
    if (x == 0 || this.isOpen(x - 1, y, Up)) {
      if (this.isOpen(x, y - 1, Left)) {
        writer(this.isOpen(x, y, Up) ? "  " : "╺━");
      } else {
        writer(this.isOpen(x, y, Up) ? "╹ " : "┗━");
      }
    } else {
      if (y == 0 || this.isOpen(x, y - 1, Left)) {
        writer(this.isOpen(x, y, Up) ? "╸ " : "━━");
      } else {
        writer(this.isOpen(x, y, Up) ? "┛ " : "┻━");
      }
    }
  }
  let x = this.cols;
  if (this.isOpen(x - 1, y, Up)) {
    writer(this.isOpen(x, y - 1, Left) ? " " : "╹");
  } else {
    writer(this.isOpen(x, y - 1, Left) ? "╸" : "┛");
  }
  writer("\n");
}

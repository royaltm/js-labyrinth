import * as wall from './wall';
import carve from './carve';
import * as print from './print';

export const Wall = wall.Wall;

Wall.prototype.carve    = carve;
Wall.prototype.print    = print.print;
Wall.prototype.toString = print.toString;
Wall.prototype.draw     = print.draw;

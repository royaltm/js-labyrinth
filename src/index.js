/** # The labyrinth library
 * 
 *  The labyrinth library provides tools for building and managing labyrinths.
 * 
 *  # Example
 * 
 *  ```
 *  labyrinth = require('labyrinth');
 *  
 *  const {Wall, Direction} = labyrinth;
 *
 *  var wall = new Wall(20, 20);
 *  wall.carve();
 *  wall.print();
 *  wall.open(0, 10, Direction.Up);
 *  assert.equal(true, wall.is_open(0, 10, Direction.Up));
 *  wall.close(0, 10, Direction.Up);
 *  assert.equal(false, wall.is_open(0, 10, Direction.Up));
 *  ```
**/
export * from './vector2d';
export * from './wall/index';
export * from './direction';
export * from './room';

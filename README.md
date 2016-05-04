Labyrinth
=========

This library creates a true labyrinth using low-memory, cpu-intensive hunt'n'seek algorythm. 

Program
-------

### Install

```
npm i -g royaltm/js-labyrinth
```

### Create

```
$ labyrinth

┏━━━━━━━┳━━━━━━━━━┳━┓
┃ ╺━┳━╸ ┃ ┏━━━━━┓ ╹ ┃
┣━━━┫ ╺━┻━┛ ┏━╸ ┃ ╺━┫
┃ ╻ ┗━━━━━┳━┛ ┏━┻━┓ ┃
┃ ┃ ┏━╸ ╻ ┃ ╻ ┃ ╻ ╹ ┃
┃ ┗━┫ ╺━┻━┛ ┗━┫ ┗━━━┫
┣━╸ ┣━╸ ┏━━━┓ ╹ ┏━━━┫
┃ ┏━┛ ┏━┻━┓ ┗━┳━┛ ╻ ┃
┃ ┗━┓ ┃ ╻ ┃ ╻ ╹ ┏━┫ ┃
┃ ╻ ┃ ╹ ┃ ┗━┻━╸ ┃ ╹ ┃
┗━┻━┻━━━┻━━━━━━━┻━━━┛

$ labyrinth 40 5

┏━━━━━┳━┳━━━━━━━━━┳━━━━━┳━━━┳━━━━━┳━━━━━┳━━━━━┳━┳━━━━━┳━━━━━━━━━━━━━━━┳━━━━━┳━━━┓
┃ ┏━╸ ┃ ┃ ╺━┓ ╺━┳━┛ ┏━┓ ╹ ╺━┫ ╺━┓ ╹ ┏━╸ ┃ ╺━┓ ┃ ┣━━━┓ ╹ ┏━━━━━━━┳━━━┓ ┗━━━┓ ╹ ╻ ┃
┃ ┣━━━┛ ┃ ╻ ┣━╸ ┃ ╺━┫ ┗━━━┓ ╹ ┏━┻━┓ ┣━━━┻━┓ ┃ ╹ ┃ ╻ ┗━┳━┫ ┏━━━╸ ┃ ╺━┻━━━┓ ┃ ╺━┫ ┃
┃ ╹ ╻ ╺━╋━┛ ┃ ╺━┫ ╻ ╹ ┏━┓ ┗━┳━┛ ╻ ╹ ┃ ╻ ╻ ┃ ┗━━━┫ ┗━┓ ╹ ┃ ┃ ╺━━━┻━━━┳━╸ ┃ ┣━╸ ┃ ┃
┣━━━┛ ╻ ╹ ╺━┻━┓ ╹ ┣━╸ ┃ ┗━╸ ┃ ╺━┻━━━┛ ┃ ┗━┛ ╺━┓ ╹ ╻ ┗━┓ ╹ ┃ ╺━━━┓ ╺━┛ ╻ ╹ ╹ ┏━┛ ┃
┗━━━━━┻━━━━━━━┻━━━┻━━━┻━━━━━┻━━━━━━━━━┻━━━━━━━┻━━━┻━━━┻━━━┻━━━━━┻━━━━━┻━━━━━┻━━━┛
```


Library
-------

Add to `package.json`:

```
"dependencies": {
  "labyrinth": "royaltm/js-labyrinth"
}
```

```js
const {Wall, Direction} = require('labyrinth');

var wall = new Wall(20, 20);
wall.carve();
wall.print();
wall.open(0, 10, Direction.Up);
assert.equal(true, wall.isOpen(0, 10, Direction.Up));
wall.close(0, 10, Direction.Up);
assert.equal(false, wall.isOpen(0, 10, Direction.Up));
```

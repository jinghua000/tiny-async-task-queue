# tiny-async-task-queue

## Introduction

Here is a tiny async task queue, for several standalone task executing in order, with just one API.

## Usage 

`npm i -S tiny-async-task-queue`

```js
const Queue = require('tiny-async-task-queue')
const queue = new Queue()
```

And the **only API** is `add`.

```js
queue.add(task1)
queue.add(task2)
queue.add(task3)
```

`task1`, `task2`, `task3`, will executing one by one.

Tasks need according with **ONE OF** the rules below.

1. Supply an argument typed `Function`, invoke it when the task is finished.
2. Return a `Promise`.

If your code satisfied with two rules, first finished rule will be triggered, and the second will be ignored.

For example:

your task can write like this

```js
function task(next) {
    setTimeout(() => {
        // do something...
        next()
    }, 500)
}
```

or this

```js
function task() {
    return new Promise(resolve => {
        setTimeout(() => {
            // do something...
            resolve()
        }, 500)
    })
}
```

If the task added to the empty queue, it will run immediately, otherwise it will be executed after other tasks finished.

> And the internal queue based on [`tiny-linked-queue`](https://github.com/jinghua000/tiny-linked-queue#readme), if you want to manipulate the internal queue you can use the `queue` property.

```js
const queue = new Queue()
queue.queue // => this property pint to the `tiny-linked-queue`.
```

## Full demo

```js
function task1(next) {
    setTimeout(() => {
        console.log('task1 running.')
        next()
    }, 100)
}

function task2() {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log('task2 running.')
            resolve()
        }, 50)
    })
}

function task3() {
    console.log('task3 running.')
}

const Queue = require('tiny-async-task-queue')
const queue = new Queue()
queue.add(task1)
queue.add(task2)
queue.add(task3)

// console will logs as below:
// task1 running.
// task2 running.
// task3 running.
```

### Tests

`yarn test`
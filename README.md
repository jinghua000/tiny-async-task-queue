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

## Full demo
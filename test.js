const Queue = require('.')

test('sync task with function', done => {
    const queue = new Queue()
    const arr = []

    queue.add(function(next) {
        arr.push(0)
        next()
    })

    queue.add(function(next) {
        arr.push(1)
        next()
    })

    queue.add(function() {
        expect(arr).toEqual([0, 1])
        done()
    })
})

test('async task with function', done => {
    const queue = new Queue()
    const arr = []
    
    queue.add(function(next) {
        setTimeout(() => {
            arr.push(0)
            next()
        }, 20)
    })

    queue.add(function(next) {
        setTimeout(() => {
            arr.push(1)
            next()
        }, 10)
    })

    queue.add(function() {
        expect(arr).toEqual([0, 1])
        done()
    })
})

test('sync task with promise', done => {
    const queue = new Queue()
    const arr = []

    queue.add(function() {
        arr.push(0)
        return Promise.resolve()
    })

    queue.add(function() {
        arr.push(1)
        return Promise.resolve()
    })

    queue.add(function() {
        expect(arr).toEqual([0, 1])
        done()
    })
})

test('async task with promise', done => {
    const queue = new Queue()
    const arr = []

    queue.add(function() {
        return Promise.resolve().then(() => {
            arr.push(0)
        })
    })

    queue.add(function() {
        return Promise.resolve().then(() => {
            arr.push(1)
        })
    })

    queue.add(function() {
        expect(arr).toEqual([0, 1])
        done()
    })
})

test('when both promise and function is supplied, only trigger the fast one', done => {
    const queue = new Queue()
    let counter = 0

    queue.add(function(next) {
        setTimeout(() => {
            counter++
            // if this next called successfully, counter will be 2
            // otherwise will be 3
            next()
        }, 10)

        return Promise.resolve().then(() => {
            counter++
        })
    })

    queue.add(function(next) {
        setTimeout(() => {
            counter++
            next()
        }, 20)
    })

    queue.add(function() {
        expect(counter).toBe(3)
        done()
    })
})

test('mix promise and function, sync and async', done => {
    const queue = new Queue()
    const arr = []

    queue.add(function(next) {
        arr.push(0)
        next()
    })

    queue.add(function(next) {
        setTimeout(() => {
            arr.push(1)
            next()
        }, 10)
    })

    queue.add(function() {
        arr.push(2)
        return Promise.resolve()
    })

    queue.add(function() {
        return Promise.resolve().then(() => {
            arr.push(3)
        })
    })

    queue.add(function() {
        expect(arr).toEqual([0, 1, 2, 3])
        done()
    })
})

test('if the task is not a function will throw an error', () => {
    const queue = new Queue()
    expect(() => queue.add('')).toThrow(Error)
})
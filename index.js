const Queue = require('tiny-linked-queue')

class AsyncQueue {

    constructor() {
        this.queue = new Queue()
    }

    add(task) {
        if (this.queue.isEmpty) {
            this.queue.enqueue(task)
            this.run()
        } else {
            this.queue.enqueue(task)
        }
    }

    run() {
        if (this.queue.isEmpty) return

        const current = this.queue.head
        if (typeof current !== 'function') {
            throw new Error('The task is not a function.') 
        }

        let called = false
        const next = () => {
            if (called) return
            called = true
            this.queue.dequeue()
            this.run()
        }

        const result = current(next)
        if (result && typeof result.then === 'function') {
            result.then(next)
        }
    }
}

module.exports = AsyncQueue

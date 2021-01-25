import Queue from 'tiny-linked-queue'

declare class AsyncQueue {
    /**
     * constructor.
     */
    constructor();
    /**
     * internal queue.
     */
    readonly queue: Queue<Function>
    /**
     * add the task to the queue.
     */
    add(task: Function): void;
}

export = AsyncQueue;
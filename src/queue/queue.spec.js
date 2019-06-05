const queue = require('./index');

test('should return true when the queue is empty', () => {
    const q = queue();
    expect(q.isEmpty()).toBe(true);
    q.enqueue(1);
    expect(q.isEmpty()).toBe(false);
    q.dequeue();
    expect(q.isEmpty()).toBe(true);
});

test('should add items to the queue', () => {
    const q = queue();
    q.enqueue(1);
    q.enqueue(1);
    q.enqueue(1);
    q.enqueue(1);
    q.enqueue(1);
    expect(q.size()).toBe(5);
});

test('should remove items from the queue', () => {
    const q = queue();
    q.enqueue(1);
    q.enqueue(2);
    q.enqueue(3);
    q.enqueue(4);
    q.enqueue(5);

    const e = q.dequeue();

    expect(q.size()).toBe(4);
    expect(e).toBe(1);
});

test('should extract the correct elements from the queue', () => {
    const q = queue();
    q.enqueue(1);
    q.enqueue(2);

    const e1 = q.dequeue();

    q.enqueue(3);
    q.enqueue(4);
    q.enqueue(5);

    const e2 = q.dequeue();
    const e3 = q.dequeue();

    expect(e1).toBe(1);
    expect(e2).toBe(2);
    expect(e3).toBe(3);
});

test('should extract the correct elements from the queue', () => {
    const q = queue();
    q.enqueue(1);
    q.enqueue(2);

    const p1 = q.peek();
    q.dequeue();

    q.enqueue(3);
    q.enqueue(4);
    q.enqueue(5);

    const p2 = q.peek();
    q.dequeue();
    const p3 = q.peek();
    q.dequeue();

    expect(p1).toBe(1);
    expect(p2).toBe(2);
    expect(p3).toBe(3);
});

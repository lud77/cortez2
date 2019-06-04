const sequence = require('./index');

test('should produce a ramp of numbers starting from 0', () => {
    const seq = sequence();
    expect(seq.next()).toBe(0);
    expect(seq.next()).toBe(1);
    expect(seq.next()).toBe(2);
    expect(seq.next()).toBe(3);
});

test('should produce a ramp of numbers starting from 2', () => {
    const seq = sequence(2);
    expect(seq.next()).toBe(2);
    expect(seq.next()).toBe(3);
    expect(seq.next()).toBe(4);
    expect(seq.next()).toBe(5);
});

test('should produce the current value', () => {
    const seq = sequence();
    expect(seq.current()).toBe(0);
    seq.next();
    expect(seq.current()).toBe(1);
    seq.next();
    expect(seq.current()).toBe(2);
});

test('should set the current value', () => {
    const seq = sequence();
    seq.set(3);
    expect(seq.current()).toBe(3);
});

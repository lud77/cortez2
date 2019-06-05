module.exports = () => {
    const inbox = [];
    const outbox = [];

    const enqueue = inbox.push.bind(inbox);

    const dequeue = () => {
        if (outbox.length === 0) {
            while (inbox.length > 1) {
                outbox.push(inbox.pop());
            }

            if (inbox.length === 1) return inbox.pop();
        }

        return outbox.pop();
    };

    const peek = () => {
        if (outbox.length === 0) return inbox[0];
        return outbox[outbox.length - 1];
    };

    const size = () => inbox.length + outbox.length;

    const isEmpty = () => size() === 0;

    return { enqueue, dequeue, peek, size, isEmpty };
};

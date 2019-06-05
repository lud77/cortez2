const ggs = require('./ggs');
const queue = require('../queue');

const frontierManagerBFS = () => {
    const f = queue();

    const addTo = (id) => { f.enqueue(id); };

    return {
        addTo,
        isEmpty: f.isEmpty,
        pickNext: f.dequeue
    };
};

module.exports = ggs(frontierManagerBFS);

const ggs = require('./ggs');

const frontierManagerDFS = () => {
    const f = [];

    const addTo = (id) => {
        f.push(id);
    };

    const isEmpty = () => f.length === 0;

    const pickNext = () => f.pop();

    return {
        addTo,
        isEmpty,
        pickNext
    };
};

module.exports = ggs(frontierManagerDFS);

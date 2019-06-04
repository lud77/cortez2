module.exports = (init) => {
    let value = init || 0;

    const current = () => value;

    const next = () => value++;

    const set = (val) => {
        value = val;
    };

    return {
        current,
        next,
        set
    };
};

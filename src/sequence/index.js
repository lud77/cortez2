module.exports = () => {
    let value = 0;

    const next = () => ++value;

    const set = (val) => {
        value = val;
    };

    return {
        value,
        next,
        set
    };
};

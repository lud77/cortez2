const sequence = require('../sequence');

module.exports = () => {
    const nodes = {};
    const edges = {};

    const nodeSeq = sequence();
    const edgeSeq = sequence();

    const inbound = {};
    const outbound = {};

    const setNode = (id, payload) => {
        nodes[id] = { id, payload };

        if (id > nodeSeq.current()) nodeSeq.set(id + 1);
    };

    const addNode = (payload) => {
        const id = nodeSeq.next();
        setNode(id, payload);

        return id;
    };

    const setEdge = (id, sourceId, targetId, payload) => {
        inbound[targetId] = inbound[targetId] || new Set();
        inbound[targetId].add(id);

        outbound[sourceId] = outbound[sourceId] || new Set();
        outbound[sourceId].add(id);

        edges[id] = {
          id,
          sourceId,
          targetId,
          payload
        };

        if (id > edgeSeq.current()) edgeSeq.set(id + 1);
    };

    const addEdge = (sourceId, targetId, payload) => {
        const id = edgeSeq.next();
        setEdge(id, sourceId, targetId, payload);

        return id;
    };

    const getEdgesTo = (nodeId) => inbound[nodeId];
    const getEdgesFrom = (nodeId) => outbound[nodeId];

    return {
        nodes,
        edges,
        addNode,
        addEdge,
        setNode,
        setEdge,
        getEdgesTo,
        getEdgesFrom
    }
};

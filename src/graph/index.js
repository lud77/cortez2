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

    const getEdgesTo = (nodeId) => inbound[nodeId] || new Set();
    const getEdgesFrom = (nodeId) => outbound[nodeId] || new Set();
    const getEdges = (nodeId) => new Set([...getEdgesTo(nodeId), ...getEdgesFrom(nodeId)]);

    const disconnectNode = (nodeId) => {
        if (inbound[nodeId]) {
            inbound[nodeId].forEach((edgeId) => {
                delete edges[edgeId];
            });
            delete inbound[nodeId];
        }

        if (outbound[nodeId]) {
            outbound[nodeId].forEach((edgeId) => {
                delete edges[edgeId];
            });
            delete outbound[nodeId];
        }
    };

    const removeNode = (id) => {
        disconnectNode(id);
        delete nodes[id];
    };

    const toString = (options) => {
        const idLabel = ({ id }) => id;

        const opts = options || {};
        const nodeLabel = opts.nodeLabel || idLabel;
        const edgeLabel = opts.edgeLabel || idLabel;

        const nodeDef = Object.values(nodes)
            .map((node) => [node.id, nodeLabel(node)])
            .map(([id, label]) => `\t${id} [label="${label}"];`)
            .join(`\n`);

        const edgeDef = Object.values(edges)
            .map((edge) => [edgeLabel(edge), edge.sourceId, edge.targetId])
            .map(([label, source, target]) => `\t${source} -> ${target} [label="${label}"];`)
            .join(`\n`);

        return `digraph {\n${nodeDef}\n${edgeDef}\n}`;
    };

    return {
        nodes,
        edges,
        addNode,
        addEdge,
        setNode,
        setEdge,
        getEdgesTo,
        getEdgesFrom,
        getEdges,
        disconnectNode,
        removeNode,
        toString
    };
};

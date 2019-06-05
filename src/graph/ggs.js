module.exports = (frontierManager) => (isGoal, startNodeId, graph) => {
    const discovered = {};
    const fm = frontierManager();

    discovered[startNodeId] = true;
    fm.addTo([{ targetId: startNodeId }]);

    while (!fm.isEmpty()) {
        const path = fm.pickNext();
        const last = path[path.length - 1].targetId;

        if (isGoal(last)) return path;

        graph.getEdgesFrom(last).forEach((edgeId) => {
            const edge = graph.edges[edgeId];
            if (!discovered[edge.targetId]) {
                discovered[edge.targetId] = true;
                const newPath = Array.from(path);
                newPath.push(edge);
                fm.addTo(newPath);
            }
        });
    }
};

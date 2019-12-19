const graph = require('./index');
const dfs = require('./dfs');
const bfs = require('./bfs');

const buildGraph = () => {
    const g = graph();

    const n0 = g.addNode();
    const n1 = g.addNode();
    const n2 = g.addNode();
    const n3 = g.addNode();
    const n4 = g.addNode();
    const n5 = g.addNode();
    const n6 = g.addNode();
    const n7 = g.addNode();
    const n8 = g.addNode();
    const n9 = g.addNode();
    const n10 = g.addNode();
    const n11 = g.addNode();
    g.addEdge(n0, n1);
    g.addEdge(n0, n2);
    g.addEdge(n0, n3);
    g.addEdge(n1, n4);
    g.addEdge(n1, n5);
    g.addEdge(n3, n6);
    g.addEdge(n3, n7);
    g.addEdge(n4, n8);
    g.addEdge(n4, n9);
    g.addEdge(n6, n10);
    g.addEdge(n6, n11);

    return g;
};

test('dfs should find the predicted path to the target node', () => {
    const g = buildGraph();
    const path = dfs((nodeId) => nodeId % 3 === 2, 0, g, g.getEdgesFrom).map((edge) => edge.targetId);
    expect(path).toEqual([0, 3, 6, 11]);
});

test('bfs should find the predicted path to the target node', () => {
    const g = buildGraph();
    const path = bfs((nodeId) => nodeId % 3 == 2, 0, g, g.getEdgesFrom).map((edge) => edge.targetId);
    expect(path).toEqual([0, 2]);
});

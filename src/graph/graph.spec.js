const graph = require('./index');

test('should add a node to the graph', () => {
    const g = graph();
    const id = g.addNode();
    expect(g.nodes[id]).toBeDefined();
});

test('should set a specific node in the graph and update the sequence', () => {
    const g = graph();
    g.setNode(3);
    expect(g.nodes[3]).toBeDefined();

    g.addNode();
    expect(g.nodes[4]).toBeDefined();
});

test('should add an edge between two nodes in the graph', () => {
    const g = graph();
    const sourceId = g.addNode();
    const targetId = g.addNode();
    const edgeId = g.addEdge(sourceId, targetId);

    expect(g.edges[edgeId]).toBeDefined();
    expect(g.edges[edgeId].sourceId).toBe(sourceId);
    expect(g.edges[edgeId].targetId).toBe(targetId);
});

test('should retrieve all edges leaving a node in the graph', () => {
    const g = graph();
    const sourceId = g.addNode();
    const firstTargetId = g.addNode();
    const secondTargetId = g.addNode();
    g.addEdge(sourceId, firstTargetId);
    g.addEdge(sourceId, secondTargetId);

    expect(g.getEdgesFrom(sourceId).size).toBe(2);
});

test('should retrieve all edges entering a node in the graph', () => {
    const g = graph();
    const firstSourceId = g.addNode();
    const secondSourceId = g.addNode();
    const targetId = g.addNode();
    g.addEdge(firstSourceId, targetId);
    g.addEdge(secondSourceId, targetId);

    expect(g.getEdgesTo(targetId).size).toBe(2);
});

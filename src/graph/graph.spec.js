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

test('should add an edge between two nodes', () => {
    const g = graph();
    const sourceId = g.addNode();
    const targetId = g.addNode();
    const edgeId = g.addEdge(sourceId, targetId);

    expect(g.edges[edgeId]).toBeDefined();
    expect(g.edges[edgeId].sourceId).toBe(sourceId);
    expect(g.edges[edgeId].targetId).toBe(targetId);
});

test('should retrieve all edges leaving a node', () => {
    const g = graph();
    const sourceId = g.addNode();
    const firstTargetId = g.addNode();
    const secondTargetId = g.addNode();
    g.addEdge(sourceId, firstTargetId);
    g.addEdge(sourceId, secondTargetId);

    expect(g.getEdgesFrom(sourceId).size).toBe(2);
});

test('should retrieve all edges entering a node', () => {
    const g = graph();
    const firstSourceId = g.addNode();
    const secondSourceId = g.addNode();
    const targetId = g.addNode();
    g.addEdge(firstSourceId, targetId);
    g.addEdge(secondSourceId, targetId);

    expect(g.getEdgesTo(targetId).size).toBe(2);
});

test('should remove all edges from/to a node', () => {
    const g = graph();
    const firstId = g.addNode();
    const secondId = g.addNode();
    const thirdId = g.addNode();
    g.addEdge(firstId, secondId);
    g.addEdge(secondId, thirdId);

    g.disconnectNode(secondId);

    expect(g.getEdgesTo(secondId).size).toBeDefined();
    expect(g.getEdgesFrom(secondId).size).toBeDefined();
});

test('should remove a node and all its edges from the graph', () => {
    const g = graph();
    const firstId = g.addNode();
    const secondId = g.addNode();
    const thirdId = g.addNode();
    g.addEdge(firstId, secondId);
    g.addEdge(secondId, thirdId);

    g.removeNode(secondId);

    expect(g.nodes[secondId]).toBeUndefined();
    expect(g.getEdgesTo(secondId).size).toBeDefined();
    expect(g.getEdgesFrom(secondId).size).toBeDefined();
});

test('should support self-edges', () => {
    const g = graph();
    const nodeId = g.addNode();
    g.addEdge(nodeId, nodeId);
    g.addEdge(nodeId, nodeId);

    expect(g.edges[0].sourceId).toBe(0);
    expect(g.edges[0].targetId).toBe(0);
    expect(g.edges[1].sourceId).toBe(0);
    expect(g.edges[1].targetId).toBe(0);
    expect(Object.values(g.edges).length).toBe(2);

    g.disconnectNode(nodeId);

    expect(g.edges[0]).toBeUndefined();
});


test('should support self-edges', () => {
    const g = graph();
    const firstNodeId = g.addNode();
    const secondNodeId = g.addNode();
    g.addEdge(firstNodeId, secondNodeId);
    g.addEdge(firstNodeId, secondNodeId);

    expect(g.edges[0].sourceId).toBe(0);
    expect(g.edges[0].targetId).toBe(1);
    expect(g.edges[1].sourceId).toBe(0);
    expect(g.edges[1].targetId).toBe(1);
    expect(Object.values(g.edges).length).toBe(2);

    g.disconnectNode(firstNodeId);

    expect(g.edges[0]).toBeUndefined();
    expect(g.edges[1]).toBeUndefined();
});

test('should generate the proper dot notation output', () => {
    const g = graph();
    const d = g.addNode({ label: 'daddy' });
    const m = g.addNode({ label: 'mommy' });
    const k = g.addNode({ label: 'kid' });

    g.addEdge(d, m, { label: 'husband of' });
    g.addEdge(m, d, { label: 'wife of' });
    g.addEdge(d, k, { label: 'father of' });
    g.addEdge(m, k, { label: 'mother of' });

    expect(g.toString({
        nodeLabel: ({ payload }) => payload.label,
        edgeLabel: ({ payload }) => payload.label
    })).toBe(`digraph {\n\t0 [label="daddy"];\n\t1 [label="mommy"];\n\t2 [label="kid"];\n\t0 -> 1 [label="husband of"];\n\t1 -> 0 [label="wife of"];\n\t0 -> 2 [label="father of"];\n\t1 -> 2 [label="mother of"];\n}`);
});

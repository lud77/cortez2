# Cortez v2

A simplified and improved version of the graph library Cortez.

This module contains a few data structures and algorithms to work with graphs.


## Graph

Directed graph data structure with support for self-edges and multigraphs. Both nodes and edges can store a payload, so it's easy to implement weighted graphs, labelled edges, tagging and much more.

It also allows to output a graph in the [DOT graph description language](https://en.wikipedia.org/wiki/DOT_%28graph_description_language%29).


### Generalised Graph Search

A generalised graph search algorithm that abstracts many different approaches. Allows you to inject a frontierManager factory that will specify the behaviour of the algorithm when adding and expanding new nodes.


### Breadth first search

A frontierManager implementing BFS on GGS.


### Depth first search

A frontierManager implementing DFS on GGS.


## Queue

A queue implementation based on two stacks. Approximatively 10 times faster than pushing and shifting over an Array.


## Sequence

Generate auto-incrementing values (particularly useful for IDs).

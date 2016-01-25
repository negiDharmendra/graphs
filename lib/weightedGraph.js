var ld = require('lodash');
var g = {};



// D   [1;1; : : : ;1] . n copies of 1
// 2: D[s]   0
// 3: P   [ ]
// 4: Q   V . list of nodes to visit
// 5: while length(Q) > 0 do
// 6: find v 2 Q such that D[v] is minimal
// 7: Q   remove(Q; v)
// 8: for each u 2 adj(v) \ Q do
// 9: if D[u] > D[v] + w(vu) then
// 10: D[u]   D[v] + w(vu)
// 11: P[u]   v
// 12: return (D; P)

function sumUPWeight(path) {
    var sum = 0;
    for (var v in path)
       sum += path[v].weight;
    return sum||Infinity;
}

g.WeightedGraph = function() {
    this.addJ = {};
}
g.WeightedGraph.prototype = {
    addVertex: function(vertex) {
        this.addJ[vertex] = this.addJ[vertex] || [];
    },
    addEdge: function(edge) {
        this.addJ[edge.from].push(edge);
    },
    shortestPath: function(from, to, shortestPath, currentPath, visited) {
        shortestPath = shortestPath || [];
        currentPath = currentPath || [];
        visited = visited || [];
        if (from == to) return currentPath;
        for (var v in this.addJ[from]) {
            var vertex = this.addJ[from][v]
            if (visited.indexOf(vertex.from) == -1) {
                var path = this.shortestPath(vertex.to, to, shortestPath, currentPath.concat(vertex), visited.concat(from))
                if ((path[path.length-1].to == to)&&sumUPWeight(shortestPath)>=sumUPWeight(path))
                    shortestPath  = path;
            }
        };
        return shortestPath;
    }
};

g.Edge = function(id, v1, v2, weight) {
    this.id = id;
    this.from = v1;
    this.to = v2;
    this.weight = weight;
}

module.exports = g;
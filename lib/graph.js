var g = {};

var Graph = function() {
    this.graph = {};
    this.edges = 0;
};

Graph.prototype = {
    addVertex: function(vertex) {
        this.graph[vertex] = this.graph[vertex] || [];
    },
    addEdge: function(from, to) {
        this.graph[from].push(to);
        this.graph[to].push(from);
        this.edges++;
    },
    hasEdgeBetween: function(from, to) {
        return this.graph[from].indexOf(to) >= 0;
    },
    order: function() {
        return Object.keys(this.graph).length
    },
    size: function() {
        return this.edges;
    },
    pathBetween: function(from, to, visited) {
        visited = visited || [];
        if (from == to) return visited.concat(from);
        for (var index in this.graph[from]) {
            var vertex = this.graph[from][index];
            if (visited.indexOf(vertex) == -1) {
                var path = this.pathBetween(vertex, to, visited.concat(from));
                if (path[path.length - 1] == to) return path
            }
        }
        return [];
    },
    farthestVertex: function(vertex) {
        var count = 0,
            farthest_vertex, result;
        for (var v in this.graph) {
            result = this.pathBetween(vertex, v);
            if (count < result.length)
                count = result.length, farthest_vertex = v;
        };
        return farthest_vertex;
    },
    allPaths: function(from, to, visited, paths) {
        visited = visited || [];
        paths = paths || [];
        if (from == to) return visited.concat(from);
        
        for (var index in this.graph[from]) {
            var vertex = this.graph[from][index];
            if (visited.indexOf(vertex) == -1&&visited.indexOf(from) == -1) {
                var path = this.allPaths(vertex, to, visited.concat(from), paths);
                path[path.length - 1] == to && paths.push(path);
            };
        }
        return paths;
    }
};

g.DirectedGraph = function() {
    this.graph = {}
    this.edges = 0;
};

g.UndirectedGraph = function() {
    this.graph = {}
    this.edges = 0;
};

g.UndirectedGraph.prototype = Object.create(Graph.prototype);
g.DirectedGraph.prototype = Object.create(Graph.prototype);
g.DirectedGraph.prototype.addEdge  = function(from, to) {
    this.graph[from].push(to);
    this.edges++;
}



module.exports = g;

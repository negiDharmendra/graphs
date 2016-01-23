var g = {};
g.UndirectedGraph = function() {
    this.graph = {};
    this.edges = 0;
}

g.UndirectedGraph.prototype = {
    addVertex: function(vertex) {
        this.graph[vertex] = this.graph[vertex] || [];
    },
    addEdge: function(from, to) {
        if(!this.graph[from])return;
        if(!this.graph[to])this.addVertex(to);
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
            if (visited.indexOf(vertex)==-1) {
                var path = this.pathBetween(vertex, to, visited.concat(from));
                if(path[path.length-1]==to) return path
            }
        }
        return [];
    },
    farthestVertex: function(vertex) {
        var count = 0,farthest_vertex,result;
        for (var v in this.graph) {
            result = this.pathBetween(vertex, v);
            if(count<result.length)
                count=result.length,farthest_vertex=v;
        };
        return farthest_vertex;
    }
};

module.exports = g;

var ld = require('lodash');
var g = {};


function sumUPWeight(path) {
    var sum = 0;
    for (var v in path)
        sum += path[v].weight;
    return sum || Infinity;
}

g.WeightedGraph = function() {
    this.addj = {};
    this.D = {};
    this.edges = [];
}
g.WeightedGraph.prototype = {
    addVertex: function(vertex) {
        this.addj[vertex] = this.addj[vertex] || [];
        this.D[vertex] = Infinity;
    },
    addEdge: function(edge) {
        this.edges.push(edge);
        this.addj[edge.from].push(edge);
        this.addj[edge.to].push(edge);
    },
    shortestPath: function(from, to) {
        var self = this;
        var vertices = Object.keys(this.addj);
        this.D[from] = 0;
        var parent = {};
        parent[from] = from;
        while (vertices.length != 0) {
            var v = vertices[0];
            for (var i in vertices)
                if (this.D[v] > this.D[vertices[i]]) v = vertices[i];
            vertices.splice(vertices.indexOf(v), 1);
            for (var U in this.addj[v]) {
                var u = this.addj[v][U].to;
                var addjOfV = ld.find(this.addj[v], function(x) {
                    return x.from == v && x.to == u
                });
                if (self.D[u] > self.D[v] + this.addj[v][U].weight) {
                    self.D[u] = self.D[v] + this.addj[v][U].weight;
                    parent[u] = v;
                }
            }
        }
        var shortestPath = [];
        while (from != to) {
            var to_1 = parent[to];
            var addj = [];
            for (var v in self.edges)
                if (self.edges[v].to == to&&self.edges[v].from == to_1) addj.push(self.edges[v]);
            var path = addj.reduce(function(x,y){
                return x.weight>y.weight?y:x;
            })
            shortestPath.push(path);
            to = to_1;

        }
        return shortestPath.reverse();
    }
};

g.Edge = function(id, v1, v2, weight) {
    this.id = id;
    this.from = v1;
    this.to = v2;
    this.weight = weight;
}

module.exports = g;

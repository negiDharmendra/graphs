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
        // if (!this.graph[from])
        //     throw new Error(from + ' is not a vertex');
        // if (!this.graph[to])
        //     throw new Error(to + ' is not a vertex');
        this.edges++;
        this.graph[from].push(to);
        this.graph[to].push(from);
    },
    hasEdgeBetween: function(from, to) {
        return this.graph[from].indexOf(to) >= 0;
    },
    order:function(){
        return Object.keys(this.graph).length
    },
    size:function(){
        return this.edges;
    },
    pathBetween:function(from,to){
        if(from==to)return 
    }
};


module.exports = g;

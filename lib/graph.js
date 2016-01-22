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
    pathBetween:function(from,to,visited){
        visited = visited ||[];
        if(from==to)return visited.concat(from);
        for(var index in this.graph[from]){
            var vertex = this.graph[from][index];
            if(visited.indexOf(vertex)<0){
                visited = visited.indexOf(from)<0&&visited.concat(from)||visited;
                visited = this.pathBetween(vertex,to,visited);
            }
        }
        return visited;
    }
};


module.exports = g;

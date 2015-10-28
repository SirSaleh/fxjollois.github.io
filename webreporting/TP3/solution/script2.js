// Création et remplissage du diagramme en barre horizontales, à base de div
function creationRendu2() {
    "use strict";
    
    var graph = d3.select("body").append("div").attr("id", "graph");
    graph.selectAll("div")
        .data(donnees.valeurs)
        .enter().append("div")
            .html(function (v, i) { return donnees.modalites[i] + ":" + v; })
            .classed({"bar": true})
            .style("width", function (v) { return (v * 10) + "px"; })
            .style("height", "1em");
}
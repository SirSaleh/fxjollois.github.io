
/*global console,d3 */
(function () {
    "use strict";
    
    // Informations sur les intervales
    var infos = [
        // intervale1
        "95% confidence interval of bias uncertainty computed from the 100 member ensemble.",
        //intervale2
        "95% confidence interval of measurement and sampling uncertainties around the ensemble median. These are the combination of fully uncorrelated measurement and sampling  uncertainties and partially correlated uncertainties described by the HadCRUT4 error covariance matrices.",
        // intervale3
        "95% confidence interval of coverage uncertainties around the ensemble median.",
        // intervale4
        "95% confidence interval of the combination of measurement and sampling and bias uncertainties.",
        // intervale5
        "95% confidence interval of the combined effects of all the uncertainties described in the HadCRUT4 error model (measurement and sampling, bias and coverage uncertainties)."
    ],
        
        // Paramètres globaux du graphique
        marges = { haut: 20, droite: 20, bas: 30, gauche: 40},
        largeur = 800,
        hauteur = 400,
        
        // Echelle en X et en Y
        x = d3.scale.linear().range([marges.gauche, largeur - marges.droite]),
        y = d3.scale.linear().range([hauteur - marges.bas, marges.haut]),
    
        // Axes en X et en Y
        axeX = d3.svg.axis().scale(x).tickFormat(d3.format("")),
        axeY = d3.svg.axis().scale(y).orient("left").ticks(4),
        
        // Fonction de dessin de ligne
        ligne = d3.svg.line()
        .interpolate("linear")
        .x(function (a) { return x(a.annee); })
        .y(function (a) { return y(a.mediane); }),
        
        // Fonction de dessin de l'intervale
        valeurInterval,
        intervale = d3.svg.area()
        .interpolate("linear")
        .x(function (a) { return x(a.annee); })
        .y0(function (a) {
            return y(a[valeurInterval].bas);
        })
        .y1(function (a) {
            return y(a[valeurInterval].haut);
        }),
        
        // Graphique en lui-même
        graphe = d3.select("#courbe").append("svg")
        .attr("width", largeur)
        .attr("height", hauteur),
        
        // Création des boutons pour le choix de l'intervale
        entrees = d3.select("#choix").selectAll("input")
        .data(infos)
        .enter().append("span");
    
    entrees.append("input")
        .attr("type", "radio")
        .attr("name", "choixInterval")
        .attr("value", function (d, i) { return i + 1; })
        .on("click", function (d) {
            var choix = document.getElementById("choix").choixInterval.value,
                intervale = "intervale" + choix;
            Array.from(document.getElementsByClassName("intervale")).forEach(function (i) {
                i.style.visibility = "hidden";
            });
            document.getElementById(intervale).style.visibility = "visible";
            d3.select("#infos").html(d);
        });
    // d3.selectAll("input")[0].attr("checked", true);
    entrees.append("span")
        .html(function (d, i) { return "Intervale " + (i + 1); });

    console.log(document.getElementById("choix").choixInterval.value);
    
    graphe.append("rect")
        .attr("x", 0).attr("y", 0)
        .attr("width", largeur).attr("height", hauteur)
        .style("stroke", "red").style("stroke-width", "2px").style("fill", "transparent");
    
    // Lecture des données
    d3.text("HadCRUT.4.4.0.0.annual_ns_avg.txt", function (texte) {
        var texteNouveau = texte.replace(/ {3}/g, ";"),
            donnees = d3.dsv(";", "text/plain").parseRows(texteNouveau)
                .map(function (ligne) {
                    return {
                        annee: +ligne[0],
                        mediane: +ligne[1],
                        intervale1: { bas:  +ligne[2], haut:  +ligne[3]},
                        intervale2: { bas:  +ligne[4], haut:  +ligne[5]},
                        intervale3: { bas:  +ligne[6], haut:  +ligne[7]},
                        intervale4: { bas:  +ligne[8], haut:  +ligne[9]},
                        intervale5: { bas: +ligne[10], haut: +ligne[11]}
                    };
                });
        
        // Mise à jour des échelles en fonction des données
        x.domain([donnees[0].annee, donnees[donnees.length - 1].annee]);
        y.domain([
            Math.floor(100 * d3.min(donnees.map(function (a) {
                return d3.min([a.intervale1.bas,
                               a.intervale2.bas,
                               a.intervale3.bas,
                               a.intervale4.bas,
                               a.intervale5.bas]);
            }))) / 100,
            Math.ceil(100 * d3.max(donnees.map(function (a) {
                return d3.max([a.intervale1.haut,
                               a.intervale2.haut,
                               a.intervale3.haut,
                               a.intervale4.haut,
                               a.intervale5.haut]);
            }))) / 100
        ]);
        
        // ajout des données au graphique
        graphe.datum(donnees);
        
        console.log(graphe);
        
        // création des axes X et Y
        graphe.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + (hauteur - marges.bas) + ")")
            .call(axeX);
        graphe.append("g")
            .attr("class", "y axis")
            .attr("transform", "translate(" + marges.gauche + ",0)")
            .call(axeY);
        
        // Ajout de la ligne référence en 0
        graphe.append("line")
            .attr("x1", marges.gauche).attr("y1", y(0))
            .attr("x2", (largeur - marges.droite)).attr("y2", y(0))
            .attr("id", "reference");

        // Ajout des intervales de confiance
        // [1, 2, 3, 4, 5].forEach(function)
        valeurInterval = "intervale1";
        graphe.append("path")
            .attr("id", "intervale1")
            .attr("class", "intervale")
            .attr("d", intervale);
        valeurInterval = "intervale2";
        graphe.append("path")
            .attr("id", "intervale2")
            .attr("class", "intervale")
            .attr("d", intervale);
        valeurInterval = "intervale3";
        graphe.append("path")
            .attr("id", "intervale3")
            .attr("class", "intervale")
            .attr("d", intervale);
        valeurInterval = "intervale4";
        graphe.append("path")
            .attr("id", "intervale4")
            .attr("class", "intervale")
            .attr("d", intervale);
        valeurInterval = "intervale5";
        graphe.append("path")
            .attr("id", "intervale5")
            .attr("class", "intervale")
            .attr("d", intervale);

        // Ajout de la ligne médiane
        graphe.append("path")
            .attr("id", "mediane")
            .attr("d", ligne);
        

    });

}());
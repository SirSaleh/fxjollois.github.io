---
title: Langage SAS
---

Concepts SAS :

- Table
- Etape `DATA`
- Procédure (`PROC`)
- ... (peut-être)

## Importation de données

### Etape `DATA`

Avec insertion directe des données 

```sas
data tab;
    input X Y Z$;
    cards;
1 12 A
2 15 A
1 10 B
1  9 C
run;
```

Avec importation de données dans un fichier texte basique

```sas
data tab;
    infile 'fichier' paramètres;
    input variables;
run;
```

### `PROC IMPORT`

Quelques exemples aussi ici

## Restitution de données

### Affichage simple

Si on veut afficher simplement la table `tab`

```sas
proc print data = tab;
run;
```

Si on veut spécifier certains paramètres :

- `noobs` : n'affiche pas le numéro de la ligne
- `var` : sélectionne les variables à afficher
    - `_ALL_` : sélecteur spécifique pour toutes les variables
    - `_NUMERIC_` : sélecteur spécifique pour les variables numériques
    - `_ALPHA_` : sélecteur spécifique pour les variables alpha-numériques
    - `v1-vN` : sélecteur spécifique pour les variables nommées `v1`, `v2`, `v3`, ..., `vN` 
    - `X--Z` : sélecteur spécifique pour les variables de `X` à `Z` dans la liste des variables de la table

```sas
proc print data = tab noobs;
    var X Y;
run;
```

### Sauvegarde dans une table à partir d'une autre

```sas
data tab_out;
    set tab_in;
    opérations;
run;
```

## Interrogation de données

cf slides 

- [Concepts pour l'interrogation de données](interrogation-concepts.html)
- [Interrogation de données sous SAS](interrogation-sas.html)

## Manipulations supplémentaires

### Transposition de matice

```sas
proc transpose data = tab;
run;
```

### Autre ?

## Statistiques descriptives univariées

### Variable quantitative

#### Numérique

Moyenne, écart-type, minimum, maximum, ...

#### Graphique

Histogramme, boîte à moustache, QQ-plot

### Variable qualitative

#### Numérique

Occurences, fréquences

#### Graphique

Diagramme en barres, diagramme circulaire

## Statistiques descriptives bivariées

### Variables quantitative vs quantitative

#### Numérique

Covariance, coefficient de corrélation, ...

#### Graphique

Nuage de points

### Variables qualitative vs qualitative

#### Numérique

Table de contingence, table des fréquences, profils lignes, profils colonnes, chi2, ...

#### Graphique

Diagramme en barres séparées, diagramme barres empilées, diagrammes circulaires multiple, diagramme d'association

### Variables quantitative vs qualitative

#### Numérique

Moyenne, écart-type, minimum, maximum, ... par modalité

#### Graphique

Histogramme, boîte à moustache, QQ-plot par modalité

## Statistiques exploratoires

### Analyse en composants principales

### Analyse factorielle des correspondances

### Analyse factorielle des correspondances multiples

### Multidimensionnal Scaling

### Classification hiérarchique

### Classification directe
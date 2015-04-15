(function ($) {

    // display a spinner during ajax calls
    $(document)
        .ajaxStart(function () {
            $('body').spin();
        })
        .ajaxStop(function () {
            $('body').spin(false);
        });

    var e = function(string) {
        return String(string).replace(/"/g, '\\"');
    };

    // get the list of all tire brands
    $.getAllBrands = function(onSuccess, onFailure) {
        var q = new $.SparqlQuery();
        q.setQuery('SELECT DISTINCT ?brand ' +
                   'WHERE {?subject <http://data-gov.tw.rpi.edu/vocab/p/1353/brand> ?brand }');
        $.tiresQuery(q,
                     function(result) {
                         if (onSuccess && typeof onSuccess !== 'undefined') {
                             var listOfBrands = result.toStringArray();
                             listOfBrands.sort();
                             onSuccess(listOfBrands);
                         }
                     },
                     onFailure);        
    };

    // get the list of all tire sizes for a brand
    $.getBrandSizes = function(brand, onSuccess, onFailure) {
        var q = new $.SparqlQuery();
        q.setQuery('SELECT DISTINCT ?size WHERE ' +
                   '{?subject <http://data-gov.tw.rpi.edu/vocab/p/1353/brand> "' + e(brand) + '" .' +
                   ' ?subject <http://data-gov.tw.rpi.edu/vocab/p/1353/size> ?size }');
        $.tiresQuery(q,
                     function(result) {
                         if (onSuccess && typeof onSuccess !== 'undefined') {
                             var listOfSizes = result.toStringArray();
                             listOfSizes.sort();
                             onSuccess(listOfSizes);
                         }
                     },
                     onFailure);
    };

    // get the graph data for a brand + size combination
    $.getGraphData = function(brand, size, onSuccess, onFailure) {
        var q = new $.SparqlQuery();
        q.setQuery('SELECT DISTINCT ?tireline ?wear ?temp ?trac WHERE { ' + 
                   ' ?subject <http://data-gov.tw.rpi.edu/vocab/p/1353/brand> "' + e(brand) + '".' + 
                   ' ?subject <http://data-gov.tw.rpi.edu/vocab/p/1353/size> "' + e(size) + '".' + 
                   ' ?subject <http://data-gov.tw.rpi.edu/vocab/p/1353/tireline> ?tireline.' + 
                   ' ?subject <http://data-gov.tw.rpi.edu/vocab/p/1353/wear> ?wear.' + 
                   ' ?subject <http://data-gov.tw.rpi.edu/vocab/p/1353/temp> ?temp.' + 
                   ' ?subject <http://data-gov.tw.rpi.edu/vocab/p/1353/trac> ?trac.' + 
                   ' }');
        $.tiresQuery(q,
                     function(result) {
                         if (onSuccess && typeof onSuccess !== 'undefined') {
                             var data = result.toGraphData();
                             onSuccess(data);
                         }
                     },
                     onFailure);
    };

    // get the logo for a brand
    $.getLogo = function(brand, onSuccess, onFailure) {
        var q = new $.SparqlQuery();
        q.setQuery('SELECT ?thumb WHERE {' +
                   '  {' +
                   '    {?brand foaf:name ?label .}' +
                   '    UNION' + 
                   '    {?brand rdfs:label ?label .}' +
                   '  }' + 
                   'FILTER (REGEX(STR(?label), "' + e(brand) + '", "i")) . ' + 
                   '?brand dbpedia-owl:thumbnail ?thumb . ' +
                   '  {' +
                   '    { ?brand a <http://dbpedia.org/class/yago/TireManufacturers> }' + 
                   '    UNION' +
                   '    { ?brand <http://purl.org/dc/terms/subject> <http://dbpedia.org/resource/Category:Tire_manufacturers> }' +
                   '  }' +
                   '} LIMIT 1');
        $.dbpediaQuery(q,
                       function(result) {
                           if (onSuccess && typeof onSuccess !== 'undefined') {
                               var logo = result.toString();
                               onSuccess(logo);
                           }
                       },
                       onFailure);
    };

    // get the wiki link for a brand
    $.getWikiLink = function(brand, onSuccess, onFailure) {
        var q = new $.SparqlQuery();
        q.setQuery('SELECT ?wikiLink WHERE {' +
                   '  {' +
                   '    { ?subject a <http://dbpedia.org/class/yago/TireManufacturers> }' + 
                   '    UNION' +
                   '    { ?subject <http://purl.org/dc/terms/subject> <http://dbpedia.org/resource/Category:Tire_manufacturers> }' +
                   '  }' +
                   '  {' +
                   '    {?subject foaf:name ?name .}' +
                   '    UNION' + 
                   '    {?subject rdfs:label ?name .}' +
                   '  }' + 
                   '  ?subject foaf:isPrimaryTopicOf ?wikiLink.' + 
                   '  FILTER regex(?name, "' + e(brand) + '", "i").' +
                   '} LIMIT 1');
        $.dbpediaQuery(q,
                       function(result) {
                           if (onSuccess && typeof onSuccess !== 'undefined') {
                               var wikiLink = result.toString();
                               onSuccess(wikiLink);
                           }
                       },
                       onFailure);
    };
    
}(jQuery));

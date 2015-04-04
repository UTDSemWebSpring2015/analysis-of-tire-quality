$(document).ready(function() {
    var q = new $.SparqlQuery();
    q.setQuery('SELECT ?o WHERE {?s <http://data-gov.tw.rpi.edu/vocab/p/1353/brand> ?o }');

    $.tiresQuery(q, function(result){
        //alert(JSON.stringify(result))
        var $brands = $('#brands');
        var listOfBrands = result.toStringArray();
        $.each(listOfBrands, function(key, value) {
            $brands.append($("<option></option>")
                           .attr("value", key)
                           .text(value));
        });
    });
});

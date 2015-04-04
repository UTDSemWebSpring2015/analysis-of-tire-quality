$(document).ready(function() {

    $('#brands').change(function() {
        var brand = $(this).val();
 
        var q = new $.SparqlQuery();
        q.setQuery('SELECT ?o WHERE {<http://dbpedia.org/resource/' + brand + '> dbpedia-owl:thumbnail ?o } LIMIT 1');
        $.dbpediaQuery(q, function(result) {
            var logo = result.toString();
            if (logo != null) {
                $('#brand-logo').attr("src", logo);
            } else {
                $('#brand-logo').attr("src", "");
            }
        });
    });

    var q = new $.SparqlQuery();
    q.setQuery('SELECT DISTINCT ?o WHERE {?s <http://data-gov.tw.rpi.edu/vocab/p/1353/brand> ?o }');
    $.tiresQuery(q, function(result) {
        var $brands = $('#brands');
        var listOfBrands = result.toStringArray();
        $.each(listOfBrands, function(key, value) {
            $brands.append($("<option></option>")
                           .attr("value", value)
                           .text(value));
        });
    });
});

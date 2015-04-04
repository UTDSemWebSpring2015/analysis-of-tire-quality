(function ($) {

    $.SparqlQuery = function() {};
    $.SparqlQuery.prototype = {
        queryString: null,
        
        setQuery: function(queryString) {
            this.queryString = queryString;
        },
        
        encode: function() {
            return encodeURIComponent(this.queryString);
        }
    };

    $.SparqlResult = function(json) {
        this.json = json;
    };
    $.SparqlResult.prototype = {
        // returns the first value of the first result returned
        toString: function() {
            var str = null;
            $.each(this.json['results']['bindings'], function(key, value) {
                $.each(value, function(k, v){
                    str = v['value'];
                });
            });
            return str;
        },

        toStringArray: function() {
            var array = [];
            $.each(this.json['results']['bindings'], function(key, value) {
                $.each(value, function(k, v){
                    array.push(v['value']);
                });
            });
            return array;
        }        
    };
    
    var tiresEndpoint = 'https://analysis-of-tire-quality.herokuapp.com/tires/query?query=';
    var dbpediaEndpoint = 'http://dbpedia.org/sparql?format=json&query=';

    $.sparqlQuery = function(endpoint, query, callback) {
        var url = endpoint + query.encode();
        $.getJSON(url, function(data) {
            var result = new $.SparqlResult(data);
            callback(result);
        });
    };

    $.tiresQuery = function(query, callback) {
        return $.sparqlQuery(tiresEndpoint, query, callback);
    }

    $.dbpediaQuery = function(query, callback) {
        return $.sparqlQuery(dbpediaEndpoint, query, callback);
    }
    
}(jQuery));

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
        },   

        toGraphData: function() {
            var graphData = {};
            var self = this;            
            $.each(self.json['head']['vars'], function(index, variable) {
                var row = [];
                $.each(self.json['results']['bindings'], function(key, value) {
                    row.push(value[variable]['value']);
                });
                graphData[variable] = row;
            });
            return graphData;
        }       
    };
    
    var tiresEndpoint = 'https://analysis-of-tire-quality.herokuapp.com/tires/query?query=';
    var dbpediaEndpoint = 'http://dbpedia.org/sparql?format=json&query=';

    $.sparqlQuery = function(endpoint, query, onSuccess, onFailure) {
        var url = endpoint + query.encode();
        $.getJSON(url)
            .success(function(data) {
                var result = new $.SparqlResult(data);
                if (onSuccess && typeof onSuccess !== 'undefined') {
                    onSuccess(result);
                }
            })
            .fail(function(jqxhr, textStatus, error) {
                if (onFailure && typeof onFailure !== 'undefined') {
                    onFailure(error);
                }
            });
    };

    $.tiresQuery = function(query, onSuccess, onFailure) {
        return $.sparqlQuery(tiresEndpoint, query, onSuccess, onFailure);
    }

    $.dbpediaQuery = function(query, onSuccess, onFailure) {
        return $.sparqlQuery(dbpediaEndpoint, query, onSuccess, onFailure);
    }
    
}(jQuery));

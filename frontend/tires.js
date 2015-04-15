$(document).ready(function() {
    
    $.getAllBrands(
        function(listOfBrands) {
            // listOfBrands: string[]
            $.each(listOfBrands, function(key, value) {
                $('#brands').append($("<option></option>")
                                    .attr("value", value)
                                    .text(value));
            });
        },
        function(error) {
            // error: string
        }
    );
        
    $('#brands').change(function() {
        var brand = $(this).val();
        $.getBrandSizes(
            brand,
            function(listOfSizes) {
                // listOfSizes: string[]
                $('#sizes').find('option').remove();
                $('#sizes').append($("<option></option>")
                                   .attr("disabled", "disabled")
                                   .text("Select a size"));
                $.each(listOfSizes, function(key, value) {                    
                    $('#sizes').append($("<option></option>")
                                       .attr("value", value)
                                       .text(value));
                });
            },
            function(error) {
                // error: string
            }
        );
        $.getWikiLink(
            brand,
            function(wikiLink) {
                // wikiLink: string
                $('#wiki-link').text(wikiLink);
            },
            function(error) {
                // error: string
            }
        );
        $.getLogo(
            brand,
            function(logo) {
                // logo: string
                $('#brand-logo').attr("src", logo);
            },
            function(error) {
                // error: string
            }
        );
    });
        
    $('#sizes').change(function() {
        var brand = $('#brands').val();
        var size = $(this).val();
        $.getGraphData(
            brand,
            size,
            function(graphData) {
                // graphData: string[][]
                $('#graph-data').text(JSON.stringify(graphData, null, '  '));
            },
            function(error) {
                // error: string
            }
        );
    });
    
});

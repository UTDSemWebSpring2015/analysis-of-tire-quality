$(document).ready(function() {
    var imagesrc;
    var wikiurl;
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
        var chart = $('#container').highcharts();
        if(typeof chart != 'undefined')
        {
            chart.destroy();
            $('#brand-logo').attr("src", "");
        }
        $.getBrandSizes(
            brand,
            function(listOfSizes) {
                // listOfSizes: string[]
                $('#sizes').find('option').remove();
                $('#sizes').append($("<option></option>")
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
                wikiurl = wikiLink;
                //$('#wiki-link').attr("href",wikiLink);
                //$('#wiki-link').name(brand);
            },
            function(error) {
                // error: string
            }
        );
        $.getLogo(
            brand,
            function(logo) {
                // logo: string
                imagesrc = logo;
                $('#brand-logo').show();
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
                process(graphData,imagesrc,wikiurl);
                //$('#graph-data').text(JSON.stringify(graphData, null, '  '));
            },
            function(error) {
                // error: string
            }
        );
    });
    
});

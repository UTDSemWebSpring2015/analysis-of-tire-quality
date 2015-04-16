function process(graphdata,imagesrc,wikiurl)
{
    var tirelines = graphdata["tireline"];
    var wear = graphdata["wear"];
    var wearnumbers = [];
    var tempnumbers = [];
    var tracnumbers = [];
    var temp = graphdata["temp"];
    var trac = graphdata["trac"];
    if(wear.length<5)
    {
        $('#container').height("50%");
    }
    else if(wear.length>=5&&wear.length<=10)
    {
        $('#container').height("120%");
    }
    else if(wear.length>=10&&wear.length<=25)
    {
        $('#container').height("250%");
    }
    else
    {
        $('#container').height("500%");
    }
    for (i = 0; i < wear.length; i++) { 
    wearnumbers[i] = parseInt(wear[i]);
    if(temp[i]=="A")
    {
        tempnumbers[i] = 300;
    }
    if(temp[i]=="B")
    {
        tempnumbers[i] = 200;
    }
    if(temp[i]=="C")
    {
        tempnumbers[i] = 100;
    }

    if(trac[i] == "AA")
    {
        tracnumbers[i] = 400;
    }
    if(trac[i] == "A")
    {
        tracnumbers[i] = 300;
    }
    if(trac[i] == "B")
    {
        tracnumbers[i] = 200;
    }
    if(trac[i] == "C")
    {
        tracnumbers[i] = 100;
    }
    }
    draw(tirelines,wearnumbers,tempnumbers,tracnumbers,imagesrc,wikiurl,temp,trac);
}
function draw(tirelines, wear,temp,trac,imagesrc,wikiurl,tempstr,tracstr)
{
    $('#container').highcharts({
        chart: {
            type: 'bar'
        },
        title: {
            text: 'Performance of Tires'
        },
        xAxis: {
            categories:tirelines,
            labels: {
                formatter: function () {
                    return '<a target="_blank" href="' +wikiurl+ '">' +
                        this.value + '</a>';
                }
            }
            
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Quality Parameters'
            }
        },
        tooltip: {
            formatter: function () {
                var serieI = this.series.index;
                var index = tirelines.indexOf(this.x);
                var returnvar;
                if(serieI==0)
                {
                    returnvar =  this.x +" -- Wear : "+wear[index];
                }
                else if(serieI==1)
                {
                    returnvar = this.x+" -- Temperature : "+tempstr[index];
                }
                else if(serieI==2)
                {
                    returnvar = this.x+" -- Track : "+tracstr[index];
                }
                return returnvar;
            }
        },
        legend: {
            align: 'right',
            verticalAlign: 'top',
            x: -40,
            y: 100,
            floating: true,
            borderWidth: 1,
            backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
            shadow: true
        },
        credits: {
            enabled: false
        },
        series: [{
            name: 'wear',
            data: wear,
        },
        {
            name: 'Temperature',
            data: temp
        },
        {
            name: 'Track',
            data: trac
        }


        ]
    }
    );
}
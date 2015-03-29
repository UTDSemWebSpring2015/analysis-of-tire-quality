# analysis-of-tire-quality
Group project for Semantic Web CS-6301.506

Start Fuseki server
===================

    ./start-fuseki.sh

The server starts on port 3030 and provides read-only access to the Dataset 1353
from http://data-gov.tw.rpi.edu/wiki/Dataset_1353.


Query Tires dataset
===================

Query using Fuseki's s-query

    cd jena-fuseki1-1.1.2
    ./s-query --service http://localhost:3030/tires/query 'SELECT * {?s ?p ?o} LIMIT 10'

Query using GET on localhost:
[http://localhost:3030/tires/query?query=SELECT * {?s ?p ?o} LIMIT 5](http://localhost:3030/tires/query?query=SELECT%20*%20%7B?s%20?p%20?o%7D%20LIMIT%205)


Heroku deployment
=================

The Java app was deployed to Heroku under: analysis-of-tire-quality.

Note: heroku apps go to sleep if they are not accessed for 10 minutes,
so you might get a timeout the first time you try to access it. If it
does happen, just try it again and it should work.

Query using GET on Heroku:
[https://analysis-of-tire-quality.herokuapp.com/tires/query?query=SELECT * {?s ?p ?o} LIMIT 5](https://analysis-of-tire-quality.herokuapp.com/tires/query?query=SELECT%20*%20%7B?s%20?p%20?o%7D%20LIMIT%205)


Query DBpedia
=============

Query usin Fuseki's s-query

    cd jena-fuseki1-1.1.2
    ./s-query --service http://dbpedia.org/sparql 'SELECT * {?s ?p ?o} LIMIT 10'

Query using GET:
[http://dbpedia.org/sparql?format=json&query=SELECT * {?s ?p ?o} LIMIT 5](http://dbpedia.org/sparql?format=json&query=SELECT%20*%20%7B?s%20?p%20?o%7D%20LIMIT%205)


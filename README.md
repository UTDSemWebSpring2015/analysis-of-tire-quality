# analysis-of-tire-quality
Group project for Semantic Web CS-6301.506

Start Fuseki server
===================

> ./start-fuseki.sh

The server starts on port 3030 and provides read-only access to the Dataset 1353
from http://data-gov.tw.rpi.edu/wiki/Dataset_1353.


Query Tires dataset
===================

> cd jena-fuseki1-1.1.2
> ./s-query --service http://localhost:3030/tires/query 'SELECT * {?s ?p ?o} LIMIT 10'


Query DBpedia
=============

> cd jena-fuseki1-1.1.2
> ./s-query --service http://dbpedia.org/sparql 'SELECT * {?s ?p ?o} LIMIT 10'

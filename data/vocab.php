<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE rdf:RDF[
	<!ENTITY rdf 'http://www.w3.org/1999/02/22-rdf-syntax-ns#'>
	<!ENTITY rdfs 'http://www.w3.org/2000/01/rdf-schema#'>
	<!ENTITY owl 'http://www.w3.org/2002/07/owl#'>
	<!ENTITY swivt 'http://semantic-mediawiki.org/swivt/1.0#'>
	<!ENTITY wiki 'http://data-gov.tw.rpi.edu/vocab/'>
	<!ENTITY property 'http://data-gov.tw.rpi.edu/vocab/p/'>
	<!ENTITY wikiurl 'http://data-gov.tw.rpi.edu/wiki/'>
]>

<rdf:RDF
	xmlns:dgp92="&property;92/"
	xmlns:rdf="&rdf;"
	xmlns:rdfs="&rdfs;"
	xmlns:owl ="&owl;"
	xmlns:swivt="&swivt;"
	xmlns:wiki="&wiki;"
	xmlns:property="&property;">
	<!-- Ontology header -->
	<owl:Ontology rdf:about="http://data-gov.tw.rpi.edu/vocab.php?property=1353">
		<swivt:creationDate rdf:datatype="http://www.w3.org/2001/XMLSchema#dateTime">2015-03-12T04:51:14+00:00</swivt:creationDate>
		<owl:imports rdf:resource="http://semantic-mediawiki.org/swivt/1.0" />
	</owl:Ontology>
	<!-- exported page data -->
	<owl:ObjectProperty rdf:about="&property;1353">
		<rdfs:label>1353</rdfs:label>
		<swivt:page rdf:resource="&wikiurl;Property:1353"/>
		<rdfs:isDefinedBy rdf:resource="http://data-gov.tw.rpi.edu/vocab.php?property=1353"/>
	</owl:ObjectProperty>
	<!-- References to the SWiVT Ontology, see http://semantic-mediawiki.org/swivt/ -->
	<owl:AnnotationProperty rdf:about="&swivt;page">
		<rdfs:isDefinedBy rdf:resource="http://semantic-mediawiki.org/swivt/1.0"/>
	</owl:AnnotationProperty>
	<owl:AnnotationProperty rdf:about="&swivt;creationDate">
		<rdfs:isDefinedBy rdf:resource="http://semantic-mediawiki.org/swivt/1.0"/>
	</owl:AnnotationProperty>
	<owl:Class rdf:about="&swivt;Subject">
		<rdfs:isDefinedBy rdf:resource="http://semantic-mediawiki.org/swivt/1.0"/>
	</owl:Class>
	<!-- Created by Semantic MediaWiki, http://semantic-mediawiki.org -->
</rdf:RDF>
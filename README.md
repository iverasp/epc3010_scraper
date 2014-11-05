epc3010_scraper
===============

Scrapes the modems web page for signal levels, stores them in sqlite and displays in graph.
Not able to use SNMP because ISP (Canal Digital) blocks this at firmware level.

Needs the following to be able to install pip package lxml:
apt-get install libxml2-dev libxslt1-dev python-dev

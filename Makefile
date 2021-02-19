

build:
	ng build --base-href /events-website

build_docs: build
	cp mv dist/events-website/* docs/



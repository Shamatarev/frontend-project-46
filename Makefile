install: # установить зависимости
	npm ci
	sudo npm link
publish:
	sudo npm publish --dry-run
gendiff:	 # запустить приложение
	node bin/gendiff.js
lint:
	npx eslint .
	
test:
	npm test

test-coverage:
	npm test -- --coverage 
	
.PHONY: test
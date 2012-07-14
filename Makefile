test:
	@npm test
    
clean:
	@rm -rf lib-cov
	@rm -f coverage.html    
    
coverage:
	@rm -f coverage.html
	@rm -rf lib-cov
	@/usr/local/bin/jscoverage lib lib-cov
	@NODEJSYAPAGINATE=1 mocha --require should -R html-cov > coverage.html
	@rm -rf lib-cov
    
    
.PHONY: test coverage

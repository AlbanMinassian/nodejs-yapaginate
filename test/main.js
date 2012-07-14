// -*- coding: utf-8 -*-

var libpath = process.env['NODEJSYAPAGINATE'] ? '../lib-cov' : '../lib';

var should = require('should');
var underscore = require('underscore');
var paginate = require(libpath+'/main');

describe('paginate', function() {
    describe('with no arguments', function() {
        
        // ----------------------------------------------------------
        // test html / no option
        // ----------------------------------------------------------
        it('return valid html without option', function() {
            var result = paginate();
            result.should.eql('<div class="pagination"><ul>\
<li class="disable"><a href="#">&laquo;&laquo;</a></li>\
<li class="disable"><a href="#">&laquo;</a></li>\
<li class="active"><a href="#">1</a></li>\
<li class=""><a href="/unknowurl?pageno=2">2</a></li>\
<li class=""><a href="/unknowurl?pageno=3">3</a></li>\
<li class=""><a href="/unknowurl?pageno=4">4</a></li>\
<li class=""><a href="/unknowurl?pageno=5">5</a></li>\
<li class="disabled"><a href="#">&#8230;</a></li>\
<li class=""><a href="/unknowurl?pageno=99">99</a></li>\
<li class=""><a href="/unknowurl?pageno=100">100</a></li>\
<li class=""><a href="/unknowurl?pageno=2">&raquo;</a></li>\
<li class=""><a href="/unknowurl?pageno=100">&raquo;&raquo;</a></li>\
</ul></div>');
        });
        
        // ----------------------------------------------------------
        // test html / showStep option
        // ----------------------------------------------------------
        it('return html without step', function() {
            var result = paginate({showStep:false});
            result.should.eql('<div class="pagination"><ul>\
<li class="disable"><a href="#">&laquo;&laquo;</a></li>\
<li class="disable"><a href="#">&laquo;</a></li>\
<li class=""><a href="/unknowurl?pageno=2">&raquo;</a></li>\
<li class=""><a href="/unknowurl?pageno=100">&raquo;&raquo;</a></li>\
</ul></div>');
        });
        
        // ----------------------------------------------------------
        // test getJson, default option
        // ----------------------------------------------------------
        // http://stackoverflow.com/questions/201183/how-do-you-determine-equality-for-two-javascript-objects
        it('return json, default option', function() {
            
            var result = paginate({getJson:true});
            var shouldResult =  { 
                options: { showFirstLast: true, showPrevNext: true, showStep: true },
                first: { cssclass: 'disable', href: '#', text: '&laquo;&laquo;' },
                previous: { cssclass: 'disable', href: '#', text: '&laquo;' },
                step: [ 
                    { ispageno: true, cssclass: 'active', href: '#', text: '1' },
                    { ispageno: true, cssclass: '', href: '/unknowurl?pageno=2', text: '2' },
                    { ispageno: true, cssclass: '', href: '/unknowurl?pageno=3', text: '3' },
                    { ispageno: true, cssclass: '', href: '/unknowurl?pageno=4', text: '4' },
                    { ispageno: true, cssclass: '', href: '/unknowurl?pageno=5', text: '5' },
                    { ispageno: false, cssclass: 'disabled', href: '#', text: '&#8230;' },
                    { ispageno: true, cssclass: '', href: '/unknowurl?pageno=99', text: '99' },
                    { ispageno: true, cssclass: '', href: '/unknowurl?pageno=100', text: '100' } 
                ],
                next: { cssclass: '', href: '/unknowurl?pageno=2', text: '&raquo;' },
                last: { cssclass: '', href: '/unknowurl?pageno=100', text: '&raquo;&raquo;' } 
            };            
            underscore.isEqual(result, shouldResult).should.eql( true );
        });
        
        // ----------------------------------------------------------
        // test getJson, set page 2/10
        // ----------------------------------------------------------
        // http://stackoverflow.com/questions/201183/how-do-you-determine-equality-for-two-javascript-objects
        it('return json, set page 2/10', function() {
            
            var result = paginate({getJson:true, totalItem:100, itemPerPage:10, currentPage:2, url:'/mybeautifulapp' });
            var shouldResult =  { 
                options: { showFirstLast: true, showPrevNext: true, showStep: true },
                first: { text: '&laquo;&laquo;', cssclass: '', href: '/mybeautifulapp?pageno=1' },
                previous: { text: '&laquo;', cssclass: '', href: '/mybeautifulapp?pageno=1' },
                step: [ 
                    { ispageno: true,  cssclass: '', href: '/mybeautifulapp?pageno=1',  text: '1' },
                    { ispageno: true, cssclass: 'active', href: '#', text: '2' },
                    { ispageno: true, cssclass: '', href: '/mybeautifulapp?pageno=3',  text: '3' },
                    { ispageno: true, cssclass: '', href: '/mybeautifulapp?pageno=4', text: '4' },
                    { ispageno: true, cssclass: '', href: '/mybeautifulapp?pageno=5', text: '5' },
                    { ispageno: true, cssclass: '', href: '/mybeautifulapp?pageno=6', text: '6' },
                    { ispageno: false, cssclass: 'disabled', href: '#', text: '&#8230;' },
                    { ispageno: true, cssclass: '', href: '/mybeautifulapp?pageno=9', text: '9' },
                    { ispageno: true, cssclass: '', href: '/mybeautifulapp?pageno=10', text: '10' } 
                ],
                next: { text: '&raquo;', cssclass: '', href: '/mybeautifulapp?pageno=3' },
                last: { text: '&raquo;&raquo;', cssclass: '', href: '/mybeautifulapp?pageno=10' } 
            };            
            underscore.isEqual(result, shouldResult).should.eql( true );
        });
        
        
        // ----------------------------------------------------------
        // test getJson, set page 9/10
        // ----------------------------------------------------------
        // http://stackoverflow.com/questions/201183/how-do-you-determine-equality-for-two-javascript-objects
        it('return json, set page 9/10', function() {
            
            var result = paginate({getJson:true, totalItem:100, itemPerPage:10, currentPage:10, url:'/mybeautifulapp' });
            var shouldResult =  { 
                options: { showFirstLast: true, showPrevNext: true, showStep: true },
                first: { text: '&laquo;&laquo;', cssclass: '', href: '/mybeautifulapp?pageno=1' },
                previous: { text: '&laquo;', cssclass: '', href: '/mybeautifulapp?pageno=9' },
                step: [ 
                    { ispageno: true, cssclass: '', href: '/mybeautifulapp?pageno=1', text: '1' },
                    { ispageno: true, cssclass: '', href: '/mybeautifulapp?pageno=2', text: '2' },
                    { ispageno: false, cssclass: 'disabled', href: '#', text: '&#8230;' },
                    { ispageno: true, cssclass: '', href: '/mybeautifulapp?pageno=6', text: '6' },
                    { ispageno: true, cssclass: '', href: '/mybeautifulapp?pageno=7', text: '7' },
                    { ispageno: true, cssclass: '', href: '/mybeautifulapp?pageno=8', text: '8' },
                    { ispageno: true, cssclass: '', href: '/mybeautifulapp?pageno=9', text: '9' },
                    { ispageno: true, cssclass: 'active', href: '#', text: '10' } 
                ],
                next: { text: '&raquo;', cssclass: 'disable', href: '#' },
                last: { text: '&raquo;&raquo;', cssclass: 'disable', href: '#' } 
            };            
            underscore.isEqual(result, shouldResult).should.eql( true );
        });
        
        // ----------------------------------------------------------
        // test setJson
        // ----------------------------------------------------------
        it('return html from json', function() {
            
            var result = paginate({setJson: {
                options: { showFirstLast: true, showPrevNext: true, showStep: true },
                first: { cssclass: 'disable', href: '#', text: '&laquo;&laquo;' },
                previous: { cssclass: 'disable', href: '#', text: '&laquo;' },
                step: [ 
                    { ispageno: true, cssclass: 'active', href: '#', text: '1' },
                    { ispageno: true, cssclass: '', href: '/unknowurl?pageno=2', text: '2' },
                    { ispageno: true, cssclass: '', href: '/unknowurl?pageno=3', text: '3' },
                    { ispageno: true, cssclass: '', href: '/unknowurl?pageno=4', text: '4' },
                    { ispageno: true, cssclass: '', href: '/unknowurl?pageno=5', text: '5' },
                    { ispageno: false, cssclass: 'disabled', href: '#', text: '&#8230;' },
                    { ispageno: true, cssclass: '', href: '/unknowurl?pageno=99', text: '99' },
                    { ispageno: true, cssclass: '', href: '/unknowurl?pageno=100', text: '100' } 
                ],
                next: { cssclass: '', href: '/unknowurl?pageno=2', text: '&raquo;' },
                last: { cssclass: '', href: '/unknowurl?pageno=100', text: '&raquo;&raquo;' } 
            }});
            result.should.eql('<div class="pagination"><ul>\
<li class="disable"><a href="#">&laquo;&laquo;</a></li>\
<li class="disable"><a href="#">&laquo;</a></li>\
<li class="active"><a href="#">1</a></li>\
<li class=""><a href="/unknowurl?pageno=2">2</a></li>\
<li class=""><a href="/unknowurl?pageno=3">3</a></li>\
<li class=""><a href="/unknowurl?pageno=4">4</a></li>\
<li class=""><a href="/unknowurl?pageno=5">5</a></li>\
<li class="disabled"><a href="#">&#8230;</a></li>\
<li class=""><a href="/unknowurl?pageno=99">99</a></li>\
<li class=""><a href="/unknowurl?pageno=100">100</a></li>\
<li class=""><a href="/unknowurl?pageno=2">&raquo;</a></li>\
<li class=""><a href="/unknowurl?pageno=100">&raquo;&raquo;</a></li>\
</ul></div>');
        });
        
        
        
    });
});

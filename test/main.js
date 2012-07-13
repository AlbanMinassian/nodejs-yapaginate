// -*- coding: utf-8 -*-

var should = require('should');
var underscore = require('underscore');
var paginate = require('../lib/main');

describe('paginate', function() {
    describe('with no arguments', function() {
        
        // ----------------------------------------------------------
        // test no option
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
        // test showStep
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
        // test getJson
        // ----------------------------------------------------------
        // http://stackoverflow.com/questions/201183/how-do-you-determine-equality-for-two-javascript-objects
        it('return json', function() {
            
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
        
        
        
    });
});

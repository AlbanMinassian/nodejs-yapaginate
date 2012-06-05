// -*- coding: utf-8 -*-

var should = require('should');
var paginate = require('../lib/main');

describe('paginate', function() {
    describe('with no arguments', function() {
        it('return valid html without option', function() {
            
            var result = paginate();
            result.should.eql('<div class="pagination"><ul>\
<li class="disable"><a href="#">&laquo&laquo</a></li>\
<li class="disable"><a href="#">&laquo</a></li>\
<li class="active"><a href="#">1</a></li>\
<li><a href="/unknowurl?pageno=2">2</a></li>\
<li><a href="/unknowurl?pageno=3">3</a></li>\
<li><a href="/unknowurl?pageno=4">4</a></li>\
<li><a href="/unknowurl?pageno=5">5</a></li>\
<li class="disabled"><a href="#">&#8230;</a></li>\
<li><a href="/unknowurl?pageno=99">99</a></li>\
<li><a href="/unknowurl?pageno=100">100</a></li>\
<li><a href="/unknowurl?pageno=2">&raquo</a></li>\
<li><a href="/unknowurl?pageno=100">&raquo&raquo</a></li>\
</ul></div>');
        });
        
        it('return html witout step', function() {
            var result = paginate({showStep:false});
            result.should.eql('<div class="pagination"><ul>\
<li class="disable"><a href="#">&laquo&laquo</a></li>\
<li class="disable"><a href="#">&laquo</a></li>\
<li><a href="/unknowurl?pageno=2">&raquo</a></li>\
<li><a href="/unknowurl?pageno=100">&raquo&raquo</a></li>\
</ul></div>');
        });
    });
});

// -*- coding: utf-8 -*-

var querystring = require('querystring')

function urlpageno(argUrl, argParampageno, argPageno, argOtherParams  ) {
    var params = argOtherParams  || {};
    params[argParampageno] = argPageno; // add param pageno=X
    return argUrl + '?' + querystring.stringify(params);
}

function cr(argTrueFalse) {
    return argTrueFalse===true ? "\n" : null;
}

function paginate(argOpts) {
    
    // --------------------------------------------------------------------------------------------------------
    // options
    // --------------------------------------------------------------------------------------------------------
    var opts = argOpts || {};
    opts.url = 'url' in opts ? opts.url : '/unknowurl';
    opts.params = 'params' in opts ? opts.params : {};
    opts.firstText = 'firstText' in opts ? opts.firstText : '&laquo;&laquo;';
    opts.prevText = 'prevText' in opts ? opts.prevText : '&laquo;';
    opts.nextText = 'nextText' in opts ? opts.nextText : '&raquo;';
    opts.lastText = 'lastText' in opts ? opts.lastText : '&raquo;&raquo;';
    opts.dotText = 'dotText' in opts ? opts.dotText : '&#8230;';
    opts.parampageno = 'parampageno' in opts ? opts.parampageno : 'pageno';
    opts.totalItem = 'totalItem' in opts ? parseInt(opts.totalItem) : 1000;
    opts.itemPerPage = 'itemPerPage' in opts ? parseInt(opts.itemPerPage) : 10;
    opts.currentPage = 'currentPage' in opts ? parseInt(opts.currentPage) : 1;
    opts.showPrevNext = 'showPrevNext' in opts ? Boolean(opts.showPrevNext) : true;
    opts.hideDots = 'hideDots' in opts ? Boolean(opts.hideDots) : false; // si false alors afficher dots selon opts.DotsMidSize et opts.DotsEndSize
    opts.DotsMidSize = 'DotsMidSize' in opts ? parseInt(opts.DotsMidSize) : 4; // currentPage + X step before dot
    opts.DotsEndSize = 'DotsEndSize' in opts ? parseInt(opts.DotsEndSize) : 2; // dot + X step before end
    opts.showFirstLast = 'showFirstLast' in opts ? Boolean(opts.showFirstLast) : true;
    opts.showCR = 'showCR' in opts ? Boolean(opts.showCR) : false;
    opts.showStep = 'showStep' in opts ? Boolean(opts.showStep) : true;
        
    // --------------------------------------------------------------------------------------------------------
    // html
    // --------------------------------------------------------------------------------------------------------
    var total = parseInt(Math.ceil(opts.totalItem/opts.itemPerPage));
    var dots = false;
    var html = [];
    
    // begin
    html.push('<div class="pagination"><ul>');
    html.push(cr(opts.showCR));
    
    // first
    if (opts.showFirstLast) {
         if( 1 == opts.currentPage) {
            html.push('<li class="disable">');
            html.push('<a href="#">');
            html.push(opts.firstText);
            html.push('</a></li>');
            html.push(cr(opts.showCR));
             
        } else {
            html.push('<li>');
            html.push('<a href="');
            html.push(urlpageno(opts.url, opts.parampageno, 1, opts.params));
            html.push('">');
            html.push(opts.prevText);
            html.push('</a></li>');
            html.push(cr(opts.showCR));
        }
    }
    
    // previous
    if (opts.showPrevNext) {
         if( 1 == opts.currentPage) {
            html.push('<li class="disable">');
            html.push('<a href="#">');
            html.push(opts.prevText);
            html.push('</a></li>');
            html.push(cr(opts.showCR));
             
        } else { // 1 < opts.currentPage
            html.push('<li>');
            html.push('<a href="');
            html.push(urlpageno(opts.url, opts.parampageno, opts.currentPage - 1, opts.params));
            html.push('">');
            html.push(opts.prevText);
            html.push('</a></li>');
            html.push(cr(opts.showCR));
        }
    }
    
    // step & dots
    if (opts.showStep) {
        for (var i=1; i <= total; i++) {
            if (i === opts.currentPage) {
                html.push('<li class="active"><a href="#">' + i + '</a></li>');
                html.push(cr(opts.showCR));
                dots = true;
            } else {
                if (opts.hideDots || (i <= opts.DotsEndSize || (opts.currentPage && i >= opts.currentPage - opts.DotsMidSize && i <= opts.currentPage + opts.DotsMidSize) || i > total - opts.DotsEndSize)) {
                    html.push('<li><a href="' + urlpageno(opts.url, opts.parampageno, i, opts.params) + '">' + i + '</a></li>');
                    html.push(cr(opts.showCR));
                    dots = true;
                } else if (dots === true && !opts.hideDots) {
                    html.push('<li class="disabled"><a href="#">'+opts.dotText+'</a></li>');
                    html.push(cr(opts.showCR));
                    dots = false;
                }
            }
        }
    }

    // next
    if (opts.showPrevNext) {
         if( total == opts.currentPage) {
            html.push('<li class="disable">');
            html.push('<a href="#">');
            html.push(opts.nextText);
            html.push('</a></li>');
            html.push(cr(opts.showCR));
        } else { // opts.currentPage < total
            html.push('<li>');
            html.push('<a href="');
            html.push(urlpageno(opts.url, opts.parampageno, opts.currentPage + 1, opts.params));
            html.push('">');
            html.push(opts.nextText);
            html.push('</a></li>');
            html.push(cr(opts.showCR));
        }
    }
    
    // last
    if (opts.showFirstLast) {
         if( total == opts.currentPage) {
            html.push('<li class="disable">');
            html.push('<a href="#">');
            html.push(opts.lastText);
            html.push('</a></li>');
            html.push(cr(opts.showCR));
        } else {
            html.push('<li>');
            html.push('<a href="');
            html.push(urlpageno(opts.url, opts.parampageno, total, opts.params));
            html.push('">');
            html.push(opts.lastText);
            html.push('</a></li>');
            html.push(cr(opts.showCR));
        }
    }
  
    // end
    html.push('</ul></div>');
    return html.join('');

}

module.exports = paginate;

//~ console.log(paginate({showCR:true}))
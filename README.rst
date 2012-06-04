
.. image:: https://secure.travis-ci.org/ami44/nodejs-yapaginate.png

nodejs-yapaginate 
=========================================================

Yet another paginate view helper for nodejs. Generate html twitter bootstrap pagination.

Usage
------------------------------------------

Classic usage :: 

    var paginate = require('./lib/main');
    console.log(paginate({totalItem:100, itemPerPage:10, currentPage:2, url:'/mybeautifulapp'}));

Options
------------------------------------------

============= =================== ===========================================
name          default             description  
============= =================== ===========================================
totalItem     1000;               total items
itemPerPage   10;                 items per page
currentPage   1;                  current selected page
url           '/unknowurl'        default link 
params        {}                  your personnal params add to link : if {aa:bb} => url?aa=bb
parampageno   'pageno';           key name add to link : url?pageno=10
showPrevNext  true;               show previous and next button 
showFirstLast true                show first and last button   
hideDots      false               hide dots separator
DotsMidSize   4;                  show X step before and after current page ( if hideDots = true )
DotsEndSize   2                   show X step after first and before end page ( if hideDots = true )
dotText       '&#8230;';          text for dots separator ( if hideDots = true )
firstText     '&laquo&laquo';     text for goto first page
prevText      '&laquo';           text for goto previous page
nextText      '&raquo';           text for goto next page
lastText      '&raquo&raquo';     text for goto last page
showCR        false               add \\n (only for debug)
============= =================== ===========================================


Licence
------------------------------------------
Code licensed under the `GNU GENERAL PUBLIC LICENSE Version 3 <http://www.gnu.org/copyleft/gpl.html>`_

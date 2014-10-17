|Travisci|_

.. |Travisci| image:: https://secure.travis-ci.org/ami44/nodejs-yapaginate.png
.. _Travisci: https://travis-ci.org/ami44/nodejs-yapaginate



|Nodeico|_

.. |Nodeico| image:: https://nodei.co/npm-dl/nodejs-yapaginate.png
.. _Nodeico: https://npmjs.org/package/nodejs-yapaginate


nodejs-yapaginate 
=========================================================

Yet another paginate view helper for nodejs. 

Generate html twitter bootstrap `pagination <http://twitter.github.com/bootstrap/components.html#pagination>`_.

.. image:: https://github.com/ami44/nodejs-yapaginate/raw/master/media/pagination.png

or json for another usage ::

    { 
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
    }

Install
------------------------------------------

npm :
....................................................


- Edit your ``package.json``
- Add ::

    "dependencies": { 
        "nodejs-yapaginate": ""
    },

- Execute ``npm install``
- Add ``var paginate = require('nodejs-yapaginate');`` in your code


browser (backbone, derbyjs ...)
................................................................

Add ::

    <script src="/nodejs-yapaginate/lib/main.js"></script>

Usage
------------------------------------------

Html output :: 
    
    console.log(paginate({totalItem:100, itemPerPage:10, currentPage:2, url:'/mybeautifulapp'}));

Json output :: 

    console.log(paginate({totalItem:100, itemPerPage:10, currentPage:2, url:'/mybeautifulapp', getJson:true }));
    

Options
------------------------------------------

============= =================== ===========================================
name          default             description  
============= =================== ===========================================
totalItem     1000                total items
itemPerPage   10                  items per page
currentPage   1                   current selected page
url           '/unknowurl'        default link 
params        {}                  your personnal params add to link : if {aa:bb} => url?aa=bb
parampageno   'pageno'            key name add to link : url?pageno=10
showPrevNext  true                show previous and next button 
showFirstLast true                show first and last button   
showStep      true                show step page. Show or Hide [1][2][3][4]
hideDots      false               hide dots separator (if showStep = true) [1][2][...][99][100]
DotsMidSize   4                   show X step before and after current page (if hideDots = false)
DotsEndSize   2                   show X step after first and before end page (if hideDots = false)
dotText       '&#8230;'           text for dots separator (if hideDots = false)
firstText     '&laquo;&laquo;'    text for goto first page
prevText      '&laquo;'           text for goto previous page
nextText      '&raquo;'           text for goto next page
lastText      '&raquo;&raquo;'    text for goto last page
addSep        ''                  add \\n in html output (only for debug)
getJson        false              get only Json ( not generate Html )
setJson        false               consume json (nodejs-yapaginate compatible) to generate html (not use getJson and setJson)
============= =================== ===========================================


Licence
------------------------------------------

Code licensed under the `GNU GENERAL PUBLIC LICENSE <http://www.gnu.org/copyleft/gpl.html>`_ Version 3 

Alternative
------------------------------------------

https://github.com/mpipet/react-bootpage

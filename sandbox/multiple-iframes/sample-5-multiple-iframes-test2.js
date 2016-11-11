
    var MIF = {};

    MIF.iframes = [];
    MIF.renderers = [];
    MIF.renderersLimit = 3;

    MIF.animate = function() {

        requestAnimationFrame( MIF.animate );

        for ( var i = 0, iframe, rect; i < MIF.iframes.length; i++ ) {

            iframe = MIF.iframes[ i ];

            rect = iframe.getBoundingClientRect();

            if ( rect.bottom > 0 && rect.top < window.innerHeight ) { MIF.updateView( iframe ); }

        }

    }


    MIF.updateView = function( iframe ) {

        var views, furthestView;

        views = document.getElementsByClassName( 'inView' );

        if ( views.length > MIF.renderersLimit ) {

            furthestView = MIF.renderers.pop();
            furthestView.className = '';
            furthestView.src = '';

        }

        if ( iframe.className == '' ) {

            iframe.src = iframe.sourceFile;

// test 6            iframe.src = iframe.sourceFile ? iframe.sourceFile : iframe.src;

            iframe.className = 'inView';

            MIF.renderers.unshift( iframe );

        }

    }


    MIF.init = function() {

        MIF.iframes = document.getElementsByTagName( 'iframe' );

        for ( var i = 0, iframe; i < MIF.iframes.length; i++ ) {

            iframe = MIF.iframes[ i ];
            iframe.sourceFile = iframe.src;
            iframe.src = '';

        }

            MIF.animate();  // with test 1 - 6

    }

    /* test 7 */

    //Appears to work. Requires 'defer' option in <script> tag

            MIF.init();



/* test 6

//loads early. has problems keeping track of source files

        MIF.init();

        MIF.animate();

*/

/* test 5

// loads too late. all iframes instanced and start renderers

    document.addEventListener( 'load', MIF.init );

*/


/* test 4

// loads too late. all iframes instanced and start renderers

    document.addEventListener( 'load', function() { MIF.init() }, false );

*/


/* test 3

// loads too late. all iframes instanced and start renderers

    document.addEventListener( 'load', function() { MIF.init() } );

*/

/* test 2

// loads too late. all iframes instanced and start renderers

    window.addEventListener( 'load', function() { MIF.init() } );

*/

/* test 1

// loads too early. init runs before iframes are instanced. therefore no iframe.sourceFile

    MIF.init();
    MIF.animate();

*/

/**
 * Begin of Webslite App
 * The Convertion of
 * Website to
 * Webslide
 */

// Get images from facebook
function getImage_facebook () {

    var imgs = $('img'),
        body = $( 'body'),
        hasSlide = body.hasClass( 'slide');

    imgs.each( function ( index ) {
        var image = $(this);
        generateSlide(image);
    });

    // Show Slider When All Content Loaded
    if (!hasSlide) {
        body.addClass('slide');
        $('#webslider').delay(5000).fadeIn(1000);
    }

    // Rise up
    $('.fotorama').fotorama();
    $('html, body').animate({scrollTop: 0}, 3000);
}

/** startWebslite(); **/

/***********************************************************************************************************/

// Images from noscript
function noscripts () {

    var objectos = $('noscript');

    objectos.each( function ( index ) {
        var image = $(this);

        generateSlide ( image );
        //generateLog ( image );

        if ( index > 100 ) {
            return false;
        }
    });

}

// Generate and Appends to Slide
function generateSlide ( image ) {
    // Declare Vars
    var outImagem ,
        img_src ,
        img_alt ,
        img_width ,
        img_height ;

    /**if ( image != '' && $.type( image ) === 'object' ) {
        if (image.attr('src') != 'undefined') {*/
            // Setters
            img_src = image.attr('src');
            img_alt = image.attr('alt');
            img_width = image.width();
            img_height = image.height();/**
        }

        if (image.attr('data-src') != 'undefined') {
            img_src = image.attr('data-src');
            img_alt = image.attr('data-alt');
            img_width = 200;
            img_height = 200;
        }
    }*/

    // Getter
    outImagem = '<a href="'+ img_src +'" data-caption="'+ img_alt +'" ></a>';

    // Validate Images and Append
    if ( img_width > 150 && img_height > 150 ) {
        $('.fotorama').append(outImagem);
    }
}

// Generate Log For Each
function generateLog ( objecto ) {
    console.log( objecto );
}

// Start Webslite
function startWebslite () {
    // Append Slide
    $( 'body' ).prepend( "<div id='webslider' style='display: none; margin:5% auto; max-width: 600px'><div class='fotorama' data-width='100%' data-auto='false' data-arrows='true' data-keyboard='true' data-arrows='always' data-ratio='16/9' data-allowfullscreen='native' data-nav='thumbs'></div></div>" );
    // Lazy-Load-Killer
    $('html, body').animate({scrollTop: 100000}, 20000);
    setTimeout( function () {
        getImage_facebook();
    }, 20000);
}

// Starters By DOcument Ready
$( document).ready( function () {
    /**
    $( 'body' ).prepend( "<div id='webslider' style='display: none; margin:5% auto; max-width: 600px'><div class='fotorama' data-width='100%' data-auto='false' data-arrows='true' data-keyboard='true' data-arrows='always' data-ratio='16/9' data-allowfullscreen='native' data-nav='thumbs'></div></div>" );
    $('.fotorama').fotorama();
    noscripts();
     */

});
startWebslite();
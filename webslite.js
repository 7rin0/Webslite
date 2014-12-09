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
        outImagem = '',
        img_src = '',
        img_width = '',
        hasSlide = body.hasClass( 'slide'),
        increment = 0;

    imgs.each( function ( index ) {
        img_src = $( this ).attr('src');
        img_width = $( this ).width();
        outImagem = '<img src="'+ img_src +'" />';

        // Validate Images
        if ( img_width > 200 ) {
            increment++;
            $('.fotorama').append(outImagem);

            console.log(img_src);
            //console.log( $.get( img_src ) );
        }

        // Limit Images
        if (increment > 20) {
            return false;
        }
    });

    // Show Slider When All Content Loaded
    if (!hasSlide) {
        body.addClass('slide');
        $('#webslider').delay(5000).fadeIn(1000);
    }
}

// Load Extension After Other Scripts
$( 'body' ).prepend( "<div id='webslider' style='display: none; margin:5% auto; width: 400px'><div class='fotorama' data-width='100%' data-ratio='800/600'></div></div>" );
getImage_facebook();
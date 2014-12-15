/**
 * Begin of Webslite App
 * The Convertion of
 * Website to
 * Webslide
 */

//****************** getImages ******************//
/**
 * Get Any Image
 * From Any Data
 * Get Only and Generate
 */
function getImages() {

    // Vars
    var data = $('a, img'),
        data_count = data.length,
        noscripts = $('noscript'),
        json_value,
        json_images = [];

    // Each image detect, validate and load
    data.each( function ( index ) {
        json_value = validateElement ( $(this) );
        if ( json_value ) {
            json_images.push( json_value );
            console.log(json_value);
        }
    });

    setInterval(function () {
        console.log($('.badge-item-img'));
    }, 5000);
}

//****************** validateElement ******************//

function validateElement( element ) {
    // Vars
    var valid_image,
        valid_args,
        alt_image,
        url_image,
        link_image,
        createJson;

    // Detect element type
    if ( element.is('a') ) {
        url_image = element.attr('href');
        alt_image = element.text();
        // Validate URL String
        valid_image = ( url_image ) ? url_image.search(/(jpg|png|svg|gif)/gi) : -1;
    } else if ( element.is('img') ) {
        url_image = element.attr('src');
        alt_image = element.attr('alt');
        valid_image = ( url_image ) ? 1 : -1;

        console.log(url_image);
    } else { return null; }

    // Validate Image Url
    url_image = replaceThumbs( url_image );

    // If Alt is not set
    if ( !alt_image ) {
        alt_image = findDescription( element );
    }

    // Get Link Image
    link_image = element.closest("a");
    link_image = link_image.attr('href');
    if ( !link_image ) {
        link_image = url_image;
    }

    // Valid arguments
    valid_args = (valid_image != -1) && element && url_image && alt_image && link_image;

    // If Image is Valid
    if ( valid_args ) {
        createJson = {
            alt: alt_image,
            url: url_image,
            link: link_image
        };
        return createJson;
    } else { return null; }
}


//****************** loadImage ******************//
function findDescription ( element ) {
    var textImage = ( element.parent().text().length > 10 ) ? element.parent().text() : element.parent().parent().text(),
        title = $( 'title').text()
        ;

    if ( textImage.length < 1 ) {
        textImage = title;
    }

    textImage = $.trim( textImage );

    return textImage;
}
//****************** loadImage ******************//
function getImage( element, url_image, alt_image ) {

    var $imagem = $('<img>').attr({'src': url_image, 'alt': alt_image, 'data-caption': alt_image });

    $imagem.on('load', function(){
        $( this ).attr('width', this.naturalWidth);
        $( this ).attr('height', this.naturalHeight);

        // Validate Size
        var valid_size = this.naturalWidth > 120 && this.naturalHeight > 120;

        if ( valid_size ) {
            $('.fotorama').append( $( this ) );
        }
    });
}

//****************** replaceThumbs ******************//

function replaceThumbs( url_image ) {

    /** Replace: If has Thumbs in url **/
    if ( url_image.indexOf('thumbs/thumbs_') != -1 ) {
        url_image = url_image.replace('thumbs/thumbs_', '');
    }

    /** VALIDATE QSA **/
    var url_image_qsa = url_image.split('&');

    if (url_image_qsa[1]) {
        // Validate QSA
        var validateQsa = false;

        $.each( url_image_qsa, function( index, value ) {
            // If contains variable W= , for Sapo.pt
            var widthExist = value.indexOf('W=') >= 0,
                heightExist = value.indexOf('H=') >= 0,
                validDim = widthExist || heightExist;

            // If is Width or Height
            if ( validDim ) {
                validateQsa = true;
                // set dimensions
                url_image_qsa[index] = setDimensions( value, 2 );

            }
        });

        // If found valid Query reconstruct
        if (validateQsa) {
            url_image = $.trim( url_image_qsa.join('&') );

        }
    }

    return url_image;
}

//****************** setDimensions ******************//
// Set Dimensions
function setDimensions( value, genRatio ) {
    // Change Ratio
    var vsize = value.split('='),
        vsize_var = vsize[0],
        vsize_value = vsize[1];

    return ( vsize_var + '=' + vsize_value * genRatio );
}

//****************** startWebslite ******************//
function getWebslite() {

    var body = $( 'body' );

    // Append Slide
    body.prepend(
        "<div id='webslider' style='display: none; margin:5% auto; max-width: 600px'>" +
            "<div class='fotorama' data-width='100%'" +
                "data-auto='false' data-arrows='true'" +
                "data-keyboard='true' data-arrows='always'" +
                "data-ratio='16/9' data-allowfullscreen='native'" +
                "data-nav='thumbs'>" +
            "</div>" +
        "</div>"
    );

    // Kill the lazyload
    $( 'html, body' ).animate( { scrollTop: 100000 }, 20000 );
    $( document ).ready( function () {
        setTimeout( function () {
            // Get All Images
            getImages();
            // Start Slider
            $('.fotorama').fotorama();
            // Scroll Up
            $('html, body').animate({scrollTop: 0}, 3000, function () {
                // When finished add class
                body.addClass('slide');
                // Show
                $('#webslider').delay(5000).fadeIn(1000);
            });
        }, 20000);
    });
}
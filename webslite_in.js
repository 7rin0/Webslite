/**
 * Begin of Webslite App
 * The Convertion of
 * Website to
 * Webslide
 */

//****************** getImages ******************//
function getImages() {

    var image,
        imgGroup,
        imgs = $('img'),
        body = $( 'body'),
        noscripts = $('noscript'),
        hasSlide = body.hasClass( 'slide');

    imgs.each( function ( index ) {
        image = $(this);

        if ( image ) {
            generateSlide( image );
            if ( index > 1000 ) { return false; }
        }

    });

}

//****************** generateSlide ******************//
function generateSlide ( image ) {

    // Declare Vars
    var outImagem ,
        valid_image,
        img_src = (image.attr('src')) ? image.attr('src') : '' ,
        img_alt = (image.attr('alt')) ? image.attr('alt') : '' ,
        img_width = (image.width()) ? image.width() : '' ,
        img_height = (image.height()) ? image.height() : '';

    // Validate Image
    if (!img_width) {
        var imagem = $( '<img />').attr('src', img_src).load( function () {
            img_width = this.naturalWidth;
            img_height = this.naturalHeight;
        });
    }
    valid_image = img_width > 150 && img_height > 150;

    if ( image === 44 ) {
        if (image.attr('data-src') != 'undefined') {
            img_src = image.attr('data-src');
            img_alt = image.attr('data-alt');
            img_width = 200;
            img_height = 200;
        }
    }

    // Getters
    if ( valid_image ) {
        outImagem = '<a href="'+ img_src +'" data-caption="'+ img_alt +'" ></a>';
        $('.fotorama').append( outImagem );
        closestValues( image );
    }
}

//****************** closestValues ******************//
function closestValues ( image ) {
    var closeLink = image.closest("a"),
        closeLink_alt = closeLink.attr("alt"),
        closeLink_href = closeLink.attr("href"),
        closeParagraph = image.closest("p"),
        data;

    data += "<p> LINK: "+ closeLink_href +"</p><br><br>";
    data += "<p> ALT: "+ closeLink_alt +"</p><br><br>";
    data += "<p> COMPLETO: <href target='_blank' alt='"+ closeLink_alt +"' href='"+ closeLink_href +"'>"+ closeLink_alt +"</a></p>";

    $('.fotorama').append('<div>'+ data +'</div>');
}

//****************** startWebslite ******************//
function startWebslite() {

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
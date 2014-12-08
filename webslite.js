/**
 * Begin of Webslite App
 * The Convertion of
 * Website to
 * Webslide
 */

$( 'body' ).on( 'click', function () {
    var hasClassBody = $('body').hasClass('slide');

    if (!hasClassBody) {
        // Add the Slider
        $( 'head > style' ).prepend( '.webslite { position: relative; overflow: auto; display:none } .webslite li { list-style: none; } .webslite ul li { float: left; }' );
        $( 'body' ).prepend( '<div class="webslite"><ul></ul></div>' );
        $( 'body' ).append( "<script>$(function() { $('.webslite').unslider(); });</script>" );


        var imagens = $('img'),
            noscripts = $('noscript'),
            setWidth = 500,
            imagens_print = {};

        //$results = getImage( imagens, setWidth );
        getImage_noscript(noscripts);
        $( this).addClass('slide');
    }
});


// Set Dimensions
function setDimensions( value, genRatio ) {
    // Change Ratio
    var vsize = value.split('='),
        vsize_var = vsize[0],
        vsize_value = vsize[1];

    return ( vsize_var + '=' + vsize_value * genRatio );
}


// Images Objects
function getImage ( imagens, setWidth ) {
    // Tratar das imagens
    imagens.each(function (index) {
        var imagem = $(this).context,
            imagem_src = imagem.src,
            imagem_alt = imagem.alt,
            imagem_width = imagem.width,
            imagem_height = imagem.height,
            genRatio = setWidth / imagem_width ,
            imagem_qs = imagem_src.split('&');

        // If Contains Any Variables
        if (imagem_qs[1]) {
            // Validate QSA
            var validateQsa = false;

            $.each( imagem_qs, function( index, value ) {
                // If contains variable W= , for Sapo.pt
                var widthExist = value.indexOf('W=') >= 0,
                    heightExist = value.indexOf('H=') >= 0,
                    validDim = widthExist || heightExist;

                // If is Width or Height
                if ( validDim ) {
                    validateQsa = true;
                    // set dimensions
                    imagem_qs[index] = setDimensions( value, genRatio );
                }
            });

            // If found valid Query reconstruct
            if (validateQsa) {
                imagem_src = $.param(imagem_qs);

                console.log( imagem_qs );
            }
        }
    });
}

// Images from noscript
function getImage_noscript ( objectos ) {
    objectos.each( function ( index ) {
        // Generate Our Elements from Text
        var objecto = $(this),
            elements = objecto.text(),
            imagem = $( elements),
            imagem_src = imagem.attr('src'),
            imagem_query = imagem_src.split("?"),

            outImagem = '<li><img width="500" src="'+ imagem_query[0] +'" /></li>';


        $( '.webslite > ul' ).append( outImagem );
        //console.log( imagem );
        console.log( imagem_src );
        console.log( imagem_query );

        // limit to 10 for now
        if ( index > 10 ) {
            $( '.webslite' ).show();
            return false;
        }
    });
}


//$('body').prepend("<img width='200px' style='display:inline' src='" + imagem_src + "' /><br>"+ imagem_src + '<br><br>');
//console.log($(this).context.src)
var getImages,
    validateElement,
    findDescription,
    loadImages,
    replaceThumbs,
    setDimensions,
    getWebslite;

jQuery(document).ready(function($) {

    $(document).on('click', "#fotorama", function(e) {
      e.stopPropagation();
    });

    $(document).on('click', function(e) {
      if($('#document_slider').is(':visible')) {
        $('body').css('overflow', 'auto').animate(
          { scrollTop: 0 },
          0,
          function () {
            $('#document_slider').hide();
          }
        );
      }
    });

  /**
   * Get Any Image
   * From Any Data
   * Get Only and Generate
   */
  getImages = function () {
    // Vars
    var data = $('a, img, noscript'),
        data_count = data.length,
        json_value,
        json_images = [];

    // Each image detect, validate and load
    data.each(function(index) {
        json_value = validateElement($(this));
        if (json_value) {
            json_images.push(json_value);
        }
    }).ready(function() {
        loadImages(json_images);
    });

    // Load Slider
    $('#webslider').delay(1000).fadeIn(1000);
    $('#circleG').remove();

    // If no images where found leave now! or echo message
    if ($('#document_slider img').length < 0) {
      $('#document_slider').append('<div style=" color: white; font-size: 3em; line-height: 1.5em; /* height: 100%; */ vertical-align: middle; width: 50%; height: 25%; overflow: auto; margin: auto; position: absolute; top: 0; left: 0; bottom: 0; right: 0; ">Sorry!<br> No relevante images where found!</div>');
    }
  };

  // ****************** validateElement ******************//
  validateElement = function (element) {
    // If noscript width image inside
    if (element.is('noscript')) {
        element = $(element.text());
    }

    // Vars
    var valid_image,
        valid_args,
        alt_image,
        url_image,
        link_image,
        createJson;

    // Detect element type
    if (element.is('a')) {
        url_image = element.attr('href');
        alt_image = element.text();
        // Validate URL String
        valid_image = (url_image) ? url_image.search(/ (jpg|png|svg|gif)/gi) : -1;
    } else if (element.is('img')) {
        url_image = element.attr('src');
        alt_image = element.attr('alt');
        valid_image = (url_image) ? 1 : -1;
    } else {
        return null;
    }

    // No SVG no ADVERTISERS NO PUB
    var invalide_url_image = (url_image) ? url_image.search(/ (svg|mmpub|banner)/gi) : -1;

    // If no Url defined
    if (!url_image || invalide_url_image != -1) {
        return;
    }

    // Validate Image Url
    url_image = replaceThumbs(url_image);

    // If Alt is not set
    if (!alt_image) {
        alt_image = findDescription(element);
    }

    // Get Link Image
    link_image = element.closest('a');
    link_image = link_image.attr('href');
    if (!link_image) {
        link_image = url_image;
    }

    // Valid arguments
    valid_args = (valid_image != -1) && element && url_image && alt_image && link_image;

    // If Image is Valid
    if (valid_args) {
      createJson = {
        alt: alt_image,
        url: url_image,
        blink: link_image
      };
      return createJson;
    } else {
      return null;
    }
  };

  //****************** findDescription ******************//
  findDescription = function (element) {
      var textImage = (element.parent().text().length > 10) ? element.parent().text() : element.parent().parent().text(),
          title = $('title').text();

      if (textImage.length < 1) {
          textImage = title;
      }

      textImage = $.trim(textImage);

      return textImage;
  };

  // ****************** loadImage ******************//
  loadImages = function (objectos) {

    $(objectos).each(function() {

        var object = this,
            imagem = $('<img>').attr({
                'src': object.url,
                'alt': object.alt,
                'data-caption': object.alt,
                'title': object.blink
            });

        imagem.on('load', function() {
            $(this).attr('width', this.naturalWidth);
            $(this).attr('height', this.naturalHeight);

            // Validate Size
            var valid_size = this.naturalWidth > 120 && this.naturalHeight > 120;

            if (valid_size) {
                $('#fotorama').append($(this));
            }
        });

    }).ready(function() {
        $('#fotorama').fotorama();
    });
  };

  // ****************** replaceThumbs ******************//
  replaceThumbs = function (url_image) {
      /** Replace: If has Thumbs in url **/
      if (url_image.indexOf('thumbs/thumbs_') != -1) {
          url_image = url_image.replace('thumbs/thumbs_', '');
      }

      /** VALIDATE QSA **/
      var url_image_qsa = url_image.split('&');

      if (url_image_qsa[1]) {
          // Validate QSA
          var validateQsa = false;

          $.each(url_image_qsa, function(index, value) {
              // If contains variable W= , for Sapo.pt
              var widthExist = value.indexOf('W=') >= 0,
                  heightExist = value.indexOf('H=') >= 0,
                  validDim = widthExist || heightExist;

              // If is Width or Height
              if (validDim) {
                  validateQsa = true;
                  // set dimensions
                  url_image_qsa[index] = setDimensions(value, 2);

              }
          });

          // If found valid Query reconstruct
          if (validateQsa) {
              url_image = $.trim(url_image_qsa.join('&'));

          }
      }

      return url_image;
  };

  // ****************** setDimensions ******************//
  setDimensions = function (value, genRatio) {
      // Change Ratio
      var vsize = value.split('='),
          vsize_var = vsize[0],
          vsize_value = vsize[1];

      return (vsize_var + '=' + vsize_value * genRatio);
  };

  // ****************** startWebslite ******************//
  getWebslite = function (scrollDetector) {
      var body = $('body');
      body.css('overflow', 'hidden');

      if($('#document_slider').length) {
        $('#document_slider').fadeIn(500);
        return true;
      }

      // Append Slide
      body.prepend(
          '<div id="document_slider">' +
          '<div id="webslider">' +
          '<div id="fotorama" data-auto="false"' +
          ' data-arrows="true" data-width="100%" ' +
          ' data-keyboard="true" ' +
          ' data-ratio="16/9" ' +
          ' data-nav="thumbs"> ' +
          '</div>' +
          '</div>' +
          '</div>'
      );

      $('#document_slider').prepend('<div id="circleG"><div id="circleG_1" class="circleG"></div>' +
          '<div id="circleG_2" class="circleG"></div>' +
          '<div id="circleG_3" class="circleG"></div>' +
          '</div>').fadeIn(5000);

      scrollDetector = (scrollDetector < 100000) ? scrollDetector : 100000;

      // Kill the lazyload
      body.animate({
          scrollTop: scrollDetector
      }, 10000, function() {
          // Get All Images
          getImages();
          // When finished add class
          body.addClass('slide');
      });
  };

});

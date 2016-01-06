/*
#############################
#   Main JS for ____________   #
#############################
*/

jQuery(document).ready(function($) {

  var responsiveValue = 1201;
// OnePage scroll
  $(".fullpage").onepage_scroll({
   sectionContainer: ".section",     // sectionContainer accepts any kind of selector in case you don't want to use section
   easing: "ease",                  // Easing options accepts the CSS3 easing animation such "ease", "linear", "ease-in",
                                    // "ease-out", "ease-in-out", or even cubic bezier value such as "cubic-bezier(0.175, 0.885, 0.420, 1.310)"
   animationTime: 1000,             // AnimationTime let you define how long each section takes to animate
   pagination: false,                // You can either show or hide the pagination. Toggle true for show, false for hide.
   updateURL: false,                // Toggle this true if you want the URL to be updated automatically when the user scroll to each page.
   beforeMove: function(index) {},  // This option accepts a callback function. The function will be called before the page moves.
   afterMove: function(index) {
    $('.nav a').removeClass('active');
    $('.nav a[index="'+index+'"]').addClass('active');
   },   // This option accepts a callback function. The function will be called after the page moves.
   loop: false,                     // You can have the page loop back to the top/bottom when the user navigates at up/down on the first/last page.
   keyboard: true,                  // You can activate the keyboard controls
   responsiveFallback: responsiveValue,        // You can fallback to normal page scroll by defining the width of the browser in which
                                    // you want the responsive fallback to be triggered. For example, set this to 600 and whenever
                                    // the browser's width is less than 600, the fallback will kick in.
   direction: "vertical"            // You can now define the direction of the One Page Scroll animation. Options available are "vertical" and "horizontal". The default value is "vertical".  
  });

  $('.next_slide').on('click', function(event) {
    event.preventDefault();
    $('.one_page').moveDown();
  });


  function Navigate(){
    $('.nav a').add('.anchor').on('click', function(event) {
      event.preventDefault();

      var target = $(this).attr('href');
      var top = $(target).position().top;
      $(window).resize(function(event) {
       top = $(target).position().top;
      });

      if ( $(window).width() < responsiveValue) {
        $('.nav a').removeClass('active');
        $(this).addClass('active');
        $('html, body').animate({
                scrollTop: top
            }, 800);
      }

      if ( $(window).width() >= responsiveValue) {
        $('.nav a').removeClass('active');
        $(this).addClass('active');
        $('.one_page').moveTo( $(this).attr('index') );
      }

    }); 
  }; // end navigate

  //Navigate();



// magnific popup
  $('.magnific').magnificPopup({
    type: 'inline',

    fixedContentPos: false,
    fixedBgPos: true,

    overflowY: 'auto',
    modal: false,

    closeBtnInside: true,
    preloader: false,
    
    midClick: true,
    removalDelay: 300,
    mainClass: 'my-mfp-slide-bottom'
  });

  $(document).on('click', '.popup-modal-dismiss', function (e) {
    e.preventDefault();
    $.magnificPopup.close();
  });



// slick slider 
  $(function(){
    $('.text-slider, .infoSlider').slick({
      dots: true,
      arrows: false
    });
  });



// perfect scrollbar 
  $(function() {
    $('.scrollbar').perfectScrollbar({
      suppressScrollX: true
    });
  });



// accardeon custom functions 
  $(function(){
    $('.box').on('mouseenter touch', function(event) {
      event.preventDefault();
      $(this).addClass('active').siblings().removeClass('active').addClass('disabled')
    });
    $('.box').on('mouseleave', function(event) {
      event.preventDefault();
      $(this).removeClass('active').siblings().removeClass('active disabled');
    });
  })



// floor information functions 
  $('.flat_area').on('click', function(event) {
    event.preventDefault();
    $(this).attr('class', 'active flat_area').siblings().attr('class', 'flat_area');
    var label = $(this).parent().parent().siblings('.top-label');
    var flat = {
      flNumber: $(this).attr('fl-number'),
      flArea: $(this).attr('fl-area')
    }

    label.find('.fl_number').text(flat.flNumber);
    label.find('.fl_area').text(flat.flArea);
  }); // end click event function



// Multiple Markers
var markers = [
            ['San Francisco: Power Outage', 59.955543, 30.66945,'images/y_marker.png'],
            ['Sausalito', 59.956343, 30.66065, 'images/y_marker.png'],
            ['Sacramento', 59.957143, 30.66285,'images/y_marker.png']
        ];

function initialize() {
    var map;
    var mapCenter = {lat: 59.958043, lng: 30.66625};

    var mapOptions = {
      zoom: 16,
      //draggable: false,
      disableDefaultUI: true,
      scrollwheel: false,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      center: mapCenter
    };
                    
    // Display a map on the page
    map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
    map.setTilt(45);
    map.panBy(-400, 0);                     
    // Display multiple markers on a map
    var infoWindow = new google.maps.InfoWindow(), marker, i;
    
    // Loop through our array of markers & place each one on the map  
    function displayM() { 
      for( i = 0; i < markers.length; i++ ) {
          var position = new google.maps.LatLng(markers[i][1], markers[i][2]);
          marker = new google.maps.Marker({
              position: position,
              map: map,
              title: markers[i][0],
              icon: markers[i][3]
          });
      }
          var markerImage = new google.maps.MarkerImage('images/mainMarker.png');
          var markerMain = new google.maps.Marker({
            icon: markerImage,
            position: mapCenter, 
            map: map,
            title: "HOVARD"
          });

    };

    displayM();

    $(".infoSlider.-image").on("afterChange", function(slick, currentSlide){
      var index = currentSlide.currentSlide;
      for ( a = 0; a < markers.length; a++ ) {
        markers[a][3] = '';
        markers[a][3] = 'images/y_marker.png';
        markers[index][3] = 'images/d_marker.png';
      }
      displayM();
  });
}

initialize()




}); // end document ready function
$(document).ready(function(){	
    function resize(){
       if( typeof( window.innerWidth ) == 'number' ) {
            myWidth = window.innerWidth;
            myHeight = window.innerHeight;
        } else if( document.documentElement && ( document.documentElement.clientWidth || 
        document.documentElement.clientHeight ) ) {
            myWidth = document.documentElement.clientWidth;
            myHeight = document.documentElement.clientHeight;
        } else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
            myWidth = document.body.clientWidth;
            myHeight = document.body.clientHeight;
        }
        $(".b-content").css("min-height",myHeight-($(".b-footer").height()+$(".b-header").height()) );
    }
    $(window).resize(resize);
    resize();

    $.fn.placeholder = function() {
        if(typeof document.createElement("input").placeholder == 'undefined') {
          $('[placeholder]').focus(function() {
            var input = $(this);
            if (input.val() == input.attr('placeholder')) {
              input.val('');
              input.removeClass('placeholder');
            }
          }).blur(function() {
            var input = $(this);
            if (input.val() == '' || input.val() == input.attr('placeholder')) {
              input.addClass('placeholder');
              input.val(input.attr('placeholder'));
            }
          }).blur().parents('form').submit(function() {
            $(this).find('[placeholder]').each(function() {
              var input = $(this);
              if (input.val() == input.attr('placeholder')) {
                input.val('');
              }
          })
        });
      }
    }
    $.fn.placeholder();
    
    if( $("#b-hov").length ){
        var timeout;
        $( window ).load(function() {
            setHoverTo($(".b-main-menu ul li.active"),0);
        });
        

        $(".b-main-menu ul li").hover(function(){
                $("#b-hov").css("margin-left","0");
                clearTimeout(timeout);
                setHoverTo($(this),0.4);
            },function(){
                    timeout = setTimeout(function(){
                        setHoverTo($(".b-main-menu ul li.active"),0.5);
                    },500);
            });
    }

    function setHoverTo(el,dur){
        var curWidth = el.width(),
            curOffset = el.position().left;
        TweenLite.to($("#b-hov"), dur, { "left" : curOffset, "width" : curWidth, ease : Quad.easeInOut } );
    }

    $('.b-main-slider').slick({
        pauseOnHover: false,
        autoplay: true,
        dots: true,
        infinite: true,
        speed: 500,
        fade: true,
        cssEase: 'linear',
        arrows: false
    });

    $( "#city-list li" ).hover(
        function() {
            $(this).find(".city-desc").slideDown();
        }, function() {
            $(this).find(".city-desc").slideUp();
        }
    );

    $('.reviews-slider').slick({
        infinite: true,
        speed: 200,
        autoplay: true,
        fade: true,
        cssEase: 'ease-in',
        prevArrow: '<div class="arrow-cont left-arrow"><span class=" arrow"></span></div>',
        nextArrow: '<div class="arrow-cont right-arrow"><span class=" arrow"></span></div>'
    });
    
	// var myPlace = new google.maps.LatLng(55.754407, 37.625151);
 //    var myOptions = {
 //        zoom: 16,
 //        center: myPlace,
 //        mapTypeId: google.maps.MapTypeId.ROADMAP,
 //        disableDefaultUI: true,
 //        scrollwheel: false,
 //        zoomControl: true
 //    }
 //    var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions); 

 //    var marker = new google.maps.Marker({
	//     position: myPlace,
	//     map: map,
	//     title: "Ярмарка вакансий и стажировок"
	// });

    //  var options = {
    //     $AutoPlay: true,                                
    //     $SlideDuration: 500,                            

    //     $BulletNavigatorOptions: {                      
    //         $Class: $JssorBulletNavigator$,             
    //         $ChanceToShow: 2,                           
    //         $AutoCenter: 1,                            
    //         $Steps: 1,                                  
    //         $Lanes: 1,                                  
    //         $SpacingX: 10,                              
    //         $SpacingY: 10,                              
    //         $Orientation: 1                             
    //     }
    // };

    // var jssor_slider1 = new $JssorSlider$("slider1_container", options);

});
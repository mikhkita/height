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
                setHoverTo($(this),0.3);
            },function(){
                    timeout = setTimeout(function(){
                        setHoverTo($(".b-main-menu ul li.active"),0.4);
                    },400);
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
        speed: 1000,
        autoplaySpeed: 4000,
        fade: true,
        cssEase: 'ease-out',
        arrows: false
    });

    $( "#city-list li" ).hover(
        function() {
            $(this).find(".city-desc").slideDown(300);
        }, function() {
            $(this).find(".city-desc").slideUp(300);
        }
    );

    $('.reviews-slider').slick({
        infinite: true,
        speed: 300,
        autoplay: true,
        adaptiveHeight: true,
        prevArrow: '<div class="arrow-cont left-arrow"><span class=" arrow"></span></div>',
        nextArrow: '<div class="arrow-cont right-arrow"><span class=" arrow"></span></div>'
    });
    $('.desc-slider').slick({
        infinite: true,
        speed: 300,
        autoplay: true,
        prevArrow: '<span class="left-arrow arrow"></span>',
        nextArrow: '<span class="right-arrow arrow"></span>'
    });

    $("#search").click(function(){
        $(this).css("border","2px solid #00CEFC");
        $(".b-main-menu ul li a").animate({
            paddingLeft: "4px",
            paddingRight: "4px"
          }, 200, function() {
            setHoverTo($(".b-main-menu ul li.active"),0.2);
        });
        
        $(this).animate({
            width: "180px"
          }, 200, function() {
            $("#search input").fadeIn(150);
            $("#search input[type='text']").focus();
        });
    });
    $("#search input").blur(function(){
        $("#search input").fadeOut(100);
        $(".b-main-menu ul li a").animate({
            paddingLeft: "15px",
            paddingRight: "15px"
          }, 200, function() {
            setHoverTo($(".b-main-menu ul li.active"),0.2);
        });
        $("#search").animate({
            width: "36px"
          }, 200, function() {
            $("#search").css("border","2px solid #fff");
        });   
    });
    if($(".slider-range").length>0) {
	    $( ".slider-range" ).slider({
	        range: true,
	        min: 600,
	        max: 1000,
	        values: [ 600, 1000 ],
	        slide: function( event, ui ) {
	            $( "#amount-l" ).text( ui.values[ 0 ] );
	            $( "#amount-r" ).text( ui.values[ 1 ] );
	            $( "#price-min" ).val( ui.values[ 0 ] );
	            $( "#price-max" ).val( ui.values[ 1 ] );

	        },
	    change: function( event, ui ) {
	        
	    }
	    });
	    $( "#amount-l" ).text( $( "#slider-range" ).slider( "values", 0 ) );
	    $( "#amount-r" ).text( $( "#slider-range" ).slider( "values", 1 ) );
	    $( "#price-min" ).val( $( "#slider-range" ).slider( "values", 0 ) );
	    $( "#price-max" ).val( $( "#slider-range" ).slider( "values", 1 ) );
	}

    $(".filter-items li span").click(function(){
        if(!$(this).closest("li").hasClass("active")) {
            $(".filter-items li.active").removeClass("active").find(".filter-popup").slideUp(200);
            $(this).closest("li").addClass("active").find(".filter-popup").slideDown();
        }
        else {
            $(".filter-items li.active").removeClass("active").find(".filter-popup").slideUp(200);
        }
    });

    $("*:not(.filter-items *)").click(function(){
    	$(".filter-items li.active").removeClass("active").find(".filter-popup").slideUp(200);
    });

    $('.tabs li').click(function() {
    	if(!$(this).hasClass("active")) {
    		$('.tabs li.active').removeClass("active");
    		$(this).addClass("active");
    		var filter = ($(this).attr("data-tab"));
    		$(".excursions").fadeOut(400,function(){
    			$(".excursions li").hide();
    			if(filter=="all") {
    				$(".excursions li").show();
    			} else {		
    				$(".excursions li").filter("."+filter).show();
    			}
    			$(".excursions").fadeIn();
    		});
    	}
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
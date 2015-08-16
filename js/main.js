$(document).ready(function(){	
    var open = false,
        transition = 0;

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
        if( $(".b-main-menu ul.b-menu>li.active").length) {
	        $( window ).load(function() {
	            setHoverTo($(".b-main-menu ul.b-menu>li.active"),0);
	        });   
    	}
    
        $(".b-main-menu ul.b-menu>li").hover(function(){
	            $("#b-hov").css("margin-left","0");
	            $("#b-hov:hidden").fadeIn();
	            clearTimeout(timeout);
	            setHoverTo($(this),0.3);
	        },function(){
                timeout = setTimeout(function(){
                	if($(".b-main-menu ul.b-menu>li.active").length) {
	                    setHoverTo($(".b-main-menu ul.b-menu>li.active"),0.4);
	                } else {
	                	$("#b-hov").fadeOut();
	                }
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
        $("ul.b-menu>li>a").animate({
            paddingLeft: "4px",
            paddingRight: "4px"
          }, 200, function() {
            if($(".b-main-menu ul.b-menu>li.active").length) {
                setHoverTo($(".b-main-menu ul.b-menu>li.active"),0.4);
            } else {
                $("#b-hov").fadeOut();
            }
        });
        $(".b-header .b-block .b-main-menu").animate({marginLeft: "15px"}, 200 );
        
        $(this).animate({
            width: "170px"
          }, 200, function() {
            $("#search input").fadeIn(150);
            $("#search input[type='text']").focus();
        });
    });
    $("#search input").blur(function(){
        $("#search input").fadeOut(100);
        $("ul.b-menu>li>a").animate({
            paddingLeft: "15px",
            paddingRight: "15px"
          }, 200, function() {
            if($(".b-main-menu ul.b-menu>li.active").length) {
                setHoverTo($(".b-main-menu ul.b-menu>li.active"),0.2);
            } else {
                $("#b-hov").fadeOut();
            }
        });
        $(".b-header .b-block .b-main-menu").animate({marginLeft: "30px"}, 200 );
        $("#search").animate({
            width: "36px"
          }, 200, function() {
            $("#search").css("border","2px solid #fff");
        });   
    });

    $(".filter-items li span").bind("mouseup",function(){
        if(!$(this).closest("li").hasClass("active")) {
            $(".filter-items li.active").removeClass("active").find(".filter-popup").slideUp(200);
            $(this).closest("li").addClass("active").find(".filter-popup").slideDown();
        }
    });

    $(".filter-popup *,.filter-popup,.filter-items li span").bind("mouseup",function(){
        open = true;
    });

    $("body").bind("mousedown",function() {
        open = false;
    }).bind("mouseup",function(){
        if( !open )
            $(".filter-items li.active").removeClass("active").find(".filter-popup").slideUp(200);
    });


    if( $('.tabs li').length ){
        $('.tabs li').click(function() {
            if(!$(this).hasClass("active")) {
                $('.tabs li.active').removeClass("active");
                $(this).addClass("active");
                var filter = ($(this).attr("data-tab"));
                $(".b-empty").fadeOut(transition-1);
                $(".excursions").fadeOut(transition,function(){
                    $(".excursions li").hide();
                    if(filter=="all") {
                        var items = $(".excursions li");
                    } else {        
                        var items = $(".excursions li").filter("."+filter);
                    }
                    if( items.length ){
                        items.show();
                    }else{
                        $(".b-empty").fadeIn(transition);
                    }
                    $(".excursions").fadeIn(transition);
                });
                if( $(".inner").length )
                    window.location.hash = "#"+$(this).attr("data-tab");
            }
        });
        if( $(".inner").length ){
            if(window.location.hash && window.location.hash!= "#") {
        		var hash = window.location.hash.substr(1);
        		$(".tabs li[data-tab="+hash+"]").click();

                if( $(".city-tabs").length ){
                    $("body, html").animate({
                        scrollTop : $(".city-tabs").offset().top
                    },0);
                }
        	} else {
        		$(".tabs li").eq(0).click();
        	}
        }else{
            $(".tabs li").eq(0).click();
        }

    }


    function range_init() {
    	$.each($(".slider-range"),function(){
    		var min_input = $(this).closest(".popup-slider").find(".min-val"),
    		max_input = $(this).closest(".popup-slider").find(".max-val"),
    		min_text = $(this).closest(".popup-slider").find(".min-text"),
    		max_text = $(this).closest(".popup-slider").find(".max-text"),
    		min_val = $(this).attr("data-min")*1,
    		max_val = $(this).attr("data-max")*1,
    		cur_min_val = $(this).attr("data-min-cur") ? $(this).attr("data-min-cur")*1 : min_val,
    		cur_max_val = $(this).attr("data-max-cur") ? $(this).attr("data-max-cur")*1 : max_val,
    		data_step = $(this).attr("data-step") ? $(this).attr("data-step")*1 : 1;
		    $(this).slider({
		    	step: data_step,
		        range: true,
		        min: min_val,
		        max: max_val,
		        values: [ cur_min_val, cur_max_val ],
		        slide: function( event, ui ) {
		            min_input.val( ui.values[ 0 ] );
		            max_input.val( ui.values[ 1 ] );
		            min_text.text( ui.values[ 0 ] );
		            max_text.text( ui.values[ 1 ] );

		        }
		    });
		    min_input.val( cur_min_val );
            max_input.val( cur_max_val );
            min_text.text( cur_min_val );
            max_text.text( cur_max_val );
    	});
    	
    }
    if($(".slider-range").length) range_init();


    $(window).load(function() {
        $(".b-main-slider").fadeTo(300,1);
    });

    transition = 300;



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
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
        

        $(".b-main-menu ul li.menu-item").hover(function(){
                $("#b-hov").css("margin-left","0");
                clearTimeout(timeout);
                setHoverTo($(this),0.3);
            },function(){
                    timeout = setTimeout(function(){
                        setHoverTo($(".b-main-menu ul li.menu-item.active"),0.4);
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


    if($("#price-range").length > 0) {
    	range_init("price");
	}

	 if($("#time-range").length > 0) {
    	range_init("time");
	}



    $(".filter-items li span").click(function(){
        if(!$(this).closest("li").hasClass("active")) {
        	
            $(".filter-items li.active").removeClass("active").find(".filter-popup").slideUp(200);
            $(this).closest("li").addClass("active").find(".filter-popup").slideDown();
            // alert();
   //          $("*").bind("click",function() {
   //          	console.log($(this));
			// 	if( !$(this).parents(".filter-popup").length && !$(this).hasClass("filter-popup") ) {
			// 		$(".filter-items li.active").removeClass("active").find(".filter-popup").slideUp(200);
			// 	}
			// });
        }
        else {
        	// alert();
            $(".filter-items li.active").removeClass("active").find(".filter-popup").slideUp(200);
            // $("*").unbind("click");
        }
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

    function range_init(name) {
    	var min_val = $( "#"+name+"-min" ).val()*1,
    	max_val = $( "#"+name+"-max" ).val()*1;
	    $( "#"+name+"-range" ).slider({
	        range: true,
	        min: min_val,
	        max: max_val,
	        values: [ min_val, max_val ],
	        slide: function( event, ui ) {
	            $( "#"+name+"-l" ).text( ui.values[ 0 ] );
	            $( "#"+name+"-r" ).text( ui.values[ 1 ] );
	            $( "#"+name+"-min" ).val( ui.values[ 0 ] );
	            $( "#"+name+"-max" ).val( ui.values[ 1 ] );

	        }
	    });
    }
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
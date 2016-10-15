/*jQuery(function( $ ) {
	//
	 // Demo binding and preparation, no need to read this part
	 //
		//borrowed from jQuery easing plugin
		//http://gsgd.co.uk/sandbox/jquery.easing.php
		$.easing.elasout = function(x, t, b, c, d) {
		//	var s=1.70158;var p=0;var a=c;
		//	if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		//	if (a < Math.abs(c)) { a=c; var s=p/4; }
	//		else var s = p/(2*Math.PI) * Math.asin (c/a);
	//		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
			if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
		};
		$('a.back').click(function() {
			$(this).parents('div.pane').scrollTo(0, 800, { queue:true });
			$(this).parents('div.section').find('span.message').text( this.title);
			return false;
		});
		//just for the example, to stop the click on the links.
		$('ul.links').click(function(e){
			var link = e.target;
			if (link.target === '_blank') {
				return;
			}
			e.preventDefault();
			link.blur();
			if (link.title) {
				$(this).parent().find('span.message').text(link.title);
			}
		});

	// This one is important, many browsers don't reset scroll on refreshes
	// Reset all scrollable panes to (0,0)
	$('div.pane').scrollTo(0);
	// Reset the screen to (0,0)
	$.scrollTo(0);

	// TOC, shows how to scroll the whole window
	$('#nav a').click(function() {//$.scrollTo works EXACTLY the same way, but scrolls the whole screen
		$.scrollTo(this.hash, 1500, { easing:'elasout' });
		$(this.hash).find('span.message').text(this.title);
		return false;
	});
});*/

	jQuery(document).ready(function($) {

		// Resive video
	scaleVideoContainer();

	//initBannerVideoSize('.video-container .poster img');
	//initBannerVideoSize('.video-container .filter');
	//initBannerVideoSize('.video-container video');

	$(window).on('resize', function() {
			scaleVideoContainer();


			//scaleBannerVideoSize('.video-container .poster img');
			//scaleBannerVideoSize('.video-container .filter');
			//scaleBannerVideoSize('.video-container video');
	});


	var nav = $('.nav-container'),
			navTopPosition = nav.offset().top,
	//	taglineOffesetTop = $('#cd-intro-tagline').offset().top + $('#cd-intro-tagline').height() + parseInt($('#cd-intro-tagline').css('paddingTop').replace('px', '')),
		contentSections = $('.section');
		var insideNav = nav.find('#nav');
var topPos = $('.brand').offset().top+$('.brand').height();
		var navlogo = $('.nav-logo');



	$(window).on('scroll', function() {
		//on desktop - assign a position fixed to logo and action button and move them outside the viewport
		/*( $(window).scrollTop() > taglineOffesetTop ) ? $('#cd-logo, .cd-btn').addClass('is-hidden') : $('#cd-logo, .cd-btn').removeClass('is-hidden');*/

		//on desktop - fix secondary navigation on scrolling
		if ( $( window ).width() > 52 * 16 ) {
		if($(window).scrollTop() > topPos ) {
			//fix secondary navigation
			//nav.addClass('is-fixed');
			//push the .cd-main-content giving it a top-margin
		//	$('.site-content').addClass('has-top-margin');




			//on Firefox CSS transition/animation fails when parent element changes position attribute
			//so we to change secondary navigation childrens attributes after having changed its position value
			setTimeout(function() {
	            //nav.addClass('animate-children');
	          //  $('#cd-logo').addClass('slide-in');
			//	$('.cd-btn').addClass('slide-in');
				navlogo.addClass('slide-in');
			}, 50);
		} else {
			//nav.removeClass('is-fixed');
		//	$('.site-content').removeClass('has-top-margin');
			setTimeout(function() {
	          /*  nav.removeClass('animate-children');
	            $('#cd-logo').removeClass('slide-in');
				$('.cd-btn').removeClass('slide-in');*/
					navlogo.removeClass('slide-in');
			}, 50);
		}

		//on desktop - update the active link in the secondary fixed navigation

			updateSecondaryNavigation();
		}


	});

	function updateSecondaryNavigation() {
		contentSections.each(function(){
			var actual = $(this),
				actualHeight = actual.height() + parseInt(actual.css('paddingTop').replace('px', '')) + parseInt(actual.css('paddingBottom').replace('px', '')),
				actualAnchor = insideNav.find('a[href="#'+actual.attr('id')+'"]');
			//	console.log(actual);
			if ( ( actual.offset().top - nav.height() <= $(window).scrollTop() ) && ( actual.offset().top +  actualHeight - nav.height() > $(window).scrollTop() ) ) {
				actualAnchor.addClass('active');
			}else {
				actualAnchor.removeClass('active');
			}
		});
	}

	//on mobile - open/close secondary navigation clicking/tapping the .cd-secondary-nav-trigger
	$('.nav-trigger').on('click', function(event){
		event.preventDefault();
		$(this).toggleClass('menu-is-open');
		nav.find('ul').toggleClass('is-visible');
	});

	//smooth scrolling when clicking on the secondary navigation items
	nav.find('ul a').on('click', function(event){
        event.preventDefault();

        var target= $(this.hash);

				if($(event.target).prop('target').length){
					var productLink = $(event.target);

					console.log(productLink.prop("href"));

				/*	productLink.attr("target", "_blank");*/
					window.open(productLink.prop("href"));

				} else {

	        $('body,html').animate({
	        	'scrollTop': target.offset().top - nav.height() + 1
	        	}, 400
	        );
        //on mobile - close secondary navigation

			}
			$('.nav-trigger').removeClass('menu-is-open');
			nav.find('ul').removeClass('is-visible');

    });

    //on mobile - open/close primary navigation clicking/tapping the menu icon
	$('.cd-primary-nav').on('click', function(event){
		if($(event.target).is('.cd-primary-nav')) $(this).children('ul').toggleClass('is-visible');
	});
});

/** Reusable Functions **/
/********************************************************************/

function scaleVideoContainer() {

    var height = $(window).height();
		var width = $(window).width();
    var unitHeight = parseInt(height) + 'px';
		var unitWidth = parseInt(width) + 'px';
    $('.title').css('height',unitHeight);
		$('.title').css('width',unitWidth);

		var brand; //= $('.brand-holder');
		var hbrand;

	/*	if (brand.width() < 56*16) {
			brand.removeAttr( 'style' );
				hbrand = parseInt(brand.width() * 256 / 600);

				brand.css('height',hbrand)
		}*/

		// resize brand
		brand = $('.brand');
	 hbrand = parseInt((height - brand.height())/2).toString() + "px 2em";

		brand.css('padding',hbrand);

		brand = $('#about');
		var r = (height - brand.height()) / 2;

		if (r < 32) {
			hbrand= "3em 0";

		} else {
				//hbrand = "1em";
					hbrand = parseInt(r).toString() + "px 0";
		}
			brand.css('padding',hbrand);

		// brand holder
		// 600px - 256px



		//
		//} else {
		//		brand.css('width',280)
		//		brand.css('height',119)
		//}

}

function initBannerVideoSize(element){

    $(element).each(function(){
        $(this).data('height', $(this).height());
        $(this).data('width', $(this).width());
    });

    scaleBannerVideoSize(element);



}

function scaleBannerVideoSize(element){

    var windowWidth = $(window).width(),
        windowHeight = $(window).height(),
        videoWidth,
        videoHeight;





    //console.log(windowHeight);





  /*  $(element).each(function(){
        /*var videoAspectRatio = $(this).data('height')/$(this).data('width'),
            windowAspectRatio = windowHeight/windowWidth;

        if (videoAspectRatio > windowAspectRatio) {
            videoWidth = windowWidth;
            videoHeight = videoWidth * videoAspectRatio;
            $(this).css({'top' : -(videoHeight - windowHeight) / 2 + 'px', 'margin-left' : 0});
        } else {
            videoHeight = windowHeight;
            videoWidth = videoHeight / videoAspectRatio;
            $(this).css({'margin-top' : 0, 'margin-left' : -(videoWidth - windowWidth) / 2 + 'px'});
      //  }

					//videoHeight = windowHeight;
					//videoWidth = windowWidth;

      //  $(this).width(videoWidth).height(videoHeight);

			//$(this).height(windowHeight);

			//	videoHeight = windowHeight;
			//	videoWidth = windowWidth;

        //$('.title .video-container video').addClass('fadeIn animated');


    });*/
}

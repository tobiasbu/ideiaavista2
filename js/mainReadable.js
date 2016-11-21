
	jQuery(document).ready(function($) {

		var menuIsOpen = false;


	/*	var body = $( "body" ),
			content = $( '.content-wrap' ),
			openbtn = $( '#open-button' ),
			closebtn = $( '#close-button' ),
			*/

		// Resive video
	scaleVideoContainer();

	//initBannerVideoSize('.video-container .poster img');
	//initBannerVideoSize('.video-container .filter');
	//initBannerVideoSize('.video-container video');
		var topPos = $( window ).height();
		var navBreak = $('#nav-top-margin');
		var nav = $('.nav-container'),
				navTopPosition = nav.offset().scrollTop //nav.offset().top,
		//	taglineOffesetTop = $('#cd-intro-tagline').offset().top + $('#cd-intro-tagline').height() + parseInt($('#cd-intro-tagline').css('paddingTop').replace('px', '')),
			contentSections = $('.section');
				var insideNav = nav.find('#nav');
					var navlogo = $('.nav-logo');
		var oldWindowWidth = $(window).width();


	$(window).on('resize', function() {
			scaleVideoContainer();
			 topPos = $( window ).height();

			//scaleBannerVideoSize('.video-container .poster img');
			//scaleBannerVideoSize('.video-container .filter');
			//scaleBannerVideoSize('.video-container video');
			if($(window).scrollTop() <= topPos ) {
					if (nav.is('.is-fixed')) {
						nav.removeClass('is-fixed');
						navBreak.removeClass('show');
						navlogo.removeClass('slide-in');
					}
			} else {
				if (!nav.is('.is-fixed')) {
					navBreak.addClass('show');
					nav.addClass('is-fixed');
					navlogo.addClass('slide-in');
				}
			}
			if (oldWindowWidth <= 55*16 && $(window).width() > 55*16) {
					toggleMenu(true);
			}

			oldWindowWidth = $(window).width();
	});


	$(window).on('scroll', function() {
		//on desktop - assign a position fixed to logo and action button and move them outside the viewport
		/*( $(window).scrollTop() > taglineOffesetTop ) ? $('#cd-logo, .cd-btn').addClass('is-hidden') : $('#cd-logo, .cd-btn').removeClass('is-hidden');*/

		//on desktop - fix secondary navigation on scrolling
		if ( $( window ).width() > 55 * 16 ) {
		if($(window).scrollTop() > topPos ) {
			//fix secondary navigation
				navBreak.addClass('show');
			nav.addClass('is-fixed');
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
			nav.removeClass('is-fixed');
			navBreak.removeClass('show');
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

		var plusValue = 0;
		var minusValue = 0;

		contentSections.each(function(){
			var actual = $(this),
				actualHeight = actual.height() + parseInt(actual.css('paddingTop').replace('px', '')) + parseInt(actual.css('paddingBottom').replace('px', '')),
				actualAnchor = insideNav.find('a[href="#'+actual.attr('id')+'"]');

				if (actual.attr("id") == "contact") {
					plusValue = -parseInt($( window ).height() / 2);
				} else if (actual.attr("id") == "cinema") {
						minusValue = -parseInt($( window ).height() / 2);
				}


				//	console.log(actual);
				if ( ( actual.offset().top+plusValue - nav.height()-2 < $(window).scrollTop() )
				&& ( actual.offset().top +  actualHeight+minusValue - nav.height()-2 >= $(window).scrollTop() ) ) {
					actualAnchor.addClass('active');
				}else {
					actualAnchor.removeClass('active');
				}

		});
	}


	var button = $('.nav-button');

	function toggleMenu(flag) {


	if (flag === undefined  || flag === null)
			flag = null;
	else
			menuIsOpen = flag;



		if( !menuIsOpen ) {

			/*body.addClass( 'show-menu' );*/
			insideNav.find('ul').addClass('show-menu');
			$(button).addClass('show-menu');
			menuIsOpen = true;
		}
		else {
			/*body.removeClass( 'show-menu' );*/
			insideNav.find('ul').removeClass('show-menu');
			$(button).removeClass('show-menu');
			menuIsOpen = false;

		}

	}



	//on mobile - open/close secondary navigation clicking/tapping the .cd-secondary-nav-trigger
	button.on('click', function(event){
		/*event.preventDefault();*/
		toggleMenu();
	});

	$('.arrow-down a').on('click', function(event){
		event.preventDefault();

		var target= $(this.hash);

		scrollTo(target);

	});

	$('#mini-logo a').on('click', function(event){
		event.preventDefault();

		$('body,html').animate({
			'scrollTop': 0
			}, 400
		);

	});

	//smooth scrolling when clicking on the secondary navigation items
	nav.find('ul a').on('click', function(event){
				event.preventDefault();

				var target= $(this.hash);

				scrollToNav(target, event);

		});

		function scrollToNav(target, event) {

			if($(event.target).prop('target').length) {
				var productLink = $(event.target);

				//console.log(productLink.prop("href"));

			/*	productLink.attr("target", "_blank");*/
				window.open(productLink.prop("href"));

			} else {

				scrollTo(target);


		}

		insideNav.find('ul').removeClass('show-menu');
		$(button).removeClass('show-menu');
		menuIsOpen = false;

}

	function scrollTo(target) {
						$('body,html').animate({
							'scrollTop': target.offset().top - nav.height() + 1
							}, 400
						);
					//on mobile - close secondary navigation

	}

	//var triedToSend = false;
	var invaliEmail = 0;
	var invalidName = false;
	var invalidMessage = false;
	var inputContactName = $('#contact-name');
	var inputContactEmail = $('#contact-email');
	var inputContactMessage = $('#contact-message');

inputContactName.on('input', function() {

	//if (triedToSend) {

		var value = this.value;

		if (value.length < 1 || value === undefined)
			setContactState('name',true);
		else
			setContactState('name',false);

//	}

});

inputContactEmail.on('input', function() {

	//if (triedToSend) {

		var value = this.value;

		if (value === undefined || value.length < 1)
			setContactState('email',1);
		else if (!validateEmail(value))
			setContactState('email',2);
		else
			setContactState('email',0);

	//}

});

inputContactMessage.on('input', function() {

//	if (triedToSend) {

		var value = this.value;

		if (value.length >= 1 && value != undefined)
			setContactState('message',false);
		else
			setContactState('message',true);

//	}

});

function setContactState(property, state) {

	if (property == 'name') {

		invalidName = state;

		if (state == false) { // not invalid
				$('#contact-error-name').html(""); // <br>
				inputContactName.removeClass('error');
			//	inputContactName.prop('aria-invalid',false);
		} else { // is invalid
				$('#contact-error-name').html("* Digite o seu nome.");

				if (!inputContactName.is('error'))
					inputContactName.addClass('error');
					//inputContactName.prop('aria-invalid',true);
		}
	} else if (property == 'email') {

		invalidEmail = state;

		if (state == 0)  // not invalid
				$('#contact-error-email').html("");
		else if (state == 1) // is not a email
				$('#contact-error-email').html("* Digite o seu endereço de e-mail.");
		else if (state == 2)  // is invalid email
				$('#contact-error-email').html("* Digite um e-mail valido.");

		if (state >= 1) {

			if (!inputContactEmail.is('error'))
				inputContactEmail.addClass('error');

			//inputContactEmail.prop('aria-invalid',true);

		} else {
			inputContactEmail.removeClass('error');
			//inputContactEmail.prop('aria-invalid',false);
		}

	} else if (property == 'message') {

		invalidMessage = state;

		if (state == false) { // not invalid
				$('#contact-error-message').html("");
				inputContactMessage.removeClass('error');
				//inputContactMessage.prop('aria-invalid','false');
		} else { // is invalid
				$('#contact-error-message').html("* Digite a sua mensagem.");

				if (!inputContactMessage.is('error'))
					inputContactMessage.addClass('error');

			//	inputContactMessage.prop('aria-invalid','true');
		}

	}

}

	$("#new_contact").submit(function(e) {
    e.preventDefault();
		//sendEmail();

		var from_name = this['contact[name]'].value;
		var from_email = this['contact[email]'].value;
		var from_message = this['contact[message]'].value;



		if (from_name === undefined || from_name.length < 1)
			setContactState('name',true);
		else
			setContactState('name',false);

		if (from_email === undefined || from_email.length < 1)
			setContactState('email',1);
		else if ( !validateEmail(from_email) )
			setContactState('email',2);
		else
			setContactState('email',0);


		if (from_message === undefined || from_message.length < 1)
			setContactState('message',true);
		else
			setContactState('message',false);


		//triedToSend = true;

		if (invaliEmail == 0 && invalidName == false && invalidMessage == false) {

			var packet = {
				name : from_name,
				email : from_email,
				message : from_message
			}

			inputContactMessage.disabled = true;
			inputContactName.disabled = true;
			inputContactEmail.disabled = true;
			$('.button-contact-send').disabled = true;
			$('.button-contact-send span').text("Aguarde...");

			inputContactMessage.addClass('send');
			inputContactName.addClass('send');
			inputContactEmail.addClass('send');
			$('.button-contact-send').addClass('send');


			/*console.log(packet);*/
			$('#contact-error-main').css('display','none');


			emailjs.send(
			"gmail",
			"template_GWvLYOYi",
			packet)
			.then(function(response) {
				$('#contact-box-form').css('display','none');
				$('#contact-box-sucess').css('display','block');
			 //console.log("SUCCESS. status=%d, text=%s", response.status, response.text);
			}, function(err) {
			 //console.log("FAILED. error=", err);
			 $('#contact-error-main').css('display','block');
 				resetContactForm(false,false);
		 });

		}

		return false;
	});

	$('#contact-box-sucess span').on('click', function(event) {
		event.preventDefault();

		resetContactForm(true,true);



	})

	function resetContactForm(resetText,scroll) {
		inputContactMessage.disabled = false;
		inputContactName.disabled = false;
		inputContactEmail.disabled = false;
		$('.button-contact-send').disabled = false;
		$('.button-contact-send span').text("Enviar");

		inputContactMessage.removeClass('send');
		inputContactName.removeClass('send');
		inputContactEmail.removeClass('send');
		$('.button-contact-send').removeClass('send');

		invaliEmail = 0;
		invalidName = false;
		invalidMessage = false;

		if (resetText) {
			var $inputs = $('#new_contact :input');
			$inputs.each(function() {
				//console.log( $(this).val());
				 $(this).val("");
			});
	}

		$('#contact-box-form').css('display','block');
		$('#contact-box-sucess').css('display','none');

		if (scroll)
			scrollTo($('#contact'));
	}


    //on mobile - open/close primary navigation clicking/tapping the menu icon
/*	$('.cd-primary-nav').on('click', function(event){
		if($(event.target).is('.cd-primary-nav')) $(this).children('ul').toggleClass('is-visible');*/
	/*});*/
});


/** Reusable Functions **/
/********************************************************************/


function validateEmail(email) {
	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
}


// old functions
function scaleVideoContainer() {

    var height = $(window).height();
		var width = $(window).width();
    //var unitHeight = parseInt(height) + 'px';
		//var unitWidth = parseInt(width) + 'px';
    //$('.title').css('height',unitHeight);
		//$('.title').css('width',unitWidth);


		/*var brand = $('.brand-holder');

		if (brand.width() < 55*16) {
			brand.removeAttr( 'style' );
				hbrand = parseInt(brand.width() * 268 / 600);

				brand.css('height',hbrand)
	//	}*/

		// resize brand
	/*	var brand = $('.brand');
	 	var sec_height = parseInt((height - brand.height())/2).toString() + "px 1em";

		brand.css('padding',sec_height);*/

		/*	var sec_height =0;

		// resize sections
		var sections = [ $('#about'),  $('#games'),  $('#cinema') ];

		for (var i = 0; i < sections.length; i++) {

				var r = (height - sections[i].height()) / 2;

				if (r < 32) {
					sec_height= "3.5em 0";

				} else  {
						//hbrand = "1em";parseInt(r).toString()
							sec_height =  160 + "px 0";
				}
					sections[i].css('padding',sec_height);

		}*/

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

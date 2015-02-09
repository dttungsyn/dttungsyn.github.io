console.log('This would be the main JS file.');
$(document).ready(function(){
	
	$.backstretch(["images/beautiful-white-flowers.jpg"], {
        duration: 3800,
        fade: 1500
    });
	
	setTimeout(function(){
		console.log("run");
		
		$(".dial").knob();
		
		new WOW({
	        mobile: false,
	        live: false
	    }).init();
		
		$('.brief').affix({
		  offset: {
		    top: $(window).height()
		  }
		})
		
		// keep width not change
		var brief_w = 100;
		$('.brief').on('affix.bs.affix', function(){
			brief_w = $(this).width();
		})
		
		$('.brief').on('affixed.bs.affix', function(){
			$(this).width(brief_w);
		})
		
		$('.brief').on('affixed-top.bs.affix', function(){
			$(this).width("");
		})
	}, 1000);
	
});
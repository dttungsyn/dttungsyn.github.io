console.log('This would be the main JS file.');
$(document).ready(function(){
	$(".dial").knob();
	new WOW({
        mobile: false
    }).init();
	
	$.backstretch(["images/beautiful-white-flowers.jpg"], {
        duration: 3800,
        fade: 1500
    });
	
	$('.brief').affix({
	  offset: {
	    top: $(window).height()
	  }
	})
});
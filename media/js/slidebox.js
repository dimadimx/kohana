$(document).ready(function() {
	$('.entry1', this).hide();
	$('.title1').append('<span></span>');
	$('.post1 span').each(function() {
		var  trigger = $(this), state = false, el = trigger.parent().next('.entry1');
		trigger.click(function(){
			state = !state;
			el.slideToggle(1000);
			trigger.parent().parent().toggleClass('active');
		 
		});
    $('.entry1 ').each(function(){
        var  trigger = $('.post1 span'), state = false, el = trigger.parent().next('.entry1');
		$('.entry1 ').click(function(){
			state = !state;
			el.slideToggle(1000);
			trigger.parent().parent().toggleClass('active');
			
    });
	});
	 });
   /* $('.title').append('<span></span>');
	$('.post span').each(function() {
		var  trigger = $(this), state = false, el = trigger.parent().next('.entry');
		trigger.click(function(){
			state = !state;
			el.slideToggle(1000);
			trigger.parent().parent().toggleClass('inactive');
			
		});
	}); */
    $('.entry', this).show();
	$('.title').append('<span></span>');
	$('.post span').each(function() {
		var  trigger = $(this), state = false, el = trigger.parent().next('.entry');
		trigger.click(function(){
			state = !state;
			el.slideToggle(1000);
			trigger.parent().parent().toggleClass('inactive');
			
		});
	});

});
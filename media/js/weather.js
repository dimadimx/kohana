$(function() {

	if ($('.weather').length) {
		var request = $.ajax({
			url: "/weather/ajax",
			type: "POST",
			data: { 'id' : $('.weather').attr('id')},
			dataType: "json"
		});
		request.done(function(data) {
			$('.weather').replaceWith(data.content);
		});
		request.fail(function( jqXHR, textStatus ) {
			$('.weather').replaceWith('');
		});	
	};
});
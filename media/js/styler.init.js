(function($) {
	$(function() {

		$('select').styler();

		$('.tv_select').change(function() {
			var request = $.ajax({
				url: "/tv/ajax",
				type: "POST",
				async: false,
				data: { 'name' : this.name, 'value' : this.value },
				dataType: "json"
			});
			request.done(function(data) {
                $('.p_programms').replaceWith(data.content);
			});
			request.fail(function( jqXHR, textStatus ) {
                $('.p_programms').replaceWith('');
			});
		});

		
	})
})(jQuery)
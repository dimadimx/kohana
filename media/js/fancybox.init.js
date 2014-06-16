 $(document).ready(function () {
 $(".fancybox_p").fancybox();
 });
 
  jQuery(document).ready(function() {
         
        /*  $(".fancy").click(function() {
         	$.fancybox({
         		'padding'		: 20,
         		'autoScale'		: false,
         		'transitionIn'	: 'none',
         		'transitionOut'	: 'none',
         		'title'			: this.title,
         		'width'			: 640,
         		'height'		: 385,
         		'href'			: this.href.replace(new RegExp("watch\\?v=", "i"), 'v/'),
         		'type'			: 'swf',
         		'swf'			: {
         		'wmode'				: 'transparent',
         		'allowfullscreen'	: 'true'
         		},
                helpers: {
            media: {}
        }
         	});
         
         	return false;
         });
       $(".fancy").click(function() {
		$.fancybox({
			'padding'		: 20,
			'autoScale'		: false,
			'transitionIn'	: 'none',
			'transitionOut'	: 'none',
			'title'			: this.title,
			'width'			: 640,
			'height'		: 385,
			'href'			: this.href.replace(new RegExp("([0-9])","i"),'moogaloop.swf?clip_id=$1'),
			'type'			: 'swf'
		});

		return false;
	});*/
          $(".fancybox_flex, .fancybox_p").fancybox({
            helpers : {
         title : {
         type : 'inside'
         }
         }
         });
   $(".fancy").fancybox({
  helpers : {
      media : {}
  }
  });

         });
 
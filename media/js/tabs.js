/* ------------------------------------------------------------------------
	Do it when you're ready dawg!
------------------------------------------------------------------------- */
$(document).ready(function () {
    tabs.init();
});
	

tabs = {
	init : function(){
		$('.tabs').each(function(){

			var th=$(this),
			tContent=$('.tab-content',th),
            navA=$('ul.nav li.tab_li > a',th)

			tContent.not(tContent.eq(0)).hide()

			navA.click(function(){
				var th=$(this),
				tmp=th.attr('href')
				tContent.not($(tmp.slice(tmp.indexOf('#'))).fadeIn(600)).hide()
				$(th).parent().addClass('selected').siblings().removeClass('selected');
				return false;
			});
		});

	}
}
tabs2 = {
	init : function(){
		$('.tabs_2').each(function(){

			var th=$(this),
			tContent=$('.tab-content',th),
            navA=$('ul.nav li.tab_li > a',th)

			tContent.not(tContent.eq(0)).hide()

			navA.click(function(){
				var th=$(this),
				tmp=th.attr('href')
				tContent.not($(tmp.slice(tmp.indexOf('#'))).fadeIn(600)).hide()
				$(th).parent().addClass('selected').siblings().removeClass('selected');
				return false;
			});
		});

	}
}
 $(function() {  
  
  $('.tabs').on('click', 'li:not(.current)', function() {  
    $(this).addClass('current').siblings().removeClass('current')  
      .parents('div.zodiac_block').find('div.box').eq($(this).index()).fadeIn(150).siblings('div.box').hide();  
  })  
  
})
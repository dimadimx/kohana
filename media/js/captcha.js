
jQuery(document).ready(function(){

    jQuery('.reload_captcha').click(function(){

        id = Math.floor(Math.random()*1000000);
        $("img.captcha").attr("src","/captcha/default?id="+id);

    })

});


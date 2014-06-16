$(document).ready(function() {
  $('.weather_day_block_opport').each(function() {

    var percent = $(this).find('.weather_day_block_percent p span').text();
    var perInt = parseInt(percent);

    $(this).find('.chance').css({
      width: perInt + '%'
    });

  })

  /*WEATHER BLOCK*/

  function weatherWidth() {
    var width = $('.weather_time').width();
    var bWidth = width - 200;
    $('.weather_time_row_wrap').css({
      width: bWidth
    })
  }
  weatherWidth();
  $(window).bind("resize", function() {
    weatherWidth();
  });
  /*MAP FIND*/
  $('.find_address').click(function() {
    if ($('.search_wrap_adress').is(":visible")) {

    } else {
      $('.search_map').hide();
      $('.search_wrap_adress').show();
      $(this).addClass('search_selected').parents('.map_search_ul').find('.find_route').removeClass('search_selected');
    }
  });
  $('.find_route').click(function() {
    if ($('.search_map').is(":visible")) {

    } else {
      $('.search_wrap_adress').hide();
      $('.search_map').show();
      $(this).addClass('search_selected').parents('.map_search_ul').find('.find_address').removeClass('search_selected');
    }
  });

  /*UPLOAD BLOCK*/
  $('.upload_a').click(function() {
    $('.p_upload').slideDown(1000);
    $('#form_file_upload').slideDown(1100);
  });
  $('.upload_close').click(function() {
    $('.p_upload').slideUp(1000);
$('#form_file_upload').slideUp(600);
  });

    /*WEBFILE UPLOADER*/
    $('.upload_close').click(function() {
		$(this).parents('.top_content').slideUp(1000);
	   
    });

  /*HOROSCOPE BANNER*/
  var width = $('.zodiacs.tabs').width();

  if (width <= 740) {
    $('.zodiacs.tabs + .banner_2 img').css({
      width: 100 + '%'
    })
  }
 /*LIST COUNTER VIDEO&PHOTO*/
 function marginVideoCounter()  {
    var _list = $(".list_counter ul li");
var arrImgWidth = _list.map(function(i,el){
    return $(el).find('a').outerWidth();
}).get();
var total=0;
for(var i = 0; i<arrImgWidth.length;i++) {
     total += arrImgWidth[i];
    }
var marginSum =arrImgWidth.length*4+7;
var width = $('.anons_block').width();
margin = (width - total-marginSum)/2;
    $('.list_counter ul').css({
        marginLeft:margin
    });
}
 marginVideoCounter();

 /*LIST COUNTER RUBRIC*/
  function marginCounter()  {
    var _list = $(".list_counter.rubric ul li");
var arrImgWidth = _list.map(function(i,el){
    return $(el).find('a').outerWidth();
}).get();
var total=0;
for(var i = 0; i<arrImgWidth.length;i++) {
     total += arrImgWidth[i];
    }
var marginSum =arrImgWidth.length*4+7;
var width = $('.main_news_col').width();
margin = (width - total-marginSum)/2;
    $('.list_counter.rubric ul').css({
        marginLeft:margin
    });
}
 marginCounter();
 /*LIST COUNTER COMMENTS*/
    function marginCommentsCounter() {
        var _list = $(".comments .list_counter ul li");
        var arrImgWidth = _list.map(function(i, el) {
            return $(el).find('a').outerWidth();
        }).get();
        var total = 0;
        for (var i = 0; i < arrImgWidth.length; i++) {
            total += arrImgWidth[i];
        }
        var marginSum = arrImgWidth.length * 4 + 7;
        var width = $('.comments').width();
        margin = (width - total - marginSum) / 2;
        $('.comments .list_counter ul').css({
            marginLeft: margin
        });
    }
    marginCommentsCounter();
 /*FADING MENU*/
    $('.expand_menu').on('click', function() {
        $('.fading_menu').toggle();
        $(this).toggleClass('menuHover');
    })
    $('.fading_menu li a').on('click', function() {
        $(this).parent('.fading_menu').hide();
        $(this).parent('.expand_menu').removeClass('menuHover');
    })
    /*LOGIN OPTION*/
    //SHOW .login_option
    function open(){
       $('.login_option').show(); 
    }
    $('.login_option ul li a').on('click', function() {
        $('.login_option').hide();
    });
    /*WEBMAIL MENU*/
    function webmail_menu(){
        var count = $('.webmail_menu ul li').length;
        var width_li =  Math.round(1000/count)-1;
        $('.webmail_menu ul li').css({
            'width':width_li+'px'
        })
    }
    webmail_menu();
    /*BACKGROUND BG_REGIS*/
    function heightBgRegis(){
        var heightWindow = $(window).height();
        var heightHeader = $('header.menu_header').height();
        var heightBg = heightWindow - heightHeader;
        $('.bg_regis').css({
            'height':heightBg
        })
        
    }
    heightBgRegis();
	/*PROFILE DELETE AVATAR*/
//   $('.delete_avatar ').on('click', function(){
//    $('.bg_avatar img').hide();
//   })

    $('#genre').on('click','li', function(){
        var c = $('.page_block');
        var filter = $(this).data('value');
        $.ajax({
            url:'/movie',
            type: 'POST',
            start:topPreloader(c),
            data:({filter:filter}),
            success:(function(d){
                c.html(d);
            }),
            complete:function(){
                $('.preloader').remove();
            }
        })
    })
	    /*POPUP_ENTER*/
    $('.p_enter').click(function(){
        $('.popup_enter').fadeIn(1000);
    })
    $('.popup_enter_submit').click(function(){
        $(this).parents('.popup_enter').fadeOut(1000);
    })
    $(document).mouseup(function (e) {
        var container = $('.popup_enter');
        if (container.has(e.target).length === 0){
            container.fadeOut(1000);
       
  }
});
    $('#login_submit').on('click', function(){
    var login =  $(this).parent().find('#login').val();
    var pass =  $(this).parent().find('#password').val();
    var rem =   $(this).parent().find('#popup_enter_check').val();
    var i = new Image();
    i.src = 'http://dev135.bvblogic.net/auth/login?email='+login+'&passwd='+pass+'&rememberme='+rem+'&crossauth=1';
    setTimeout('window.location.reload()', 600);
});


    function getRegions(id) {
        $.post("/profile/get_region/", {country: id, profile: true}, function (data) {
            console.log(data);
            $('#regions_block').empty().append(data);
            $('select').styler();
        });
    }

    function getCity(id) {
        $.post("/profile/get_city/", {region: id, profile: true}, function (data) {
            $('#city_block').empty().append(data);
            $('select').styler();
        });
    }

    $('#country').on('click', ' li ' ,function () {

        getRegions($(this).data('val'));
    });
    $('#regions_block').on('click', ' li ', function () {
        getCity($(this).data('val'));
    });
});

/**
 *
 * @param c
 */
function topPreloader(c){
    c.prepend('<div class="preloader" ><img src="/media/img/preloader.GIF" width="220" height="73"></div>');
    var height = c.height();
    var heightPreloader = $('.preloader').height();
    var top = height/2 - heightPreloader/2 -50;
    $('.preloader').css({
        'top':top+'px'
    })
}
/**
 * ajax page load
 * @param url
 * @returns {boolean}
 */
function pagination(url){
    var c=$('.page_block');
    $.ajax({
        url:url,
        start:topPreloader(c),
        success:(function(d){
            c.html(d);
//                 history.pushState({ foo: "bar" }, "Webfile", url);
        }),
        complete:function(){
            $('.preloader').remove();
        }
    })
    return false;
}

function addSoc(a, link, title, username, message, image) {
    link = encodeURIComponent(link);
    t = encodeURIComponent(document.title);
    var regExp = new RegExp('#', 'ig');
    if (link.search(regExp) != -1) {
        link = link.replace(regExp, '%23');
    }
    if (a == 1)h = 'vkontakte.ru/share.php?url=' + link + '&title=' + title  + '  &image=' + image;
    else if (a == 2)h = 'odnoklassniki.ru/dk?st.cmd=addShare&st.s=1000&st._surl=' + link + '&st.comments=' + encodeURIComponent(title) + '&tkn=3009&imageurl=' + image;
    else if (a == 3) {
        var regExp = new RegExp('#', 'ig');
        if (link.search(regExp) != -1) {
            link = link.replace(regExp, '%23');
        }
        if (message == '')
            message = title;
        h = 'twitter.com/intent/tweet?url=' + link + '&text=' + message;
        //h = encodeURIComponent(h);
    }
    else if (a == 4)
        window.open('http://www.facebook.com/dialog/feed?app_id=547835895334913&redirect_uri=' + link + '&name=' + title + '&link=' + link + '&picture=' + image);
    else if (a == 5) {
        window.open('https://plus.google.com/share?url=' + link, 'Soc', 'screenX=100,screenY=100,height=500,width=500,location=no,toolbar=no,directories=no,menubar=no,status=no');
        return false;
    }
    else return;
    window.open('http://' + h, 'Soc', 'screenX=100,screenY=100,height=500,width=500,location=no,toolbar=no,directories=no,menubar=no,status=no');
    return false;
}


function loadComments(){
    var p=$('.list_counter a.current');
    if(p.length)
        p.click();
    else
        pagination('/movie/comments/'+$('.anons_video').data('id'));
}

/**
 *
 * @param id
 * @param action
 * @returns {boolean}
 */
function rateComment(id,action){
    $.ajax({
        url:'/movie/ratecomment/'+id+'?action='+action,
        success:(function(d){
            loadComments();
        })
    })
    return false;
}
function getMovie(o){
    var c=$('.page_block');
    var filter = o.data('filter');
    $('.sorter').find('li[class="selected_point"]').removeClass();
    o.parent().addClass('selected_point');
    $.ajax({
        url:'/movie',
        type: 'POST',
        start:topPreloader(c),
        data:({filter:filter}),
        success:(function(d){
            c.html(d);
        }),
        complete:function(){
            $('.preloader').remove();
        }
    })
    return false;
}

function getScedule(){
    var el=$('.wrap_kinotheater');
    var city= el.find('.city_list option:selected').val();
    var date= el.find('.datepicker').val();
    var movie =el.data('movie');
    $.ajax({
        url:'/movie/scedule/',
        type:'POST',
        dataType:'json',
        data:{city:city,date:date,movie:movie},
        success:(function(d){
           if(d.content)
            el.find('.kinotheater_body').replaceWith(d.content)
           else
            el.find('.kinotheater_body').html('');
        })
    })
    return false;
}
function exit(){
    var i = new Image();
    i.src = 'http://dev135.bvblogic.net/auth/logout/';
    setTimeout('window.location.reload()', 300);
}
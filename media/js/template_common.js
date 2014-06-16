var uploads_size_lim;
var file_size_lim = 1024 * 1024 * 1024 * 10;
var uploads_size_count = 0;



$(document).ready(function () {

    //---- test use script
    $('#noscript').hide();
    //---- test use cookie
    if (document.cookie != '') {
        $('#nocookies').hide();
        $('.wrap').show();
    }

    $(document).on('click', '.btn_download_file', function () {
      window.open('http://webfile.ru/thanks', '_blank');
  });

    //	copy file url's
    ZeroClipboard.setDefaults({
        moviePath: 'http://' + location.host + '/media/js/ZeroClipboard.swf'
    });
    var clip1 = new ZeroClipboard($('.copy_file_url'));
    var clip2 = new ZeroClipboard($('.copy_file_forum'));
    var clip3 = new ZeroClipboard($('.copy_file_blog'));
    var clip4 = new ZeroClipboard($('.copy_file_delete'));
    var clip5 = new ZeroClipboard($('.copy_ip_url'));
    clip1.addEventListener('onComplete', my_complete);
    clip1.addEventListener('onComplete', my_complete);
    clip1.addEventListener('onComplete', my_complete);
    function my_complete( client ) {
        alert( "Ссылка скопирована в буфер." );
    }


    draw_account_menu_info();
    /*COLORED TABLE STRINGS*/
    $('tr:nth-child(odd)').addClass('odd');
    $('tr:nth-child(even)').addClass('even');
    /*SAME HEIGHT*/
    setEqualHeight($(".wrap_file > div"));

    function setEqualHeight(columns) {
        var tallestcolumn = 0;
        columns.each(
            function () {
                currentHeight = $(this).height();
                if (currentHeight > tallestcolumn) {
                    tallestcolumn = currentHeight;
                }
            }
            );
        columns.height(tallestcolumn);
    }
    /*TABLE CONTEXT MENU FOR FILES */
    $(document).on('click', '.context', function (e) {
        $('.hidden_menu_centered').hide();
        $(this).parents('.panel').children('.hidden_menu_centered.file_up').show();
        var yClick = e.pageY - $(this).parents('.panel').offset().top;
        var xClick = e.pageX - $(this).parents('.panel').offset().left;

        var heightPanel = $(this).parents('.panel').height();

        var popup_menu = $(this).parents('.panel').children('.hidden_menu_centered.file_up');
        popup_menu.css({
            top: yClick + 12,
            left: xClick + 25
        })

        var diff_top = heightPanel - yClick;

        if (diff_top >= 200) {
            popup_menu.css({
                top: yClick + 12,
                left: xClick + 25
            })
        } else if (diff_top < 200) {
            popup_menu.css({
                top: yClick - 180,
                left: xClick + 25
            })
        }

        if (popup_menu.css('display') == 'block') {
            var timer = setTimeout(function () {
                popup_menu.fadeOut(500)
            }, 2000);
        }
        $('body').click(function () {
            popup_menu.fadeOut(0).stop();
            clearTimeout(timer);
        });

        popup_menu.mouseover(function () {
            clearTimeout(timer);
        });
        popup_menu.mouseleave(function () {
            setTimeout(function () {
                popup_menu.fadeOut(500)
            }, 2000);
        });
    });

/*TABLE CONTEXT MENU FOR  FOLDERS*/
$(document).on('click', '.context.call_folder', function (e) {
    $('.hidden_menu_centered').hide();
    $(this).parents('.panel').children('.hidden_menu_centered.folder_up').show();
    var yClick = e.pageY - $(this).parents('.panel').offset().top;
    var xClick = e.pageX - $(this).parents('.panel').offset().left;

    var heightPanel = $(this).parents('.panel').height();

    var popup_menu = $(this).parents('.panel').children('.hidden_menu_centered.folder_up');
    popup_menu.css({
        top: yClick + 12,
        left: xClick + 25
    })

    var diff_top = heightPanel - yClick;

    if (diff_top >= 200) {
        popup_menu.css({
            top: yClick + 12,
            left: xClick + 25
        })
    } else if (diff_top < 200) {
        popup_menu.css({
            top: yClick - 70,
            left: xClick + 25
        })
    }

    if (popup_menu.css('display') == 'block') {
        var timer = setTimeout(function () {
            popup_menu.fadeOut(500)
        }, 2000);
    }
    $('body').click(function () {
        popup_menu.fadeOut(0).stop();
        clearTimeout(timer);
    });

    popup_menu.mouseover(function () {
        clearTimeout(timer);
    });
    popup_menu.mouseleave(function () {
        setTimeout(function () {
            popup_menu.fadeOut(500)
        }, 2000);
    });
});
/*GRID POPUP_FILE*/
$(document).on('click', '.call_context_file', function (e) {

    $('.hidden_menu_centered').hide();
    $(this).parents('.panel').children('.hidden_menu_centered.file_up').show();
    var yClick = e.pageY - $(this).parents('.panel').offset().top;
    var xClick = e.pageX - $(this).parents('.panel').offset().left + 250;
    var heightPanel = $(this).parents('.panel').height();
    var widthPanel = $(this).parents('.panel').width();
    var popup_menu = $(this).parents('.panel').children('.hidden_menu_centered.file_up');
    popup_menu.css({
        top: yClick,
        left: xClick
    })
    var diff = widthPanel - xClick;
    var diff_top = heightPanel - yClick;

    if ((diff >= 0) && (diff_top >= 200)) {
        popup_menu.css({
            top: yClick,
            left: xClick
        })
    } else if ((diff < 0) && (diff_top >= 200)) {
        popup_menu.css({
            top: yClick,
            left: xClick - 225
        })
    } else if ((diff < 0) && (diff_top < 200)) {
        popup_menu.css({
            top: yClick - 180,
            left: xClick - 225
        })
    } else if ((diff >= 0) && (diff_top < 200)) {
        popup_menu.css({
            top: yClick - 180,
            left: xClick
        })
    }

    if (popup_menu.css('display') == 'block') {
        var timer = setTimeout(function () {
            popup_menu.fadeOut(500)
        }, 2000);
    }
    $('body').click(function () {
        popup_menu.fadeOut(0).stop();
        clearTimeout(timer);
    });

    popup_menu.mouseover(function () {
        clearTimeout(timer);
    });
    popup_menu.mouseleave(function () {
        setTimeout(function () {
            popup_menu.fadeOut(500)
        }, 2000);
    });
});

/*GRID POPUP_FOLDER*/
$(document).on('click', '.call_context_folder', function (e) {
    $('.hidden_menu_centered').hide();
    $(this).parents('.panel').children('.hidden_menu_centered.folder_up').show();
    var yClick = e.pageY - $(this).parents('.panel').offset().top;
    var xClick = e.pageX - $(this).parents('.panel').offset().left + 250;
    var heightPanel = $(this).parents('.panel').height();
    var widthPanel = $(this).parents('.panel').width();
    var popup_menu = $(this).parents('.panel').children('.hidden_menu_centered.folder_up');
    popup_menu.css({
        top: yClick,
        left: xClick
    })
    var diff = widthPanel - xClick;
    var diff_top = heightPanel - yClick;

    if ((diff >= 0) && (diff_top >= 200)) {
        popup_menu.css({
            top: yClick,
            left: xClick
        })
    } else if ((diff < 0) && (diff_top >= 200)) {
        popup_menu.css({
            top: yClick,
            left: xClick - 225
        })
    } else if ((diff < 0) && (diff_top < 200)) {
        popup_menu.css({
            top: yClick - 180,
            left: xClick - 225
        })
    } else if ((diff >= 0) && (diff_top < 200)) {
        popup_menu.css({
            top: yClick - 180,
            left: xClick
        })
    }
    if (popup_menu.css('display') == 'block') {
        var timer = setTimeout(function () {
            popup_menu.fadeOut(500)
        }, 2000);
    }
    $('body').click(function () {
        popup_menu.fadeOut(0).stop();
        clearTimeout(timer);
    });

    popup_menu.mouseover(function () {
        clearTimeout(timer);
    });
    popup_menu.mouseleave(function () {
        setTimeout(function () {
            popup_menu.fadeOut(500)
        }, 2000);
    });
});

/*ENTER_BAR*/
$('.btn_enter').click(function () {
    $('.enter_bar').fadeIn('slow');
});

$('.btn_cancel_bar2').click(function () {
    $('.enter_bar').fadeOut('slow');
});
/*REGISTER_BAR*/
$('.btn_registration').click(function () {
    $('.register_bar').fadeIn('slow');
});

$('.btn_cancel_bar').click(function () {
    $('.register_bar').fadeOut('slow');
});




/*POPUP_URL*/
$(document).on('click', '.call_popup_url', function () {
    var heightWindow = $(document).scrollTop() + $(window).height() / 2;
    var heightBlock = $('.popup_url').height() / 2;
    var widthBlock = $('.popup_url').width();
    var marginLeft = widthBlock / 2;
    $(this).next('.popup_url').fadeIn(1000);
    $('.overlay').css('height', $(document).height()).fadeIn(800);
    $('.popup_url').css({
        top: heightWindow,
        marginLeft: -marginLeft,
        marginTop: -heightBlock,
        left: '50%',
        right: '50%',
        marginRight: -marginLeft
    });
});

$(document).on('click', '.close_popup_url', function () {
    $(this).parent('.popup_url').fadeOut(800);
    $('.overlay').fadeOut(1000);
});

$(document).on('click', '.save_changes', function () {
    $(this).parent().parent('.popup_url').fadeOut(800);
    $('.overlay').fadeOut(1000);
});




/*TABLE POPUP_URL*/
$(document).on('click', '.show_popup_grid_url', function () {
    $(this).parents('.panel').children('.grid_url.example').fadeIn(800);
    var heightWindow = $(document).scrollTop() + $(window).height() / 2;
    var heightBlock = $('.grid_url.example').height() / 2;
    var widthBlock = $('.grid_url.example').width();
    var marginLeft = widthBlock / 2;
    $('.grid_url.example').css({
        top: heightWindow,
        marginLeft: -marginLeft
    });
    $('.overlay').css('height', $(document).height()).fadeIn(800);
});

$(document).on('click', '.close_grid_url', function () {
    $(this).parent('.grid_url.example').fadeOut(800);
    $('.overlay').fadeOut(1000);
});

$(document).on('click', '.save_changes', function () {
    $(this).parent().parent('.grid_url.example').fadeOut(800);
    $('.overlay').fadeOut(1000);
});
/*BACKGROUND TOP_CONTENT*/
bgTopContent();

function bgTopContent() {
    var height = $('.password_bg').children().height();
    $('.password_bg').css({
        'height': height + 75,
        'margin-bottom': 15
    })
}

/*CONTEXT_MENU USER LIST*/
$(document).on('click', '.context_user_list', function () {
    $(this).next('.context_menu_user_list').toggle();
});

$(document).on('click', '.context_menu_user_list li a', function () {
    $(this).parent().parent().parent('.context_menu_user_list').fadeOut('slow');
});

/*CHECKBOX_4*/
function marginLeft() {
    var fieldwrapper = $('.fieldwrapper').width();
    var checkbox = $('.checkbox_4').width();
    var marginLeft = (fieldwrapper - checkbox) / 2;
    var adminBtn = $('.admin_btn').width();
    var marginLeft_1 = (fieldwrapper - adminBtn) / 2;
    $('.checkbox_4 ').css({
        'margin-left': marginLeft
    });
    $('.admin_btn ').css({
        'margin-left': marginLeft_1
    });
}

marginLeft();
$(window).bind("resize", function () {
    marginLeft();
});
/*LINE-HEIGHT*/
function lineHeight() {
    $('.labelwrapper label').each(function () {

        var labelHeight = $(this).height();

        if (labelHeight < 20) {
            $(this).css({
                'margin-top': '7px'
            });
        } else if (labelHeight > 20) {
            $(this).css({
                'margin-top': '0'
            });
        } else {
            $(this).css({
                'margin-top': '7px'
            });
        }
    });
}


lineHeight();
$(window).bind("resize", function () {
    lineHeight();
});
/*ERROR MESSAGE*/
function errorMessage() {
    var wrapInnerWidth = $('.wrapInner').width();

    if (wrapInnerWidth == 1400) {
        $('.error ').css({
            'right': '-35%'
        });
    } else if ((wrapInnerWidth < 1400) && (wrapInnerWidth > 1281)) {
        $('.error ').css({
            'right': '-40%'
        });
    } else if ((wrapInnerWidth < 1280) && (wrapInnerWidth > 1161)) {
        $('.error ').css({
            'right': '-45%'
        });
    } else if (wrapInnerWidth < 1160) {
        $('.error ').css({
            'right': '-55%'
        });
    }
}

errorMessage();
$(window).bind("resize", function () {
    errorMessage();
});

/*MARGIN .btn_admin*/
function marginLeft_1() {
    $('.admin_btn').each(function () {
        var fieldwrapper = $('.fieldwrapper').width();

        var adminBtn = $(this).width() + 40;

        var marginLeft_1 = (fieldwrapper - adminBtn) / 2;

        $(this).css({
            'margin-left': marginLeft_1
        });
    });
}

marginLeft_1();
$(window).bind("resize", function () {
    marginLeft_1();
});
/*MARGIN & HEIGHT .search_result*/
function mar_heig_search_result() {
    var user_field = $('.user .fieldwrapper input').width() + 10;
    var user_field_mod = parseInt(user_field);

    var margin_user_field = $('.user .fieldwrapper ').css('marginLeft');
    var margin_user_field_mod = parseInt(margin_user_field);
    var admin_unit_height = $('.admin_unit.user').width();
    var margin_right = admin_unit_height - user_field_mod - margin_user_field_mod;


    $('.search_result').css({
        'width': user_field,
        'margin-left': margin_user_field,
        'margin-right': margin_right
    });
}

mar_heig_search_result();
$(window).bind("resize", function () {
    mar_heig_search_result();
});
/*MARGIN .admin_user_btn*/
function marginLeft_2() {

    var inputwrapper = $('.inputwrapper').width();

    var admin_user_btn = $('.admin_user_btn').width() + 40;

    var marginLeft_2 = (inputwrapper - admin_user_btn) / 2;

    $('.admin_user_btn').css({
        'margin-left': marginLeft_2
    });

}

marginLeft_2();
$(window).bind("resize", function () {
    marginLeft_2();
});

/*BIG FILES*/

$('.short_name').each(function () {
    $(this).mouseover(function () {
        var value = $(this).text();
        $(this).append("<div class='full_name'>" + value + "</div>");
    });
    $(this).mouseout(function () {

        $(this).find('.full_name').remove();
    });
});
/*FILEMANAGER DEFAULT*/


function defaultHeight() {
    var windowHeight = $(window).height();
    var headerHeight = $('.header').height();
    var footerHeight = $('.footer').height();
    var transferHeight = $('.bottom_content.transfer_file').height();
    var contentHeight = windowHeight - headerHeight - footerHeight - transferHeight;
    $('.top_content.default').css({
        height: contentHeight
    });
    $('.top_panel_table p,.top_panel_grid p').css({
        'line-height': contentHeight - 50 + 'px'
    });
    if ($('.top_content.default').height() <= 150) {
        $('.top_panel_table p, .top_panel_grid p').css({
            'line-height': 80 + 'px'
        });
    }
}

defaultHeight();
$(window).bind("resize", function () {
    defaultHeight();
});

/*CREATE NEW CONTACT*/
$('.new_contact_btn').click(function () {
    var widthBlock = $('.new_contact_popup').width();
    var marginLeft = widthBlock / 2;
    jQuery('.contacts_errors').remove();
    $('.top_panel').css({
        'position': 'static'
    });
    $('.new_contact_popup').fadeIn('slow');
    $('.overlay').css('height', $(document).height()).fadeIn(1000);
    $('.new_contact_popup').css({
        marginLeft: -marginLeft
    })
});
$('.cancel_popup_new_folder').click(function () {
    $('.new_contact_popup').hide();
    $('.overlay').fadeOut(1000);
    $('.top_panel').css({
        'position': 'relative'
    });
});

/*INPUT PASSWORD UPLOADED_FILE*/
function passwordInput() {
    $('.a_set_password').click(function () {
        $(this).hide();
        $(this).next('.get_password input').show();
        $(this).next('.get_password input').focus();
    });
}

passwordInput();
$(window).bind("change", function () {
    passwordInput();
});

$('.btn_send_passwd').click(function () {
    var pass = $('#password').val();
    var id = $('#id').val();

    $.ajax({
        type: 'POST',
        url: 'http://' + location.host + '/check_file_password/',
        data: {
            'password': pass,
            'id': id
        },
        dataType: 'html',
        success: function (result) {
            if (result == 'ok') {
                $('#passwd').remove();
                $('.download_file').append('<a href="/download/' + id + '" class="btn_download_file">Скачать</a>');
            } else {
                $('#enter_pass').children().html('<p><span style="color: #ff0000">Не верный пароль!</span></p>');
            }
        }
    })
});

function primaryScroll() {
    var documentHeight = $(document).height();
    var windowHeight = $(window).height();
    var headerHeight = $('.header').height();
    var footerHeight = $('.footer').height();
    var transferHeight = $('.transfer_table').height();
    var addHeight = documentHeight - headerHeight - footerHeight - 40 - 53 - transferHeight;
    var needHeight = windowHeight - addHeight;
    var freeHeight = windowHeight - headerHeight - footerHeight - 40 - 53;
    var anyHeight = freeHeight - transferHeight;

    var contentHeight = documentHeight - headerHeight - footerHeight;

    if (documentHeight > windowHeight) {
        $('.top_panel_grid, .top_panel_table').css({
            height: freeHeight,
            'overflow-y': 'auto'

        });
        $('.finder').css({
            height: anyHeight
        });
    } else {
        $('.top_panel_grid, .top_panel_table').css({
            height: freeHeight,
            'overflow-y': 'auto'

        });
        $('.finder').css({
            height: anyHeight
        });
    }
}

primaryScroll();
$(window).bind("resize", function () {
    primaryScroll();
});

function bgNewTransfer() {
    var heightWindow = $(window).height();
    var heightHeader = $('.header').height();
    var heightTransfer = $('.transfer_file').height();
    var heightTopPanel = $('.top_panel').height();
    var heightDelete = heightWindow - heightHeader - heightTransfer - heightTopPanel - 5;
    $('.top_panel_grid, .top_panel_table, .finder').css({
        height: heightDelete
    });
}
bgNewTransfer();

function scrollTransfer() {

    var documentHeight = $(document).height();
    var windowHeight = $(window).height();
    var headerHeight = $('.header').height();
    var transferHeight = $('.transfer_table').height();
    var freeHeight = windowHeight - headerHeight - 40 - 53;
    var anyHeight = freeHeight - transferHeight;
    var entryHeight = $('.entry2').height();
    var width = $(window).width() - 230;
    if (entryHeight < 39) {
        $('.top_panel_grid, .top_panel_table, .finder').animate({
            height: anyHeight
        }, 999

        );
        $('.top_panel_grid, .top_panel_table').css({
            'overflow-y': 'auto'
        });
    } else if (entryHeight > 39) {
        $('.top_panel_grid, .top_panel_table, .finder').animate({
            height: freeHeight
        }, 999

        );
        $('.top_panel_grid, .top_panel_table').css({
            'overflow-y': 'auto'
        });
    }
}

$('.transfer_file  span').click(function () {
    scrollTransfer();

});



function bgDeletedFile() {
    var heightWindow = $(window).height();

    var heightHeader = $('.header').height();

    var heightFooter = $('.footer').height();

    var heightDelete = heightWindow - heightHeader - heightFooter;
    $('.top_content.delete_file.deleted_one').css({
        height: heightDelete
    });
}
bgDeletedFile();

function bgNotFoundFile() {
    var heightWindow = $(window).height();

    var heightHeader = $('.header').height();

    var heightFooter = $('.footer').height();

    var heightDelete = heightWindow - heightHeader - heightFooter;
    $('.top_content.download_file.not_found_one').css({
        height: heightDelete
    });
}
bgNotFoundFile();

    // function bgDownloadFile() {
    //     var heightWindow = $(window).height();

    //     var heightHeader = $('.header').height();

    //     var heightFooter = $('.footer').height();

    //     if (heightWindow > 820) {
    //         var heightDelete = heightWindow - heightHeader - heightFooter;
    //         $('.top_content.download_file').css({
    //             height: heightDelete
    //         });
    //     }
    // }
    // bgDownloadFile();
    function bgDownloadFile() {
        var heightWindow = $(window).height();

        var heightHeader = $('.header').height();
        var bottom1 = $('.bottom_content').height();
        var bottom2 = $('.bottom_content.bottom_delete').height();
        var heightFooter = $('.footer').height();

        if (heightWindow > 820) {
            var heightDelete = heightWindow - heightHeader - heightFooter +  bottom1 + bottom2;
            $('.top_content.download_file').css({
                height: heightDelete
            });
        }
    }
    bgDownloadFile();

    bgProfile();

    function bgProfile() {
        var heightWindow = $(window).height();
        var heightDocument = $(document).height();
        var heightHeader = $('.header').height();
        var heightFooter = $('.footer').height();
        if (heightWindow >= heightDocument) {
            var heightProfile = heightWindow - heightHeader - heightFooter;
            $('.profile_content').css({
                height: heightProfile - 4
            });
            $('.profile_left').css({
                height: heightProfile - 70
            });
        }
    }
    bgProfile();

    /*//  IE
	if (navigator.appName == "Microsoft Internet Explorer") {
    	ie = true;
    	var ua = navigator.userAgent;
    	var re = new RegExp("MSIE ([0-9]{1,}[.0-9]{0,})");
    	if (re.exec(ua) != null) {
        	ieVersion = parseInt(RegExp.$1);
    		}
	}
 	if (ieVersion == 8 )   {
    		function bgProfileIe(){
   			var heightWindow = $(window).height();
   			var heightDocument = $(document).height();
   			var heightHeader = $('.header').height();
   			var diff =  heightWindow- heightDocument;
   				if(diff>=-5)  {
  					var heightProfile = heightWindow - heightHeader ;
   					$('.profile_content').css({
    					height:heightProfile-4
   					});
   					$('.profile_left').css({
    					height:heightProfile-70
   					});
   				}
   			}
   		bgProfileIe();
      }*/


      function bg404() {
        var heightWindow = $(window).height();
        var heightHeader = $('.header').height();
        var heightFooter = $('.footer').height();
        var heightBottom = $('.bottom_content p').height();
        var corr =  24 + 35 //br and margin
        var height404 = heightWindow - heightHeader - heightFooter - heightBottom - corr;
        $('.bg_top_content.bg_404').css({
            height: height404

        });
        if (heightWindow>650 && heightWindow<780)   {
            $('.block_404 h1').css({
             paddingTop:40
         });
        }
        else if (heightWindow>781)   {
            $('.block_404 h1').css({
                paddingTop:100
            });
        }
    }
    bg404();
    /*DELETE AVATAR*/
    $('.delete_avatar').click(function () {
        $('.bg_avatar').html("<img src='/media/img/avatar.png' width='90' height='90'/>");
        $('.auth_avatar').html("<img src='/media/img/avatar.png' width='26' height='26'/>");

        $.ajax({
            type: 'POST',
            url: 'http://' + location.host + '/profile/remove_avatar/',
            dataType: 'json'
        })
    });
    /*DESCRIPTION*/
    $(document).on('mouseover', '.grid_unit h3, .list_folder_name ', function () {

        $(this).siblings('.description').delay(1000).fadeIn(250);

        $(this).parent('.grid_unit').css({
            'position': 'relative'
        });

    });
    $(document).on('mouseover', '.top_panel_table .td_1 ', function () {
        var $this = $(this).children().find('.description');
        var timer = setTimeout(function () {
            $this.show();
        }, 1000);
        $(document).on('mouseleave', '.top_panel_table .td_1 ', function () {
            clearTimeout(timer);
            $this.hide();
        });
    });


    $(document).on('mouseleave', '.grid_unit h3,  .list_folder_name ', function () {
        var $desc = $(this).siblings('.description');
        var $parent_desc = $(this).parent('.grid_unit');

        if ($parent_desc.css('position') == 'relative') {
            var timer2 = setTimeout(function () {
                $desc.fadeOut(0)
            }, 500);
            $desc.mouseover(function () {
                clearTimeout(timer2);
                $desc.show();
            });
            $desc.mouseleave(function () {
                setTimeout(function () {
                    $desc.hide(0)
                }, 500);
            });

        }

    });
    /*WIDTH PROFILE UPLOAD*/
    function widthProfileInput() {
        var widthInput = $('.formfield input').width();
        var widthUpload = widthInput - $('.start_mask_2').width() - $('.finish_mask_2').width();
        $('.middle_mask_2').css({
            width: widthUpload + 15
        });
    }
    widthProfileInput();

    /*BG EMPTY_STATS*/
    function bgEmptystats() {
        var heightWindow = $(window).height();

        var heightDoc = $(document).height();

        var heightHeader = $('.header').height();

        var heightFooter = $('.footer').height();

        var heightEStats = heightWindow - heightHeader - heightFooter;
        if (heightWindow >= heightDoc) {
            $('.top_content.stats_page').css({
                height: heightEStats
            });
        }
    }
    bgEmptystats();
    /*PREMIUM CHOISE*/
    $('.icon_fast_type .no_author, .fast_type .no_author').click(function () {
        $('.premium_popup').show();
        $('.overlay').show();
    });
    $('.close_premium, .btn_enter_bar, .premium_popup .btn_cancel_bar2, .premium_popup .btn_register_bar, .premium_popup .btn_cancel_bar').click(function () {
        $('.premium_popup').hide();
        $('.overlay').hide();
    });


    /*HOVER*/
    $('#fileupload').hover(function () {
        $(this).next('.mask').addClass('mask_hover', 300)
    },
    function () {
        $(this).next('.mask').removeClass('mask_hover', 300)
    }
    );

    /*Hiding by click on outside of hidden_menu*/
    $('body').click(function () {
        $('.hidden_menu').hide();
    });

    /*CLOSE WARNING PLACE*/
    $('.warning_close').click(function () {
        $(this).parents('.warning.place').hide();
        $('.overlay').removeClass('open_view');
    })

    /*CLOSE WARNING VOLUME*/
    $('.warning_close.volume_close').click(function () {
        $(this).parents('.warning.volume').hide();

    })
    /*CLOSE WARNING PLACE_BOTTOM*/
    $('.warning_close.place_bottom_close').click(function () {
        $(this).parents('.warning.place_bottom').hide();

    })



    /*PREMIUM POSITION*/
    function premiumPosition() {
        var width = $(window).width();
        if ((width > 1050) && (width < 1280)) {
            $('.sum_result_wrap').css({
                'left': 740
            })
            $('.to_robocasa').css({
                'left': 850
            })

        } else if (width < 1049) {
            $('.sum_result_wrap').css({
                'left': 705
            })
            $('.to_robocasa').css({
                'left': 785
            })
        } else if (width > 1281) {
            $('.sum_result_wrap').css({
                'left': 780
            })
            $('.to_robocasa').css({
                'left': 930
            })
        }
    }

    premiumPosition();
    $(window).bind("resize", function () {
        premiumPosition();
    });
    //-----------move from account_files ------------------------------------------
    $(document).on('click', '.show_rename_folder_popup', function () {
        var popup_rename_folder;
        $(this).parents('.panel').children('.hidden_menu_centered.folder_up').hide();
        $('.finder .hidden_menu').hide();

        if (currentTab == 'grid') {
            popup_rename_folder = $('.panel').children('.rename_popup');
            var heightBlock = popup_rename_folder.height() / 2;
            var widthBlock = popup_rename_folder.width() / 2;
            popup_rename_folder.css({
                top: 200,
                left: '50%',
                marginLeft: -widthBlock,
                marginTop: -heightBlock
            });

        } else {
            popup_rename_folder = $('.panel').children('.rename_popup');
        }

        popup_rename_folder.show();
        $('.overlay').css('height', $(document).height()).fadeIn(800);
    });
    //--------------------------------------------------------------------------
    $(document).on('click', '.box_popup_cancel, .close_grid_url', function () {
        $('.box_popup, .popup_new_folder, .rename_popup').hide();
        $('.overlay').fadeOut(1000);
    });
    //--------------------------------------------------------------------------
    $(document).on('click', '.rename_folder', function () {
        $('.box_popup, .popup_new_folder, .rename_popup').hide();
        $('.overlay').fadeOut(1000);
    });
    //--------------------------------------------------------------------------
    $(document).on('click', '.delete_folder', function () {
        $(this).parents('.panel').children('.hidden_menu_centered.folder_up').hide();
        $('.finder .hidden_menu').hide();
        var folder_delete = $('.panel').children('.popup_new_folder.delete_popup.grid_folder');
        var heightWindow = $(document).scrollTop() + $(window).height() / 2;
        var heightBlock = folder_delete.height() / 2;
        var widthBlock = folder_delete.width();
        var marginLeft = widthBlock / 2;
        folder_delete.show();
        folder_delete.css({
            top: heightWindow,
            marginLeft: -marginLeft,
            marginTop: -heightBlock
        });
        $('.overlay').css('height', $(document).height()).fadeIn(800);
    });
    //--------------------------------------------------------------------------
    $(document).on('click', '.delete_no', function () {
        $('.popup_new_folder').fadeOut('slow');
        $('.overlay').fadeOut(1000);
    });
    //--------------------------------------------------------------------------
    $(document).on('click', '.delete_yes', function () {
        $('.popup_new_folder').fadeOut('slow');
        $('.overlay').fadeOut(1000);
    });
    //--------------------------------------------------------------------------
    /*SHARE LINK*/
    $(document).on('click', '.account_file_share_link_show_popup', function () {
        $('.account_file_social_popup').show();
    });

    $(document).on('click', '.account_file_share_link_show_popup', function () {
        $(this).parents('.panel').children('.hidden_menu_centered.file_up').hide();
        var heightWindow = $(document).scrollTop() + $(window).height() / 2;
        var heightBlock = $('.box_popup.account_file_social_popup').height() / 2;
        var widthBlock = $('.box_popup.account_file_social_popup').width();
        var marginLeft = widthBlock / 2;
        $(this).parent().parent().parent().parent().find('.box_popup.account_file_social_popup').show();
        $(this).parent().parent().parent().parent().find('.box_popup.account_file_social_popup').css({
            top: heightWindow,
            marginLeft: -marginLeft,
            marginTop: -heightBlock
        });
        $('.overlay').css('height', $(document).height()).fadeIn(800);
    });

    /*IF DELETE PASSWORD*/
    $(document).on('click', '.delete_password', function () {
        $('.account_file_change_password_popup').hide();
        $('.account_file_delete_password_popup').show();
    });

    $(document).on('click', '.delete_password', function () {
        var heightWindow = $(document).scrollTop() + $(window).height() / 2;
        var heightBlock = $('.box_popup.account_file_delete_password_popup').height() / 2;
        var widthBlock = $('.box_popup.account_file_delete_password_popup').width();
        var marginLeft = widthBlock / 2;
        $(this).parent().parent().parent().parent().find('.account_file_delete_password_popup').css({
            top: heightWindow,
            marginLeft: -marginLeft,
            marginTop: -heightBlock
        });
        $('.overlay').css('height', $(document).height()).fadeIn(800);
    });
    /*COMEBACK from DELETE to PASSWORD*/
    $(document).on('click', '.change_password_a', function () {
        $('.account_file_delete_password_popup').hide();
        $('.account_file_change_password_popup').show();
    });

    $(document).on('click', '.change_password_a', function () {
        var heightWindow = $(document).scrollTop() + $(window).height() / 2;
        var heightBlock = $('.account_file_change_password_popup').height() / 2;
        var widthBlock = $('.account_file_change_password_popup').width();
        var marginLeft = widthBlock / 2;
        $(this).parent().parent().parent().parent().find('.account_file_change_password_popup').css({
            top: heightWindow,
            marginLeft: -marginLeft,
            marginTop: -heightBlock
        });
        $('.overlay').css('height', $(document).height()).fadeIn(800);
    });
    /*DESCRIPTION FILE*/
    $(document).on('click', '.account_file_description_show_popup', function () {
        $('.account_file_description_popup').show();
    });

    $(document).on('click', '.account_file_description_show_popup', function () {

        $(this).parents('.panel').children('.hidden_menu_centered.file_up').hide();

        var heightWindow = $(document).scrollTop() + $(window).height() / 2;
        var heightBlock = $('.box_popup.account_file_description_popup').height() / 2;
        var widthBlock = $('.box_popup.account_file_description_popup').width();
        var marginLeft = widthBlock / 2;
        $(this).parent().parent().parent().parent().find('.box_popup.account_file_description_popup').show();
        $(this).parent().parent().parent().parent().find('.box_popup.account_file_description_popup').css({
            top: heightWindow,
            marginLeft: -marginLeft,
            marginTop: -heightBlock
        });
        $('.overlay').css('height', $(document).height()).fadeIn(800);
    });
    //--------------------------------------------------------------------------
    /*DELETE FILE*/
    $(document).on('click', '.account_file_delete', function () {
        $('.delete_popup_file').show();
    });

    $(document).on('click', '.account_file_delete', function () {
        $(this).parents('.panel').children('.hidden_menu_centered.file_up').hide();
        var heightWindow = $(document).scrollTop() + $(window).height() / 2;
        var heightBlock = $('.delete_popup_file').height() / 2;
        var widthBlock = $('.delete_popup_file').width();
        var marginLeft = widthBlock / 2;
        $(this).parent().parent().parent().parent().find('.delete_popup_file').show();
        $(this).parent().parent().parent().parent().find('.delete_popup_file').css({
            top: heightWindow,
            marginLeft: -marginLeft,
            marginTop: -heightBlock
        });
        $('.overlay').css('height', $(document).height()).fadeIn(800);
    });

    $(document).on('click', '.delete_no', function () {
        $('.box_popup').hide();
        $('.overlay').fadeOut(1000);
        $('.td_1 .relative_t').css({
            'position': 'relative'
        });
    });

    $(document).on('click', '.delete_yes', function () {
        $('.box_popup').hide();
        $('.overlay').fadeOut(1000);
        $('.td_1 .relative_t').css({
            'position': 'relative'
        });
    });

    $(document).on('click', '.account_file_rename_show_popup', function () {
        $('.account_file_rename_popup').show();
    });

    $(document).on('click', '.account_file_rename_show_popup', function () {
        $(this).parents('.panel').children('.hidden_menu_centered.file_up').hide();

        var heightWindow = $(document).scrollTop() + $(window).height() / 2;
        var heightBlock = $('.box_popup.account_file_rename_popup').height() / 2;
        var widthBlock = $('.box_popup.account_file_rename_popup').width();
        var marginLeft = widthBlock / 2;
        $(this).parent().parent().parent().parent().find('.box_popup.account_file_rename_popup').show();
        $(this).parent().parent().parent().parent().find('.box_popup.account_file_rename_popup').css({
            top: heightWindow,
            marginLeft: -marginLeft,
            marginTop: -heightBlock
        });
        $('.overlay').css('height', $(document).height()).fadeIn(800);
    });
    //--------------------------------------------------------------------------------------------------------------
    function changePos1() {
        $('.top_panel').animate({
            'position': 'relative'
        }, 1000);
    }
    $(document).on('click', '.close_download', function () {
        $(this).parent('.popup_new_download').fadeOut(800);
        $('.overlay').fadeOut(1000);
        changePos1();
    });
    //--------------------------------------------------------------------------------------------------------------
    /*MOVED FROM FOLDER.JS*/
    $(document).on('click', '.new_folder a', function () {
        var heightWindow = $(document).scrollTop() + $(window).height() / 2;

        var heightBlock = $('.popup_new_folder.first_panel').height() / 2;
        var widthBlock = $('.popup_new_folder.first_panel').width();
        var marginLeft = widthBlock / 2;
        $(this).parent().parent().parent('.top_panel').css({
            'position': 'static'
        });
        $(this).parent().parent().parent().find('.popup_new_folder.first_panel').fadeIn(1000);
        $('.overlay').css('height', $(document).height()).fadeIn(800);
        $('.popup_new_folder.first_panel').css({
            top: heightWindow,
            marginLeft: -marginLeft,
            marginTop: -heightBlock,
            left: '50%',
            right: '50%',
            marginRight: -marginLeft
        });

    });

    function changePos1() {
        $('.top_panel').animate({
            'position': 'relative'
        }, 1000);
    }

    $(document).on('click', '.close_folder_url', function () { //create_popup_new_folder
        $(this).parent('.popup_new_folder.first_panel').fadeOut(800);
        $('.overlay').fadeOut(1000);
        changePos1();
    });

    $(document).on('click', '.create_popup_new_folder.first_panel', function () {
        $(this).parent('.popup_new_folder.first_panel').fadeOut(800);
        $('.overlay').fadeOut(1000);
        changePos1();
    });

    $(document).on('click', '.show_rename_folder_popup', function () {
        var popup_rename_folder;
        $(this).parent().parent().parent('.context_menu').hide();
        $(this).parent().parent().parent().parent('.grid_unit').css({
            'position': 'static'
        });

        if (currentTab == 'grid') {
            popup_rename_folder = $(this).parents('.grid_unit').find('.rename_popup');
            var heightBlock = popup_rename_folder.height() / 2;
            var widthBlock = popup_rename_folder.width() / 2;
            popup_rename_folder.css({
                top: '50%',
                left: '50%',
                marginLeft: -widthBlock,
                marginTop: -heightBlock
            });

        } else {
            popup_rename_folder = $(this).parents('.table_row').find('.popup_container .rename_popup');
        }

        popup_rename_folder.show();
        $('.overlay').css('height', $(document).height()).fadeIn(800);
    });
    // MOVED FROM UPLOADER.JS
    $('.new_download a').click(function () {
        var heightWindow = $(document).scrollTop() + $(window).height() / 2;

        var heightBlock = $('.popup_new_download').height() / 2;
        var widthBlock = $('.popup_new_download').width();
        var marginLeft = widthBlock / 2;
        $(this).parent().parent().parent('.top_panel').css({
            'position': 'static'
        });
        var $message = $('.popup_new_download');

        if ($message.css('display') != 'block') {
            $message.fadeIn('slow');

            $('.overlay').css('height', $(document).height()).fadeIn(800);
            $message.css({
                top: heightWindow,
                marginLeft: -marginLeft,
                marginTop: -heightBlock,
                left: '50%',
                right: '50%',
                marginRight: -marginLeft
            });
        }
    });

    $(".popup_new_download form input").click(function () {
        $('.popup_new_download').fadeOut('fast');
        $('.overlay').fadeOut(1000);
    });

    /*OLD_BROWSERS*/
    /*FADE IN*/
    $('.overlay.open_view').css('height', $(document).height()).fadeIn(800);
    /*FADE OUT*/
    $('.close_old').click(function () {
        $(this).parents('.old_browser').fadeOut(100);
        $('.overlay.open_view').removeClass('open_view');
    });

});

//==================================================================================================================
function draw_account_menu_info() {
        jQuery.ajax({
            type: 'POST',
            url: 'http://' + location.host + '/account/profile/get_info/',
            dataType: 'json',
            success: function (data) {
                $('.user_name p').text(data.username);
                $('.uploaded p span').text(data.count);
                $('.filled p span').text(data.file_size_sum);
                $('.empty p span').text(data.file_size_lim);
                $('.index_file_size_lim').text(data.file_size_lim);
                uploads_size_lim = data.uploads_size_lim;

            }
        })
}
//==================================================================================================================
function init_rclick() {
    /*RIGHT CLICK*/
    $('.finder ul li .files').bind('contextmenu', function (e) {
        e.preventDefault();
        $('.hidden_menu').hide();
        $('.hidden_menu_centered').hide();
        $(this).parents('.finder').children('.hidden_menu').toggle();
        var yClick = e.pageY - $(this).parents('.finder').offset().top;
        var xClick = e.pageX - $(this).parents('.finder').offset().left;
        $('.hidden_menu').css({
            top: yClick + 65,
            left: xClick + 30
        });
    });

    $('.finder ').bind('contextmenu', function (e) {});
    /*Hiding by click on hidden_menu's item*/
    $('.hidden_menu ul li .files').click(function () {
        $('.hidden_menu').hide();
    });
    /*RIGHT CLICK in CENTRAL AREA GRID*/
    $('.grid_unit.folder_show ').bind('contextmenu', function (e) {
        e.preventDefault();
        $('.hidden_menu').hide();
        $('.description').hide();
        var popup_menu = $(this).parents('.panel').children('.hidden_menu_centered.folder_up');
        popup_menu.hide();
        popup_menu.toggle();
        var yClick = e.pageY - $(this).parents('.panel').offset().top;
        var xClick = e.pageX - $(this).parents('.panel').offset().left;
        var widthPanel = $(this).parents('.panel').width();

        popup_menu.css({
            top: yClick + 15
        })
        var division = xClick / widthPanel;

        if ((division >= 0) && (division <= 0.33)) {
            popup_menu.css({
                left: 25 + '%'
            })
        } else if ((division >= 0.34) && (division <= 0.66)) {
            popup_menu.css({
                left: 50 + '%'
            })
        } else if ((division >= 0.67) && (division <= 1)) {
            popup_menu.css({
                left: 75 + '%'
            })
        }
        if (popup_menu.css('display') == 'block') {
            var timer = setTimeout(function () {
                popup_menu.fadeOut(500)
            }, 2000);
        }
        $('.grid_unit.folder_show').mouseover(function () {
            popup_menu.fadeOut(0).stop();
            clearTimeout(timer);
        });
        popup_menu.mouseover(function () {
            clearTimeout(timer);
        });
        popup_menu.mouseleave(function () {
            setTimeout(function () {
                popup_menu.fadeOut()

            }, 1000);

        });
    });

$('.td_1.folder_call').bind('contextmenu', function (e) {
    e.preventDefault();

    $('.hidden_menu').hide();
    $('.description.table').hide();
    var popup_menu = $(this).parents('.panel').children('.hidden_menu_centered.folder_up');
    popup_menu.hide();
    popup_menu.show()
    var yClick = e.pageY - $(this).parents('.panel').offset().top;
    var xClick = e.pageX - $(this).parents('.panel').offset().left;

    var heightPanel = $(this).parents('.panel').height();


    popup_menu.css({
        top: yClick,
        left: xClick + 240
    })

    var diff_top = heightPanel - yClick;

    if (diff_top >= 200) {
        popup_menu.css({
            top: yClick,
            left: xClick + 240
        })
    } else if (diff_top < 200) {
        popup_menu.css({
            top: yClick - 70,
            left: xClick + 240
        })
    }
    if (popup_menu.css('display') == 'block') {
        var timer = setTimeout(function () {
            popup_menu.fadeOut(500)
        }, 2000);
    }
    $('.td_1.file_call, .td_1.folder_call ').mouseover(function () {
        popup_menu.fadeOut(0).stop();
        clearTimeout(timer);

    });
    popup_menu.mouseover(function () {
        clearTimeout(timer);
    });
    popup_menu.mouseleave(function () {
        setTimeout(function () {
            popup_menu.hide()

        }, 1000);

    });

});
$('.grid_unit.file_show').bind('contextmenu', function (e) {
    e.preventDefault();

    $('.hidden_menu').hide();
    $('.description.table').hide();
    var popup_menu_file = $(this).parents('.panel').children('.hidden_menu_centered.file_up');
    popup_menu_file.hide();
    popup_menu_file.show();
    var yClick = e.pageY - $(this).parents('.panel').offset().top;
    var xClick = e.pageX - $(this).parents('.panel').offset().left;
    var widthPanel = $(this).parents('.panel').width();

    popup_menu_file.css({
        top: yClick + 15

    });
    var division = xClick / widthPanel;

    if ((division >= 0) && (division <= 0.33)) {
        popup_menu_file.css({
            left: 25 + '%'
        })
    } else if ((division >= 0.34) && (division <= 0.66)) {
        popup_menu_file.css({
            left: 50 + '%'
        })
    } else if ((division >= 0.67) && (division <= 1)) {
        popup_menu_file.css({
            left: 75 + '%'
        })
    }
    if (popup_menu_file.css('display') == 'block') {
        var timer = setTimeout(function () {
            popup_menu_file.fadeOut(500)
        }, 3500);
    }
    $('.grid_unit').mouseover(function () {
        popup_menu_file.fadeOut(0).stop();
        clearTimeout(timer);
    });
    popup_menu_file.mouseover(function () {
        clearTimeout(timer);
    });
    popup_menu_file.mouseleave(function () {
        setTimeout(function () {
            popup_menu_file.hide()

        }, 1000);

    });
});


$('.td_1.file_call').bind('contextmenu', function (e) {
    e.preventDefault();
        // $('.hidden_menu').hide();
        $('.description.table').hide();
        var popup_menu = $(this).parents('.panel').children('.hidden_menu_centered.file_up');

        popup_menu.hide();

        popup_menu.show();

        var yClick = e.pageY - $(this).parents('.panel').offset().top;
        var xClick = e.pageX - $(this).parents('.panel').offset().left;

        var heightPanel = $(this).parents('.panel').height();


        popup_menu.css({
            top: yClick,
            left: xClick + 240
        })

        var diff_top = heightPanel - yClick;

        if (diff_top >= 200) {
            popup_menu.css({
                top: yClick,
                left: xClick + 240
            })
        } else if (diff_top < 200) {
            popup_menu.css({
                top: yClick - 160,
                left: xClick + 240
            })
        }

        if (popup_menu.css('display') == 'block') {
            var timer = setTimeout(function () {
                popup_menu.fadeOut(500)
            }, 3500);
        }
        $('.td_1.file_call, .td_1.folder_call ').mouseover(function () {
            popup_menu.fadeOut(0).stop();
            clearTimeout(timer);

        });
        popup_menu.mouseover(function () {
            clearTimeout(timer);
        });
        popup_menu.mouseleave(function () {
            setTimeout(function () {
                popup_menu.hide()

            }, 1000);

        });
    });



/*Hiding by click on hidden_menu's item*/
$('.hidden_menu_centered ul li a').click(function () {
    $('.hidden_menu_centered').hide();

});
/*Hiding by click on outside of hidden_menu*/
$('body').click(function () {
    $('.hidden_menu_centered').hide();

});
};

function close_popup(popup) {
    popup.hide();
    $('.overlay').fadeOut(1000);
}
/*SET PASSWORD*/
function set_file_password(popup) {
    $('.account_file_set_password_popup').show();
    $(popup).parents('.panel').children('.hidden_menu_centered.file_up').hide();
    var heightWindow = $(document).scrollTop() + $(window).height() / 2;
    var heightBlock = $('.box_popup.account_file_set_password_popup').height() / 2;
    var widthBlock = $('.box_popup.account_file_set_password_popup').width();
    var marginLeft = widthBlock / 2;
    $(popup).parent().parent().parent().parent().find('.box_popup.account_file_set_password_popup').show();
    $(popup).parent().parent().parent().parent().find('.box_popup.account_file_set_password_popup').css({
        top: heightWindow,
        marginLeft: -marginLeft,
        marginTop: -heightBlock
    });
    $('.overlay').css('height', $(document).height()).fadeIn(800);
}
/*IF PASSWORD EXISTS*/
function change_file_password(popup) {
    $('.account_file_change_password_popup').show();
    $(popup).parents('.panel').children('.hidden_menu_centered.file_up').hide();
    var heightWindow = $(document).scrollTop() + $(window).height() / 2;
    var heightBlock = $('.box_popup.account_file_change_password_popup').height() / 2;
    var widthBlock = $('.box_popup.account_file_change_password_popup').width();
    var marginLeft = widthBlock / 2;
    $(popup).parent().parent().parent().parent().find('.account_file_change_password_popup').show();
    $(popup).parent().parent().parent().parent().find('.account_file_change_password_popup').css({
        top: heightWindow,
        marginLeft: -marginLeft,
        marginTop: -heightBlock
    });
    $('.overlay').css('height', $(document).height()).fadeIn(800);
}
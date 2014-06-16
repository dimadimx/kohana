var do_editing = false;
var do_hint_show = '';

jQuery(document).ready(function(){
    //===============================================================================================
    //--- seopages
    $(document).on('click', 'tr.seo_edit_pages td div, .dic_seopage .user_file #button_new_page', function () {
        var pid = 0;
        if ($(this).attr('id') != 'button_new_page') pid = $(this).attr('id').substr(7);
        jQuery.ajax({
            type: 'POST',
            url: 'http://' + location.host + '/secret/seopages/get_info_page',
            data: {'pid': pid},
            dataType: 'html',
            success: function (data) {
                $('.pagedit').html(data);
            }
        })

        $('.pagedit').fadeIn();
    })
    //--- catalogue
    $(document).on('click', 'tr.dic_edit_catalogs td.edit_area .edit_value', function () {
        var fid = $(this).attr('id').substr(7);
        location = 'http://' + location.host + '/secret/dicinfopages/cat/'+fid;
    })
    //===============================================================================================
    //--- pages
    $(document).on('click', 'tr.dic_edit_catalogs td.popup_area #submit_button', function () {

        var fid = $(this).parent('td').find('.edit_value').attr('id').substr(7);
        var new_value = $(this).parent('td').find('input').val();
        jQuery.ajax({
            type: 'POST',
            url: 'http://' + location.host + '/secret/dicinfopages/set_info_cat',
            data: {'id': fid, 'value': new_value},
            dataType: 'html',
            success: function (data) {
            }
        })
    })

    $(document).on('click', 'tr.dic_edit_pages td div, .dic_infopage .user_file #button_new_page', function () {

        var pid = 0;
        var cat = $('tr.dic_edit_catalogs td.edit_area div.sel_row');
        var cid = 0;

        if ($(this).attr('id') != 'button_new_page') pid = $(this).attr('id').substr(7);
        if ($(cat).length) cid = $(cat).attr('id').substr(7);

        jQuery.ajax({
            type: 'POST',
            url: 'http://' + location.host + '/secret/dicinfopages/get_info_page',
            data: {'pid': pid,'cid':cid},
            dataType: 'html',
            success: function (data) {
                $('.pagedit').html(data);
            }
        })

        $('.pagedit').fadeIn();
    })

    $(document).on('click', '.pagedit td input#button_cancel', function () {
        $('.pagedit').fadeOut();
    })

    $(document).on('click', '.pagedit td input#button_new_page', function () {
        $('.pagedit').fadeOut();
    })
    //===============================================================================================
    //---- premium
    $(document).on('click', 'tr.dic_edit_moneytime td.popup_area.db_field_value #submit_button', function () {

        var fid = $(this).parent('td').find('.edit_value').attr('id').substr(7);
        var new_value = $(this).parent('td').find('input').val();
        jQuery.ajax({
            type: 'POST',
            url: 'http://' + location.host + '/secret/dicpremium/set_dic_time',
            data: {'id': fid, 'value': new_value},
            dataType: 'html',
            success: function (data) {
            }
        })
    })

    $(document).on('click', 'tr.dic_edit_moneytime td.popup_area.db_field_mspeed #submit_button', function () {

        var fid = $(this).parent('td').find('.edit_value').attr('id').substr(7);
        var new_value = $(this).parent('td').find('input').val();
        jQuery.ajax({
            type: 'POST',
            url: 'http://' + location.host + '/secret/dicpremium/set_dic_mspeed',
            data: {'id': fid, 'value': new_value},
            dataType: 'html',
            success: function (data) {
            }
        })
    })
    //======== popup dic functions ==================================================================
    $(document).on('mouseenter', '.popup_area', function () {
        if (!do_editing){
            $(this).append('<img id="edit_button" class="buttons_box">');
            $(this).find('#edit_button').fadeTo(500,0.5);
        }
    })

    $(document).on('mouseleave', '.popup_area', function () {
        if (!do_editing){
            do_hint_show = '';
            $(this).find('#edit_button').remove();
            $('div.ttb').fadeOut;
        }
    })

    $(document).on('mouseenter', 'img.buttons_box', function () {
        if(do_hint_show==''){
            var text_hint;
            var pos_x = $(this).position().left;
            var pos_y = $(this).position().top-25;

            if ($(this).attr('id')=='edit_button'){
                text_hint = 'Редактировать';
            }

            if ($(this).attr('id')=='submit_button'){
                text_hint = 'Сохранить';
            }

            if ($(this).attr('id')=='cancel_button'){
                text_hint = 'Отмена';
            }

            $(this).fadeTo(100,1);
            do_hint_show = $(this).parent('td').find('.edit_value').attr('id').substr(7);
            setTimeout('show_hint('+do_hint_show+','+pos_x+','+pos_y+',"'+text_hint+'")', 200);
        }
    })

    $(document).on('mouseleave', 'img.buttons_box', function () {
            do_hint_show = '';
            $(this).fadeTo(100,0.5);
            $('div.ttb').fadeOut();
    })



    $(document).on('click', '#edit_button', function () {
        if (!do_editing){
            var parent_el = $(this).parent('td');
            var val_money;

            val_money = parent_el.find('.edit_value').html();
            parent_el.find('.edit_value').hide();
            parent_el.find('#edit_button').remove();
            parent_el.append('<input>');
            parent_el.append('<img id="submit_button" class="buttons_box">');
            parent_el.append('<img id="cancel_button" class="buttons_box">');
            parent_el.find('input').val(val_money);
            $('div.ttb').fadeOut();
            do_editing = true;
        }
    })

    $(document).on('click', '#cancel_button', function () {
        if (do_editing){
            var parent_el = $(this).parent('td');
            parent_el.find('input').remove();
            parent_el.find('.edit_value').show();
            parent_el.find('#submit_button').remove();
            parent_el.find('#cancel_button').remove();
            $('div.ttb').fadeOut();
            do_editing = false;
        }
    })


    $(document).on('click', '#submit_button', function () {
        if (do_editing){
            var parent_el = $(this).parent('td');
            var val_money = parent_el.find('input').val();
            parent_el.find('.edit_value').html(val_money);
            parent_el.find('input').remove();
            parent_el.find('.edit_value').show();
            parent_el.find('#submit_button').remove();
            parent_el.find('#cancel_button').remove();
            $('div.ttb').fadeOut();
            do_editing = false;
        }
    })





})

function show_hint(obj_call,pos_x,pos_y,text){
    if (do_hint_show == obj_call){
        do_hint_show = '';
        $('div.ttb').hide();
        $('div.ttb').css({
            left:pos_x,
            top:pos_y
        });
        $('.tt_text').html(text);
        $('div.ttb').fadeIn();
    }
}

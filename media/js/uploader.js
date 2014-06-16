$(document).ready(function () {

    (function (d, w, c) {
        (w[c] = w[c] || []).push(function() {
            try {
                w.yaCounter20889169 = new Ya.Metrika({id:20889169,
                    webvisor:true,
                    clickmap:true,
                    trackLinks:true,
                    accurateTrackBounce:true});
            } catch(e) { }
        });

        var n = d.getElementsByTagName("script")[0],
            s = d.createElement("script"),
            f = function () { n.parentNode.insertBefore(s, n); };
        s.type = "text/javascript";
        s.async = true;
        s.src = (d.location.protocol == "https:" ? "https:" : "http:") + "//mc.yandex.ru/metrika/watch.js";

        if (w.opera == "[object Opera]") {
            d.addEventListener("DOMContentLoaded", f, false);
        } else { f(); }
    })(document, window, "yandex_metrika_callbacks");


    function _formatFileSize(bytes) {
        if (typeof bytes !== 'number') {
            return '';
        }
        if (bytes >= 1000000000) {
            return (bytes / 1000000000).toFixed(2) + ' GB';
        }
        if (bytes >= 1000000) {
            return (bytes / 1000000).toFixed(2) + ' MB';
        }
        return (bytes / 1000).toFixed(2) + ' KB';
    }

    function _formatTime(seconds) {
        var date = new Date(seconds * 1000),
            days = Math.floor(seconds / 86400);
        days = days ? days + 'd ' : '';
        return days +
            ('0' + date.getUTCHours()).slice(-2) + ':' +
            ('0' + date.getUTCMinutes()).slice(-2) + ':' +
            ('0' + date.getUTCSeconds()).slice(-2);
    }

    $(function () {
        $('#fileupload').fileupload({
			maxChunkSize: 10000000, // 10 MB
            dataType: 'json',
            singleFileUploads: 'false',
            add: function (e, data) {
                doS();
                var html = '';
                yaCounter20889169.reachGoal('PUSHVIBRAT');
                $.each(data.files, function (index, file) {
                     uploads_size_count += file.size;

                    jQuery.ajax({
                        type: 'POST',
                        url: 'http://' + location.host + '/check_file_limit/',
                        dataType: 'html',
                        async: false,
                        success: function (result) {
                            file_size_lim = result;
                        }
                    })
                    // end ajax check_file_limit
                    if (file.size > file_size_lim || file.size > uploads_size_lim || uploads_size_count > file_size_lim) {
                        $('.top_content.upload').css('display', 'none');
                        $('.top_content.uploading_error').css('display', 'block');
                    } else {
                        jQuery.ajax({
                            type: 'POST',
                            url: 'http://' + location.host + '/get_upload_file/',
                            data: {'name': file.name, 'counter': data.fileCounter},
                            dataType: 'html',
                            success: function (result) {
                                $('.add_uploaded_file').after(result);

                                //set file password
                                function passwordInput() {
                                    $('.a_set_password').each(function () {
                                        $(this).click(function () {
                                            $(this).hide();
                                            $(this).next('.set_password input').show();
                                            $(this).next('.set_password input').focus();
                                        });
                                    });
                                }

                                passwordInput();
                                $(window).bind("change", function () {
                                    passwordInput();
                                });

                                //   delete file
                                //ToDo: Fix this
                                $('.cancel').on('click', function () {
                                    var f_name = $(this).next('span').text();
                                    $(this).parent().parent().parent().remove();

                                    $.each(data.files, function (i, f) {
                                        if (f.name == f_name) {
                                            data.files.splice(i, 1);
                                        }
                                    });

                                    var length = $('.top_content.upload').find('.file_choose').length;
                                    if (length == 0) {
                                        $('.btn_uploaded_file').css('display', 'none');
                                    }
                                });

                            }
                        })
                    }
                    // end check_file_limit
                });
                // end $.each(data.files, function (index, file)

                $('#fileSubmit').on('click', function (e) {
                    e.preventDefault();
                    yaCounter20889169.reachGoal('PUSHZAGRUZIT');
                    var password = $('#password'+data.fileCounter).val();
						$.ajax({
							type: 'POST',
							url: 'http://' + location.host + '/validate_file_password/',
							data: {'password': password},
							dataType: 'json',
							success: function (result) {
								if(result.response == 'ok') {
									data.submit();
								} else {
									$('#incorrect_pass'+data.fileCounter+' p').html(result.response);
								}
							}
						})

                });
                // end $('#fileSubmit').on('click', function (e) {
                $('.btn_cancel_file').on('click', function () {
                    data.abort();
                    data.result = false;
                    $.each(data.files, function (index) {
                        data.files.splice(index);
                    });
                    $('.file_choose').remove();
                    $('.top_content.uploading_process').css('display', 'none');
                    $('.top_content.upload').css('display', 'block');
                    $('.btn_uploaded_file').css('display', 'none');

                });
                // end  $('.btn_cancel_file').on('click', function () {

            },
            // end add
            progressall: function (e, data) {

                $('.top_content.uploading_process').css('display', 'block');
                $('.top_content.upload').css('display', 'none');

                var progress = parseInt(data.loaded / data.total * 100, 10);
                $('#progressbar').find('.ui-progressbar-value.ui-widget-header.ui-corner-left.ui-corner-right').css(
                    'width',
                    progress + '%'
                );
                $('.ui-progressbar-value.ui-widget-header.ui-corner-left.ui-corner-right span').html(progress + '%');

                $('.time_countdown p span').html(_formatTime((data.total - data.loaded) * 8 / data.bitrate));

                $('.traffic_count #load').html(_formatFileSize(data.loaded));
                $('.traffic_count #total').html(_formatFileSize(data.total));
            },
            // end progress all
            always: function (e, data) {
                var truth = '';
                var sFilesID = '';
                if (data.result) {
                    $.each(data.result, function (index, res) {

                        truth = res[0].error

                        if (typeof res[0].error != 'undefined') {
                            $('.top_content.uploading_process').css('display', 'none');
                            $('.top_content.uploading_error').css('display', 'block');
                            $('.uploading_error span').html(res[0].error);
                            exit();
                        }
                    });
                }
                if (data.result) {
                    if (truth != 'abort') {
                        $.each(data.result, function (indexs, files) {
                            $.each(files, function (index, file) {
                                sFilesID = sFilesID + ',' + file.name;
                            });
                        });
                    }
                }

                $('#filesId').val(sFilesID);
                $('#form_file_upload').submit();

//                if (data.result) {
//                    if (truth != 'abort') {
//                        $('.top_content.uploading_process').remove();
//                        $('.input_choose').remove()
//                        $('.top_content.uploading_done').css('display', 'block');

//                        $.each(data.result, function (indexs, files) {
//                            $.each(files, function (index, file) {
//                                jQuery.ajax({
//                                    type: 'POST',
//                                    url: 'http://' + location.host + '/get_unit_file/',
//                                    data: {'id': file.name},
//                                    dataType: 'html',
//                                    success: function (result) {
////                                        draw_account_menu_info();
//                                        $('.wrap_uploaded_unit').append(result);
//
//										//	copy file url's
//										$('.copy_file_url').each(function () {
//											ZeroClipboard.setDefaults( { moviePath: 'http://'+location.host+'/media/js/ZeroClipboard.swf' } );
//											var clip1 = new ZeroClipboard($('.copy_file_url'));
//											var clip2 = new ZeroClipboard($('.copy_file_forum'));
//											var clip3 = new ZeroClipboard($('.copy_file_blog'));
//											var clip4 = new ZeroClipboard($('.copy_file_delete'));
//										});
//
//                                        $('#file_' + file.name).click(function () {
//                                            var email = $('#email_input_' + file.name).val();
//                                            if (email) {
//                                                send_mail(email, file.name);
//                                            }
//                                        });
//                                    }
//                                })
//                            });
//                        });
                        // end each result
//                    }
//                }
            }
            //end always
        });
        //end $('.file upload')
    });
});
function send_mail(email, id) {
    $.ajax({
        type: 'POST',
        url: 'http://' + location.host + '/file_link/',
        data: {'id': id, 'email': email},
        dataType: 'html',
        success: function (result) {
            if (result == 'false') {
                $('#result_' + id).html('Не верный формат <b>email</b>!');
            }
            if (result == 'ok') {
                $('#result_' + id).html('Ссылка успешно <b>отправлена</b>!');
            }
            if (result == 'not-send') {
                $('#result_' + id).html('<b>Проблема</b> с отправкой почты!');
            }
            if (result == 'limit') {
                $('#result_' + id).html('<span style="color:red;">За один раз вы можете отправить ссылку не более чем на 5 электронных адресов!</span>');
            }
        }
    })
}

function doS() {
    $('.p_upload').css('display', 'none');
    $('.top_content.upload').css('display', 'block');

    $('.input_choose').css({
        "width": "234px",
        "height": "34px",
        "position": "absolute",
        "left": "-395px",
        "top": "10px",
        "opacity": "0"
    });
    $('#form_file_upload').addClass('upload_step');
    $('#fileupload').css({
        "width": "210px"
    });
    $('#fileInputText').css({
        "width": "210px"
    });

    $('.mask').css({
        "width": "235px"
    });

    $('.left_add_uploaded_file.mask').css({
        "background": "url('media/img/input_file.png') no-repeat 0 0"
    });
}

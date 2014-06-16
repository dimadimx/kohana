$(function () {
    'use strict';

    $('#fileupload').fileupload({
//		maxChunkSize: 10000000, // 10 MB
        url: '/upload/',
        filesContainer: '.fileupload-buttonbar'
    });

    $('#fileupload').fileupload('option', {
        maxFileSize: 359000000,
        acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i,
        process: [
            {
                action: 'load',
                fileTypes: /^image\/(gif|jpeg|png)$/,
                maxFileSize: 359000000 // 20MB
            },
            {
                action: 'save'
            }
        ]
    });
});

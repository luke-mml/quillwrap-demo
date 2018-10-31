// just for the demo
define(function (require) {
    var quillWrap = require('quillwrap.min');


    $(document).ready(function () {
        quillWrap.autoinit();

        $('#showHiddenContent').click(function () {
            quillWrap.flushAll();
            var $hiddenTextArea = $('#test');
            var q = $hiddenTextArea.data('editor');
            var ht = $hiddenTextArea.val();
            $('#testContent').html(ht);

            var $hiddenTextArea = $('#test2');
            var ht = $hiddenTextArea.val();
            $('#test2Content').html(ht);
        });

        $('#flushAll').click(function () {
            quillWrap.flushAll();
        });
    });

});
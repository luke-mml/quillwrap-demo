requirejs.config({
    baseUrl: 'lib',
    paths: {
        app: '../app',
        quillwrap: '../../quillwrap',
        quill: '//cdn.quilljs.com/1.3.6/quill.min',
        jquery: 'jquery'// 'https://code.jquery.com/jquery-3.3.1.min'
    }
});

requirejs(['app/main']);
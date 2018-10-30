requirejs.config({
    baseUrl: 'lib',
    paths: {
        app: '../app',
        tashwax: '../../tashwax',
        mustache: 'https://cdnjs.cloudflare.com/ajax/libs/mustache.js/3.0.0/mustache',
        jquery: 'https://code.jquery.com/jquery-3.3.1.min'
    }
});

requirejs(['app/main']);
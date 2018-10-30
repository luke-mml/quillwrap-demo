define(['jquery', 'mustache'], function ($, Mustache) {

    var tashwax = {
        urlBase: '', // base url for templates 
        loadQueue: [], // templates to load
        loader: '<span class="spinner">Loading</span>',
        templateCache: {}, // cache of loaded templates 
        setUrlBase: function (url) {
            this.urlBase = url;
            return this; // for chaining
        },
        /**
         * Load a template; If the template has already been loaded (and is in
         * the memory cache) make the callback immediately. Otherwise, wait until
         * until the template is loaded.
         * 
         * @param {type} src
         * @param {type} callback
         * @returns {undefined}
         */
        loadTemplate: function (src, callback) {
            // if we have already loaded a template, use it
            if (this.templateCache[src]) {
                callback(this.templateCache[src], src);
            } else {
                // otherwise load if 
                var me = this;
                if (!this.inLoadQueue(src)) {
                    this.loadQueue.push({src: src, callback: callback});
                    var url = this.urlBase + src;
                    $.get(url, {src: src}, function (template, textStatus, jqXhr) {
                        me.templateCache[src] = template;
                        me.callQueue(src, template);
                    });
                } else {
                    // waiting for the template
                    setTimeout(function () {
                        me.loadTemplate(src, callback);
                    }, 2000);
                }
            }
            return this;
        },
        /**
         * Load a template and render the result into an element
         * 
         * @param {type} src
         * @param {type} data
         * @param {type} $target
         * @returns {undefined}
         */
        loadAndRender: function (src, data, $target) {
            $target.html(this.loader);
            this.loadTemplate(src, function (tpl) {
                $target.html(Mustache.render(tpl, data));
            });
        },
        /**
         * Chekc if the template (src) is in the queue
         * @param {type} src
         * @returns {Boolean}
         */
        inLoadQueue: function (src) {
            var i, mx = this.loadQueue.length;
            for (i = 0; i < mx; i++) {
                if (this.loadQueue[i].src === src) {
                    return true;
                }
            }
        },
        /**
         * Template for specific src has loaded... so make callbacks for anything
         * in the queue waiting for that template (and removed them)
         * 
         * @param {type} src
         * @param {type} template
         * @returns {undefined}
         */
        callQueue: function (src, template) {
            var i, mx = this.loadQueue.length, newQ = [];
            for (i = 0; i < mx; i++) {
                if (this.loadQueue[i].src === src) {
                    this.loadQueue[i].callback(template, src);
                } else {
                    newQ.push(this.loadQueue[i]);
                }
            }
            this.loadQueue = newQ;
        }
    };
    return tashwax;
});

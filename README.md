Tashwax
========
Helper module for using Mustache templates

Example use:

`tash.loadAndRender('./templates/template.html', data, $('#test'));`

This will load a template from /templates/template.html, and render this to html 
using the data object, inserting the result in the element #test;

Example use:

`tash.loadTemplate('./templates/template.html', function(tpl, src){
    $target.html(Mustache.render(tpl, data));
 });`

This will load a template from /templates/template.html. A callback function will
then use Mustache to render the result into the target element

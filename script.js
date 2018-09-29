$(document).ready(()=>{
    'use strict';
    $('div#scene').gal({
        'mouseOut': {
            'opacity': 0.1
        },
        'imagesDir': 'img/gallery/',
        'nrOfImgs': 6
    });
});
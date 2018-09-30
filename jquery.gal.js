function isOverTheList(e, galList) {
    'use strict';
    return e.pageX >= galList.offset().left + parseInt(galList.css('padding-left'), 10) &&
        e.pageX <= galList.offset().left + parseInt(galList.css('width'), 10) + parseInt(galList.css('padding-left'), 10) &&
        e.pageY >= galList.offset().top && e.pageY <= galList.offset().top + parseInt(galList.css('height'), 10);
}

(function ($) {
    'use strict';

    $.fn.gal = function (options) {


        let opt = {},
            galScene = this,
            $imgIt = null,
            open = null;

        libs.deepExt.apply(opt, [$.fn.gal.defaults]);
        libs.deepExt.apply(opt, [options]);
        sessionStorage.removeItem('imgList');


        for (let i = 0; i < options.nrOfImgs; i++) {

            $imgIt = $('<img />');

            $imgIt.attr('src', options.imagesDir + '0' + (i + 1) + '.jpg');
            this.append($imgIt);
            $imgIt = null;


        }

        this.children('img').wrap('<div></div>');



        this.addClass('gal_scene');
        this.find('div>img').addClass('gal_img');

        let galClose = $('<img />').attr({
                'src': 'img/gal_close.png',
                'width': '25px'
            }).data({
                'gal_close': true
            }).addClass('gal_close'),
            galLeft = $('<img />').attr({
                'src': 'img/gal_left.png',
                'width': '30px',
                'class': 'gal_left'
            }),
            galRight = $('<img />').attr({
                'src': 'img/gal_right.png',
                'width': '30px',
                'class': 'gal_right'
            }),
            galButtons = $('div.gal_scene').find('div'),
            galList = $('ul#gal_list'),
            galEnlargedTop = $('<div class="gal_topEnlarged"></div>').on('mousedown', function (e) {


                $(this).data('msdown', true).data('position', {
                    'X': e.pageX,
                    'Y': e.pageY
                });
            }).on('mouseup', function (e) { /* when left mouse button is released, remove drag state */
                $(this).data('msdown', false);

                if (isOverTheList(e, galList)) {
                    let imgName = $(this).parent().find('.gal_img').attr('src'),
                        li = $('<li></li>');
                    let button = $('<button class="gal_button"/>').on('click', function () {
                        $(this).parent().animate({
                            'opacity': '0',
                            'width': '0px'
                        }, 500, function () {
                            libs.removeFromLocalStorage('imgList', $(this).index());
                            $(this).remove();
                        });
                    });
                    button.html('remove');
                    li.html(imgName);
                    let $img = $('<img />').attr('src', imgName);
                    $img.attr('width', '80px');
                    li.append($img);
                    li.append(button);
                    galList.append(li);
                    libs.addToSessionStorage('imgList', imgName);




                    $('.gal_enlarged').css({
                        'background-color': 'transparent'
                    }).animate({
                        'left': galList.offset().left + 'px',
                        'top': galList.offset().top + 'px',
                        'width': galList.css('width')

                    }, () => {
                        galClose.trigger('click');
                    });

                }

            });

        $('body').on('mousemove', (e) => { /* if element is in drag state follow by mouse pointer*/

            if (galEnlargedTop.data('msdown')) {

                let dX = e.pageX - galEnlargedTop.data('position').X,
                    dY = e.pageY - galEnlargedTop.data('position').Y;
                galEnlargedTop.data('position', {
                    'X': e.pageX,
                    'Y': e.pageY
                });

                $('.gal_enlarged').css({
                    'left': '+=' + dX,
                    'top': '+=' + dY
                });


                if (e.pageY > window.innerHeight - 50) {
                    console.dir(galList[0]);
                    galList[0].scrollIntoView({
                        behavior: 'smooth'
                    });

                }

            }




            e.stopPropagation();
            e.bubbles = false;

        });


        let nrOfButtons = galButtons.length,
            width = parseInt(galScene.css('width'), 10),
            widthButton = (nrOfButtons > 5) ? 140 : parseInt(width / nrOfButtons, 10) - 10;

        $('img.gal_img').css({
            'opacity': opt.mouseOut.opacity
        });
        open = false;


        galButtons.children('img').css({
            'width': `${widthButton - 10}px`
        }).on('mouseover', function () {

            $(this).animate({
                'opacity': 1
            }, 500);

        }).on('mouseout', function () {

            $(this).animate({
                'opacity': opt.mouseoutOpacity
            }, 500);
        });


        galButtons.addClass('gal_button').css({
            'width': widthButton

        }).on('click', function () { /* enlarge image */
            if (open) {
                return;
            }

            open = true;
            let self = $(this);
            let html = $(this).html();

            $(this).fadeTo(500, 0.3).clone().empty().css({
                'width': '0px',
                'height': '0px',
                'background-color': opt.openProp['background-color'],
                'left': parseInt(galScene.css('width'), 10) / 2 - 6 + 'px'
            }).appendTo(galScene).addClass('gal_enlarged').addClass('gal_clearfix').animate({
                'width': '400px',
                'height': '240px',
                'left': `50px`,
                'top': `${window.pageYOffset+30}px`

            }, opt.openProp.speed, function () {

                $(this).html(html).fadeTo(0, 0).fadeTo(500, 1, function () {
                    let $img = $(this).find('.gal_img');
                    $img.data('scale', '1');
                    $img.data('left', '0');
                    $img.data('top', '0');
                    $(this).css({
                        'background-color': 'transparent'
                    }).children('img.gal_img').wrap('<div class="gal_imgWrapper"></div>').css({
                        'opacity': 1
                    }).on('click', (e) => {
                        $img.css({
                            cursor: 'zoom-in'
                        });
                        let scale = parseInt($img.data('scale'));
                        let left = parseInt($img.data('left'));
                        let top = parseInt($img.data('top'));

                        scale = scale * 1.5;
                        let clientX = e.clientX;
                        let clientY = e.clientY;

                        if (clientX < 40) {

                            left += 10;
                            $img.data('left', left);

                            $img.css({
                                transform: `translate(${left}px,${top}px)`,
                                transition: 'all .2s ease-in'
                            });
                            return;
                        }

                        if (clientY < 80) {

                            top += 10;
                            $img.data('top', top);

                            $img.css({
                                transform: `translate(${left}px,${top}px)`,
                                transition: 'all .2s ease-in'
                            });
                            return;
                        }

                        if (scale > 5) {
                            scale = 5;
                        }

                        $img.data('scale', scale * 1.5);

                        $img.css({
                            transform: `scale(${scale}) translate(${-clientX*0.2}px,${-clientY*0.2}px)`,
                            transition: 'all .5s ease-in'
                        });
                    }).on('contextmenu', (e) => {
                        $img.css({
                            cursor: 'zoom-out'
                        });
                        let scale = parseInt($img.data('scale')) * 0.67;
                        if (scale < 1) {
                            scale = 1;
                        }
                        $img.data('scale', scale);
                        $img.css({
                            transform: `scale(${scale})`
                        });
                        e.preventDefault();
                    });


                }).prepend(galEnlargedTop).prepend(galLeft).on('click', function (e) { /* change to left image*/


                    if (!$(e.target).hasClass('gal_left')) {
                        return;
                    }


                    let prev = self.prev();
                    if (prev === self) {
                        return;
                    }
                    let newImg = prev.children('img').attr('src');

                    if (newImg !== undefined) {
                        $(this).find('img.gal_img').attr('src', newImg);
                        self = prev;

                    }
                }).prepend(galRight).on('click', function (e) { /* change to right image */

                    if (!$(e.target).hasClass('gal_right')) {
                        return;
                    }

                    let nxt = self.next();
                    if (nxt.hasClass('gal_enlarged')) {
                        return;
                    }
                    let newImg = nxt.children('img.gal_img').attr('src');

                    if (newImg !== undefined) {
                        $(this).find('img.gal_img').attr('src', newImg);
                        self = nxt;
                    }

                }).prepend(galClose).on('click', /* close image */
                    function (e) {

                        if (!$(e.target).hasClass('gal_close')) {
                            return false;
                        }


                        e.bubbles = false;
                        $(this).fadeOut(500); //.detach();
                        self.fadeTo(500, 1);
                        open = false;

                        e.stopPropagation();
                        return false;
                    }).children('img.gal_img').css({
                    'width': '100%'
                });
            }).children('.gal_leftButton').css({
                'color': 'red',
                'height': parseInt($('.gal_enlarged').find('img:eq(3)').css('height'), 10) + 'px'
            });

        });



        return this;

    };





    $.fn.gal.defaults = {
        enlarge: $.fn.fadeTo,
        openSpeed: 500,
        openbg: '#777777',
        mouseoutOpacity: 0.7,
        mouseOut: {
            'opacity': 0.7
        },
        openProp: {
            'speed': 500,
            'css': {
                'opacity': 0.7
            },
            'background-color': '#777777'
        }

    };


}(jQuery));
/*properties attr, src, fn,gal,offset, left, mouseOut, stopPropagation, bubbles, pageX, pageY, X, Y, html, append, css, top, parent, border, trigger, animate, opacity, remove, height, width, data, gal_close, class, on , children, wrap, addClass, find, deepExt, apply, defaults */
/*global libs*/
(function($) {

    $.fn.gal = function(options) {

        //var opt=$.extend({},$.fn.gal.defaults,options);
        var opt = {},
                gal_scene = this;
        libs.deepExt.apply(opt, [$.fn.gal.defaults]);
        libs.deepExt.apply(opt, [options]),
                sessionStorage.removeItem('imgList');


        this.children('img').wrap('<div></div>');

        var $button_left=$('<div><<<</div>').addClass('gal_leftButton');

        this.addClass('gal_scene');
        this.find('div>img').addClass('gal_img');

        var gal_close = $('<img />').attr({'src': 'img/gal_close.png', 'width': '10px'}).data({'gal_close': true}).addClass('gal_close'),
                gal_left = $('<img />').attr({'src': 'img/gal_left.png', 'width': '10px', 'class': 'gal_left'}),
                gal_right = $('<img />').attr({'src': 'img/gal_right.png', 'width': '10px', 'class': 'gal_right'}),
                gal_buttons = $('div.gal_scene').find('div'),
                gal_list = $('ul#gal_list'),
                gal_enlarged_top = $('<div class="topEnlarged"></div>').on('mousedown', function(e) {


            $(this).data('msdown', true).data('position', {'X': e.pageX, 'Y': e.pageY});
        }).on('mouseup', function(e) { /* when left mouse button is released, remove drag state */
            $(this).data('msdown', false);

            if (isOverTheList(e, gal_list)) {
                var imgName = $(this).parent().children('.gal_img').attr('src'),
                        li = $('<li></li>');
                var button = $('<button />').css({'border': '1px solid #111111', 'width': '10px'}).on('click', function() {
                    $(this).parent().animate({'opacity': '0', 'width': '0px'}, 500, function() {
                        libs.removeFromLocalStorage('imgList', $(this).index());
                        $(this).remove();
                    });
                });
                button.html('-');
                li.html(imgName);
                li.append(button);
                gal_list.append(li);
                libs.addToLocalStorage('imgList', imgName);


                $('.gal_enlarged').css({'background-color': 'transparent'}).animate({'left': gal_list.offset().left + 'px',
                    'top': gal_list.offset().top + 'px',
                    'height': gal_list.css('height'),
                    'width': gal_list.css('width')

                }, function() {
                    gal_close.trigger('click');
                });

            }

        });

        $('body').on('mousemove', function(e) { /* if element is in drag state follow by mouse pointer*/

            if (gal_enlarged_top.data('msdown')) {
                gal_enlarged_top.css({'cursor': 'move'});
                var dX = e.pageX - gal_enlarged_top.data('position').X,
                        dY = e.pageY - gal_enlarged_top.data('position').Y;
                gal_enlarged_top.data('position', {'X': e.pageX, 'Y': e.pageY});
                $('.gal_enlarged').css({'left': '+=' + dX, 'top': '+=' + dY});
            }


            e.stopPropagation();
            e.bubbles = false;

        });



        var nrOfButtons = gal_buttons.length,
                width = parseInt(gal_scene.css('width'), 10),
                widthButton = (nrOfButtons > 5) ? 140 : parseInt(width / nrOfButtons, 10) - 10;
        
        $('img.gal_img').css({'opacity': opt.mouseOut.opacity}),
                open = false;



        if (nrOfButtons > 5) {
            gal_scene.width('720px').css({'padding-left': '20px'});
        } else {
            gal_scene.width(nrOfButtons * (widthButton + 10) + 'px').css({'padding-left': '20px'});
        }


        gal_buttons.children('img').css({
            'width': widthButton - 10 + 'px', 'padding-left': '5px'
        }).on('mouseover', function() {

            $(this).animate({'opacity': 1}, 500);

        }).on('mouseout', function() {

            $(this).animate({'opacity': opt.mouseoutOpacity}, 500);
        });


        gal_buttons.addClass('gal_button').css({
            'width': widthButton

        }).on('click', function() { /* enlarge image */

            if (open) {
                return;
            }
            open = true;
            var self = $(this);
            var html = $(this).html();
            //  var position=$(this).position();


            $(this).fadeTo(500, 0.3).clone().empty().css({
                'width': '0px',
                'height': '0px',
                'background-color': opt.openProp['background-color'],
                'left': parseInt(gal_scene.css('width'), 10) / 2 - 6 + 'px'
            }).appendTo(gal_scene).addClass('gal_enlarged').animate({
                'width': parseInt(gal_scene.css('width'), 10) - 12 + 'px',
                'height': 100 + parseInt(gal_scene.css('height'), 10) - 12 + 'px',
                'left': 5 + 'px',
                'top': 5 + 'px'

            }, opt.openProp.speed, function() {
                $(this).html(html).fadeTo(0, 0).fadeTo(500, 1, function() {

                    $(this).css({'background-color': 'transparent'}).children('img.gal_img').css({'opacity': 1});

                }).prepend(gal_enlarged_top).prepend($button_left).prepend(gal_left).on('click', function(e) { /* change to left image*/

                    if (!$(e.target).hasClass('gal_left')) {
                        return;
                    }

                    var prev = self.prev();
                    if (prev == self) {
                        return;
                    }
                    var newImg = prev.children('img').attr('src');

                    if (newImg !== undefined) {
                        console.log(newImg);
                        $(this).children('img.gal_img').attr('src', newImg);


                        console.log('gal_left');
                        console.log(prev);
                        self = prev;

                    }
                }).prepend(gal_right).on('click', function(e) { /* change to right image */


                    if (!$(e.target).hasClass('gal_right')) {
                        return;
                    }

                    var nxt = self.next();
                    if (nxt.hasClass('gal_enlarged')) {
                        return;
                    }
                    var newImg = nxt.children('img.gal_img').attr('src');

                    if (newImg !== undefined) {
                        console.log(newImg);
                        $(this).children('img.gal_img').attr('src', newImg);

                        self = nxt;

                    }


                }).prepend(gal_close).on('click', /* close image */
                        function(e) {

                            if (!$(e.target).hasClass('gal_close')) {
                                return false;
                            }


                            e.bubbles = false;
                            $(this).fadeOut(500).detach();
                            self.fadeTo(500, 1);
                            open = false;

                            e.stopPropagation();
                            return false;
                        }).children('img.gal_img').css({
                    'width': '100%'
                });
            }).children('.gal_leftButton').css({'color':'red','height': parseInt($('.gal_enlarged').find('img:eq(3)').css('height'), 10) + 'px'});;
           

        });



        return this;

    }


    function isOverTheList(e, gal_list) {
        return e.pageX >= gal_list.offset().left + parseInt(gal_list.css('padding-left'), 10) &&
                e.pageX <= gal_list.offset().left + parseInt(gal_list.css('width'), 10) + parseInt(gal_list.css('padding-left'), 10) &&
                e.pageY >= gal_list.offset().top && e.pageY <= gal_list.offset().top + parseInt(gal_list.css('height'), 10);
    }



    $.fn.gal.defaults = {
        enlarge: $.fn.fadeTo,
        openSpeed: 500,
        openbg: '#777777',
        mouseoutOpacity: 0.7,
        mouseOut: {'opacity': 0.7},
        openProp: {'speed': 500, 'css': {'opacity': 0.7}, 'background-color': '#777777'}

    };


}(jQuery));







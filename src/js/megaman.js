var $ = require('jquery');
var _ = require('lodash');
require('./jquery-ui');
require('./jquery-ui.touch-punch');

$(function() {
    var $window = $(window);
    var megaman = $('#megaman');
    var bgElements = $('.bg-element');

    $window.on('load resize', _.debounce(function() {
        var windowHeight = $window.height();

        bgElements.addClass('paused');

        megaman
            .removeClass()
            .css('bottom', windowHeight - megaman.height())
            .animate({bottom: '138px'}, 700, 'easeInCirc', function() {
                megaman.addClass('intro');
            })
            .on('animationend webkitAnimationEnd MSAnimationEnd oAnimationEnd', function() {
                megaman.removeClass().addClass('run');
                bgElements.removeClass('paused');
            })
            .draggable({
                start: function() {
                    megaman.removeClass().addClass('grabbed');
                    bgElements.addClass('paused');
                },
                drag: function(e, ui) {
                    ui.originalPosition.left = ui.position.left;
                },
                stop: function( e, ui ) {
                    megaman
                        .removeClass()
                        .addClass('falling')
                        .animate({top: ui.originalPosition.top}, 700, 'easeInCirc', function() {
                            megaman.removeClass().addClass('run');
                            bgElements.removeClass('paused');
                        });
                }
        });
    }, 500));

    $('.footer__date').html(new Date().getFullYear());
});

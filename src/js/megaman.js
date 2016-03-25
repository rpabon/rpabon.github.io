$(function() {
    var megaman = $('#megaman');
    var megamanHeight = megaman.outerHeight();
    var bgElements = $('.bg-element');
    var bannerHeight = $('main').outerHeight();
    var streetHeight = $('.street').outerHeight() - 185;

    $(window).on('load', function() {

        megaman
            .animate({top: bannerHeight - megamanHeight - streetHeight}, 700, 'easeInCirc', function() {
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
    });

    $('.footer__date').html(new Date().getFullYear());
});

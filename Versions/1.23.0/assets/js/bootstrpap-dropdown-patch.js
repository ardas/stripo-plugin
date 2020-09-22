(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(["jquery"], function (a0) {
            return (factory(a0));
        });
    } else if (typeof exports === 'object') {
        module.exports = factory(require("jquery"));
    } else {
        factory(jQuery);
    }
}(this, function (jQuery) {
    (function ($) {
        'use strict';

        function calculateUpDown(e) {
            var $trigger = $(this);
            var $menu = $trigger.parent().find('.dropdown-menu');
            if (!$menu.length) {
                return;
            }
            $trigger.parent().toggleClass('dropup', window.innerHeight - $trigger.outerHeight() - $trigger.offset().top < $menu.outerHeight());
        }

        $(document)
            .on('click.bs.dropdown.data-api', '[data-toggle=dropdown]', calculateUpDown);
    })(jQuery);
}));

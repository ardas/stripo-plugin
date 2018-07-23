window.Stripo = window.Stripo || {};
function sp(k,v){Stripo[k]=v};
sp('loaded', false);

function init(options, beforeInitCallback) {
    if (window.StripoApi) {
        beforeInitCallback && beforeInitCallback();
        window.StripoApi.init(options);
    } else {
        setTimeout(function() {init(options, beforeInitCallback)}, 100);
    }
}
sp('init', init);
var curScript = document.currentScript || document.getElementById('stripoScript');
if (!curScript) {
    console.error('Can not find Stripo script tag. Please add id="stripoScript" to Stripo script tag');
} else {
    sp('bp', curScript.src.substring(0, curScript.src.indexOf('stripo.js')));
    sp('spn', curScript.parentNode);
    sp('sns', curScript.nextSibling);

    sp('styles', []);
    sp('scripts', []);
    window.Stripo.skipResources = window.Stripo.skipResources || [];

    function addResource(n, k, useBp) {
        for (var i=0;i<window.Stripo.skipResources.length;i++) {
            if (n.endsWith(window.Stripo.skipResources[i])) {
                return;
            }
        }
        window.Stripo[k].push(useBp ? window.Stripo.bp + n : n);
    }
    addResource('assets/css/dev-esd-styles.css', 'styles', true);
    addResource('assets/css/bootstrap.min.css', 'styles', true);
    addResource('assets/css/bootstrap-select.min.css', 'styles', true);
    addResource('assets/css/bootstrap-colorpicker.min.css', 'styles', true);
    addResource('assets/css/dev-third-party-styles.css', 'styles', true);
    addResource('assets/fonts/banner/fonts.css', 'styles', true);
    if (Array.isArray(window.Stripo.externalStyles)) {
        window.Stripo.styles = window.Stripo.styles.concat(window.Stripo.externalStyles)
    }

    addResource('assets/js/browser-polyfill.min.js', 'scripts', true);
    if (!window.jQuery) {
        addResource('assets/js/jquery-3.1.1.min.js', 'scripts', true);
    }
    if (!window.jQuery || !window.jQuery.ui) {
        addResource('assets/js/jquery-ui.min.js', 'scripts', true);
    }
    addResource('assets/js/jquery.splitter.js', 'scripts', true);
    addResource('assets/js/bootstrap.min.js', 'scripts', true);
    addResource('assets/js/bootstrap-select.min.js', 'scripts', true);
    addResource('assets/js/bootstrap-colorpicker.min.js', 'scripts', true);
    addResource('assets/js/xeponline.jqplugin.js', 'scripts', true);
    addResource('assets/js/custom-elements.min.js', 'scripts', true);
    addResource('assets/js/html2canvas.js', 'scripts', true);
    addResource('assets/js/pica.min.js', 'scripts', true);
    addResource('assets/js/taggle.min.js', 'scripts', true);
    addResource('assets/js/ace/ace.js', 'scripts', true);
    addResource('assets/js/ace/ext-language_tools.js', 'scripts', true);
    addResource('assets/js/ace/ext-searchbox.js', 'scripts', true);
    addResource('assets/js/ace/mode-html.js', 'scripts', true);
    addResource('assets/js/ace/mode-css.js', 'scripts', true);
    addResource('assets/js/ace/theme-tomorrow_night.js', 'scripts', true);
    addResource('assets/js/emojione.min.js', 'scripts', true);
    addResource('/main.90a663b063291f41c3c0.js', 'scripts', true);
    if (Array.isArray(window.Stripo.externalScripts)) {
        window.Stripo.scripts = window.Stripo.scripts.concat(window.Stripo.externalScripts)
    }

    function lst(arr) {
        if (arr.length) {
            var j = document.createElement('link');
            j.rel = 'stylesheet';
            j.href = arr.shift();
            j.className = 'stripo-styles-marker';
            var els = document.querySelectorAll('.stripo-styles-marker');
            if (els && els.length) {
                var referenceNode = els[els.length - 1];
                referenceNode.parentNode.insertBefore(j, referenceNode.nextSibling);
            } else {
                document.head.appendChild(j);
            }
            lst(arr);
        }
    }
    lst(window.Stripo.styles);


    function ls(arr, cb) {
        if (arr.length) {
            var j = document.createElement('script');
            j.onload = function() {
                ls(arr, cb);
            };
            j.src = arr.shift();
            window.Stripo.spn.insertBefore(j, window.Stripo.sns);
        } else {
            if (cb) {
                cb();
            }
        }
    }
    ls(window.Stripo.scripts, function() {
        sp('loaded', true);
    });

    window.onload = function () {
        const logoLink = document.querySelector('.navbar-brand');
        if (logoLink && logoLink.getAttribute('href') === '#') {
            let url;
            const hostnamePrefix = window.location.hostname.split('.')[0];
            switch (hostnamePrefix) {
                case 'staging-demo':
                    url = window.location.origin.replace('staging-demo', 'staging');
                    break;
                case 'demo':
                    url = window.location.origin.replace('demo.', '');
                    break;
                default:
                    url = '#';
            }
            logoLink.setAttribute('href', url);
        }
    }
}

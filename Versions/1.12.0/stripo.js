window.Stripo = window.Stripo || {};
if (!window.Stripo.loaded) {
    function sp(k,v){Stripo[k]=v};
    window.StripoPerfTraceEnabled = !!localStorage.getItem('stripo_perf');
    window.StripoPerfTrace = function(m){
        window.StripoPerfTraceEnabled && console.log('[Perf] [' + performance.now() + '] ' + m);
    };
    window.StripoPerfTrace('"stripo.js" starting scrips loading');
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
        sp('scriptsMaxOrder', 5);
        sp('lst', lst);
        window.Stripo.skipResources = window.Stripo.skipResources || [];

        function addResource(n, k, useBp) {
            for (var i=0;i<window.Stripo.skipResources.length;i++) {
                if (n.endsWith(window.Stripo.skipResources[i])) {
                    return;
                }
            }
            if (!window.Stripo[k]) {
                window.Stripo[k] = [];
            }
            window.Stripo[k].push(useBp ? window.Stripo.bp + n : n);
        }

        addResource('assets/css/dev-esd-styles.css', 'styles', true);
        addResource('assets/css/bootstrap.css', 'styles', true);
        addResource('assets/css/bootstrap-select.min.css', 'styles', true);
        addResource('assets/css/bootstrap-colorpicker.min.css', 'styles', true);
        addResource('assets/css/dev-third-party-styles.css', 'styles', true);
        addResource('assets/imageeditor/styles.min.css', 'styles', true);
        addResource('assets/fonts/banner/fonts.css', 'styles', true);
        if (Array.isArray(window.Stripo.externalStyles)) {
            window.Stripo.styles = window.Stripo.styles.concat(window.Stripo.externalStyles)
        }
        addResource('assets/js/LAB.min.js', 'scripts0', true);
        addResource('assets/imageeditor/babel_polyfill.js', 'scripts1', true);
        if (!window.jQuery) {
            addResource('assets/js/jquery-3.1.1.min.js', 'scripts1', true);
        }
        if (!window.jQuery || !window.jQuery.ui) {
            addResource('assets/js/jquery-ui.min.js', 'scripts2', true);
        }
        addResource('assets/js/bootstrap.min.js', 'scripts3', true);
        addResource('assets/js/ace/ace.js', 'scripts3', true);
        addResource('assets/js/jquery.splitter.js', 'scripts4', true);
        addResource('assets/js/bootstrap-select.min.js', 'scripts4', true);
        addResource('assets/js/bootstrpap-dropdown-patch.js', 'scripts4', true);
        addResource('assets/js/bootstrap-datepicker.min.js', 'scripts4', true);
        addResource('assets/js/custom-elements.min.js', 'scripts4', true);
        addResource('assets/js/html2canvas.js', 'scripts4', true);
        addResource('assets/js/pica.min.js', 'scripts4', true);
        addResource('assets/js/taggle.min.js', 'scripts4', true);
        addResource('assets/js/ace/ext-language_tools.js', 'scripts4', true);
        addResource('assets/js/ace/ext-searchbox.js', 'scripts4', true);
        addResource('assets/js/ace/mode-html.js', 'scripts4', true);
        addResource('assets/js/ace/mode-css.js', 'scripts4', true);
        addResource('assets/js/ace/theme-tomorrow_night.js', 'scripts4', true);
        addResource('assets/js/emojione.min.js', 'scripts4', true);
        (!window.Zone && !curScript.hasAttribute('angular-app')) && addResource('assets/imageeditor/zone.min.js', 'scripts4', true);
        addResource('assets/imageeditor/scripts.min.js', 'scripts4', true);
        addResource('main.7b6ee9dd675b0c3fd750.js', 'scripts5', true);
        if (Array.isArray(window.Stripo.externalScripts)) {
            window.Stripo['scripts6'] = window.Stripo.externalScripts;
            sp('scriptsMaxOrder', 6);
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
        function ls(cb) {
            var l = $LAB;
            for (var scriptOrder=1; scriptOrder<=window.Stripo.scriptsMaxOrder; scriptOrder++) {
                if (window.Stripo['scripts' + scriptOrder]) {
                    for (var i = 0; i < window.Stripo['scripts' + scriptOrder].length; i++) {
                        l = l.script(window.Stripo['scripts' + scriptOrder][i]);

                    }
                    l = (scriptOrder == window.Stripo.scriptsMaxOrder ? l.wait(cb) : l.wait());
                }
            }
        }
        var j = document.createElement('script');
        j.onload = function() {
            ls(function() {
                sp('loaded', true);
                window.StripoPerfTrace('"stripo.js" loaded all scripts');
            });
        };
        j.src = window.Stripo['scripts0'][0];
        window.Stripo.spn.insertBefore(j, window.Stripo.sns);
        function adf(cb) {
            if (window.StripoApi) {
                window.StripoApi.applyDefaultStyles();
                cb && cb();
            } else {
                setTimeout(adf.bind(this,cb), 100);
            }
        }
        sp('applyDefaultStyles', adf);
    }
}

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
        sp('scriptsMaxOrder', 4);
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
        addResource('assets/imageeditor/styles.min.css', 'styles', true);
        addResource('assets/fonts/banner/fonts.css', 'styles', true);
        if (Array.isArray(window.Stripo.externalStyles)) {
            window.Stripo.styles = window.Stripo.styles.concat(window.Stripo.externalStyles)
        }
        (!window.$LAB) && addResource('assets/js/LAB.min.js', 'scripts0', true);
        (!window._babelPolyfill) && addResource('assets/imageeditor/babel_polyfill.js', 'scripts1', true);
        (!window.Zone && !curScript.hasAttribute('angular-app')) && addResource('assets/imageeditor/zone.min.js', 'scripts1', true);
        addResource('stripodeps.03bec6ddacf8f6c6499e.js', 'scripts2', true);
        addResource('assets/imageeditor/scripts.min.js', 'scripts3', true);
        addResource('main.03bec6ddacf8f6c6499e.js', 'scripts4', true);
        if (Array.isArray(window.Stripo.externalScripts)) {
            window.Stripo['scripts5'] = window.Stripo.externalScripts;
            sp('scriptsMaxOrder', 5);
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

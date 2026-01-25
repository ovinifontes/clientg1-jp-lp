/**
 * ============================================
 * ANALYTICS SCRIPTS
 * Meta Pixel, Google Tag Manager, VWO
 * ============================================
 */

// LiteSpeed docref script (deve ser executado primeiro)
(function() {
    'use strict';
    var litespeed_docref = sessionStorage.getItem("litespeed_docref");
    if (litespeed_docref) {
        Object.defineProperty(document, "referrer", {
            get: function() {
                return litespeed_docref;
            }
        });
        sessionStorage.removeItem("litespeed_docref");
    }
})();

// Visual Website Optimizer (VWO) - Variável global
var _vwo_clicks = 10;

// Visual Website Optimizer (VWO) - Código principal
(function() {
    'use strict';
    var w = window,
        d = document;
    var account_id = 1006078,
        version = 2.2,
        settings_tolerance = 2000,
        library_tolerance = 2500,
        use_existing_jquery = false,
        platform = 'web',
        hide_element = 'body',
        hide_element_style = 'opacity:0 !important;filter:alpha(opacity=0) !important;background:none !important';
    
    var f = false,
        v = d.querySelector('#vwoCode'),
        cc = {};
    
    if (-1 < d.URL.indexOf('__vwo_disable__') || w._vwo_code) return;
    
    try {
        var e = JSON.parse(localStorage.getItem('_vwo_' + account_id + '_config'));
        cc = e && typeof e === 'object' ? e : {};
    } catch (e) {}
    
    function r(t) {
        try {
            return decodeURIComponent(t);
        } catch (e) {
            return t;
        }
    }
    
    var s = function() {
        var e = {
            combination: [],
            combinationChoose: [],
            split: [],
            exclude: [],
            uuid: null,
            consent: null,
            optOut: null
        },
        t = d.cookie || '';
        if (!t) return e;
        
        for (var n, i, o = /(?:^|;\s*)(?:(_vis_opt_exp_(\d+)_combi=([^;]*))|(_vis_opt_exp_(\d+)_combi_choose=([^;]*))|(_vis_opt_exp_(\d+)_split=([^:;]*))|(_vis_opt_exp_(\d+)_exclude=[^;]*)|(_vis_opt_out=([^;]*))|(_vwo_global_opt_out=[^;]*)|(_vwo_uuid=([^;]*))|(_vwo_consent=([^;]*)))/g; null !== (n = o.exec(t));) {
            try {
                if (n[1]) {
                    e.combination.push({id: n[2], value: r(n[3])});
                } else if (n[4]) {
                    e.combinationChoose.push({id: n[5], value: r(n[6])});
                } else if (n[7]) {
                    e.split.push({id: n[8], value: r(n[9])});
                } else if (n[10]) {
                    e.exclude.push({id: n[11]});
                } else if (n[12]) {
                    e.optOut = r(n[13]);
                } else if (n[14]) {
                    e.optOut = true;
                } else if (n[15]) {
                    e.uuid = r(n[16]);
                } else if (n[17]) {
                    var i = r(n[18]);
                    e.consent = i && i.length >= 3 ? i.substring(0, 3) : null;
                }
            } catch (e) {}
        }
        return e;
    }();
    
    function i() {
        var e = function() {
            if (w.VWO && Array.isArray(w.VWO)) {
                for (var e = 0; e < w.VWO.length; e++) {
                    var t = w.VWO[e];
                    if (Array.isArray(t) && ('setVisitorId' === t[0] || 'setSessionId' === t[0])) {
                        return true;
                    }
                }
            }
            return false;
        }(),
        t = 'a=' + account_id + '&u=' + encodeURIComponent(w._vis_opt_url || d.URL) + '&vn=' + version + '&ph=1' + (typeof platform !== 'undefined' ? '&p=' + platform : '') + '&st=' + w.performance.now();
        
        if (!e) {
            var n = function() {
                var e, t = [], n = {}, i = w.VWO && w.VWO.appliedCampaigns || {};
                for (e in i) {
                    var o = i[e] && i[e].v;
                    if (o) {
                        t.push(e + '-' + o + '-1');
                        n[e] = true;
                    }
                }
                if (s && s.combination) {
                    for (var r = 0; r < s.combination.length; r++) {
                        var a = s.combination[r];
                        if (!n[a.id]) {
                            t.push(a.id + '-' + a.value);
                        }
                    }
                }
                return t.join('|');
            }();
            if (n) t += '&c=' + n;
            
            n = function() {
                var e = [], t = {};
                if (s && s.combinationChoose) {
                    for (var n = 0; n < s.combinationChoose.length; n++) {
                        var i = s.combinationChoose[n];
                        e.push(i.id + '-' + i.value);
                        t[i.id] = true;
                    }
                }
                if (s && s.split) {
                    for (var o = 0; o < s.split.length; o++) {
                        var i = s.split[o];
                        if (!t[i.id]) {
                            e.push(i.id + '-' + i.value);
                        }
                    }
                }
                return e.join('|');
            }();
            if (n) t += '&cc=' + n;
            
            n = function() {
                var e = {}, t = [];
                if (w.VWO && Array.isArray(w.VWO)) {
                    for (var n = 0; n < w.VWO.length; n++) {
                        var i = w.VWO[n];
                        if (Array.isArray(i) && 'setVariation' === i[0] && i[1] && Array.isArray(i[1])) {
                            for (var o = 0; o < i[1].length; o++) {
                                var r, a = i[1][o];
                                if (a && typeof a === 'object') {
                                    r = a.e;
                                    a = a.v;
                                    if (r && a) {
                                        e[r] = a;
                                    }
                                }
                            }
                        }
                    }
                }
                for (r in e) {
                    t.push(r + '-' + e[r]);
                }
                return t.join('|');
            }();
            if (n) t += '&sv=' + n;
        }
        
        if (s && s.optOut) t += '&o=' + s.optOut;
        
        var n = function() {
            var e = [], t = {};
            if (s && s.exclude) {
                for (var n = 0; n < s.exclude.length; n++) {
                    var i = s.exclude[n];
                    if (!t[i.id]) {
                        e.push(i.id);
                        t[i.id] = true;
                    }
                }
            }
            return e.join('|');
        }();
        if (n) t += '&e=' + n;
        if (s && s.uuid) t += '&id=' + s.uuid;
        if (s && s.consent) t += '&consent=' + s.consent;
        if (w.name && -1 < w.name.indexOf('_vis_preview')) t += '&pM=true';
        if (w.VWO && w.VWO.ed) t += '&ed=' + w.VWO.ed;
        
        return t;
    }
    
    var code = {
        nonce: v && v.nonce,
        use_existing_jquery: function() {
            return typeof use_existing_jquery !== 'undefined' ? use_existing_jquery : void 0;
        },
        library_tolerance: function() {
            return typeof library_tolerance !== 'undefined' ? library_tolerance : void 0;
        },
        settings_tolerance: function() {
            return cc.sT || settings_tolerance;
        },
        hide_element_style: function() {
            return '{' + (cc.hES || hide_element_style) + '}';
        },
        hide_element: function() {
            return performance.getEntriesByName('first-contentful-paint')[0] ? '' : (typeof cc.hE === 'string' ? cc.hE : hide_element);
        },
        getVersion: function() {
            return version;
        },
        finish: function(e) {
            var t;
            if (!f) {
                f = true;
                t = d.getElementById('_vis_opt_path_hides');
                if (t) {
                    t.parentNode.removeChild(t);
                }
                if (e) {
                    (new Image()).src = 'https://dev.visualwebsiteoptimizer.com/ee.gif?a=' + account_id + e;
                }
            }
        },
        finished: function() {
            return f;
        },
        addScript: function(e) {
            var t = d.createElement('script');
            t.type = 'text/javascript';
            if (e.src) {
                t.src = e.src;
            } else {
                t.text = e.text;
            }
            if (v) {
                t.setAttribute('nonce', v.nonce);
            }
            d.getElementsByTagName('head')[0].appendChild(t);
        },
        load: function(e, t) {
            t = t || {};
            var n = new XMLHttpRequest();
            n.open('GET', e, true);
            n.withCredentials = !t.dSC;
            n.responseType = t.responseType || 'text';
            n.onload = function() {
                if (t.onloadCb) {
                    return t.onloadCb(n, e);
                }
                if (n.status === 200) {
                    _vwo_code.addScript({text: n.responseText});
                } else {
                    _vwo_code.finish('&e=loading_failure:' + e);
                }
            };
            n.onerror = function() {
                if (t.onerrorCb) {
                    return t.onerrorCb(e);
                }
                _vwo_code.finish('&e=loading_failure:' + e);
            };
            n.send();
        },
        init: function() {
            var e, t = this.settings_tolerance();
            w._vwo_settings_timer = setTimeout(function() {
                _vwo_code.finish();
            }, t);
            
            if ('body' !== this.hide_element()) {
                var n = d.createElement('style');
                e = (t = this.hide_element()) ? t + this.hide_element_style() : '';
                t = d.getElementsByTagName('head')[0];
                n.setAttribute('id', '_vis_opt_path_hides');
                if (v) {
                    n.setAttribute('nonce', v.nonce);
                }
                n.setAttribute('type', 'text/css');
                if (n.styleSheet) {
                    n.styleSheet.cssText = e;
                } else {
                    n.appendChild(d.createTextNode(e));
                }
                t.appendChild(n);
            } else {
                var n = d.getElementsByTagName('head')[0];
                e = d.createElement('div');
                e.style.cssText = 'z-index: 2147483647 !important;position: fixed !important;left: 0 !important;top: 0 !important;width: 100% !important;height: 100% !important;background: white !important;';
                e.setAttribute('id', '_vis_opt_path_hides');
                e.classList.add('_vis_hide_layer');
                n.parentNode.insertBefore(e, n.nextSibling);
            }
            
            var n = 'https://dev.visualwebsiteoptimizer.com/j.php?' + i();
            if (-1 !== w.location.search.indexOf('_vwo_xhr')) {
                this.addScript({src: n});
            } else {
                this.load(n + '&x=true', {l: 1});
            }
        }
    };
    
    w._vwo_code = code;
    code.init();
})();

// Meta Pixel Code
!function(f,b,e,v,n,t,s){
    if(f.fbq)return;
    n=f.fbq=function(){
        n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)
    };
    if(!f._fbq)f._fbq=n;
    n.push=n;
    n.loaded=!0;
    n.version='2.0';
    n.queue=[];
    t=b.createElement(e);
    t.async=!0;
    t.src=v;
    s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)
}(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');

fbq('init','281938460031659');
fbq('track','PageView');

// Google Tag Manager
(function(w,d,s,l,i){
    w[l]=w[l]||[];
    w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});
    var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),
        dl=l!='dataLayer'?'&l='+l:'';
    j.async=true;
    j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
    f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-MRT9B6D');

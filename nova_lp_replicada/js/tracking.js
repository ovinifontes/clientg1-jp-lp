/**
 * ============================================
 * TRACKING SCRIPT - Hub.la
 * Rastreamento de vendas com UTM parameters
 * Desenvolvido pela Comunidade NOD - Dericson Calari e Samuel Choairy
 * ============================================
 */

(function() {
    'use strict';
    
    let prefix = ["https://pay.hub.la"];
    
    /**
     * Obtém parâmetros UTM da URL e formata para o tracking
     */
    function getParams() {
        let t = "";
        let e = window.top.location.href;
        let r = new URL(e);
        
        if (r) {
            let a = r.searchParams.get("utm_source");
            let n = r.searchParams.get("utm_medium");
            let o = r.searchParams.get("utm_campaign");
            let m = r.searchParams.get("utm_term");
            let c = r.searchParams.get("utm_content");
            
            if (-1 !== e.indexOf("?")) {
                t = `&sck=${a}|${n}|${o}|${m}|${c}`;
            }
            console.log(t);
        }
        
        return t;
    }
    
    /**
     * Aplica parâmetros UTM em todos os links do Hub.la
     */
    (function() {
        var t = new URLSearchParams(window.location.search);
        
        if (t.toString()) {
            document.querySelectorAll("a").forEach(function(e) {
                for (let r = 0; r < prefix.length; r++) {
                    if (-1 !== e.href.indexOf(prefix[r])) {
                        if (-1 === e.href.indexOf("?")) {
                            e.href += "?" + t.toString() + getParams();
                        } else {
                            e.href += "&" + t.toString() + getParams();
                        }
                    }
                }
            });
        }
    })();
    
    console.log('%cScript de rastreamento de vendas desenvolvido pela Comunidade NOD - Dericson Calari e Samuel Choairy', 'font-size:20px;color:yellow;');
})();

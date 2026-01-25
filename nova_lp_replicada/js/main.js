/**
 * ============================================
 * MAIN SCRIPTS
 * LiteSpeed Cache - Delayed JS Loading e Vary Cookie
 * ============================================
 */

// LiteSpeed UI Events - eventos que disparam o carregamento de JS
window.litespeed_ui_events = window.litespeed_ui_events || [
    "mouseover",
    "click",
    "keydown",
    "wheel",
    "touchmove",
    "touchstart"
];

var urlCreator = window.URL || window.webkitURL;

/**
 * Força o carregamento de JS quando há interação do usuário
 */
function litespeed_load_delayed_js_force() {
    console.log("[LiteSpeed] Start Load JS Delayed");
    
    // Remove listeners após primeira interação
    litespeed_ui_events.forEach(e => {
        window.removeEventListener(e, litespeed_load_delayed_js_force, {passive: true});
    });
    
    // Carrega iframes com data-litespeed-src
    document.querySelectorAll("iframe[data-litespeed-src]").forEach(e => {
        e.setAttribute("src", e.getAttribute("data-litespeed-src"));
    });
    
    // Carrega scripts delayed
    if ("loading" == document.readyState) {
        window.addEventListener("DOMContentLoaded", litespeed_load_delayed_js);
    } else {
        litespeed_load_delayed_js();
    }
}

// Adiciona listeners para eventos de UI
litespeed_ui_events.forEach(e => {
    window.addEventListener(e, litespeed_load_delayed_js_force, {passive: true});
});

/**
 * Carrega scripts com type="litespeed/javascript" de forma assíncrona
 */
async function litespeed_load_delayed_js() {
    let t = [];
    
    document.querySelectorAll('script[type="litespeed/javascript"]').forEach(e => {
        t.push(e);
    });
    
    for (var d in t) {
        await new Promise(e => litespeed_load_one(t[d], e));
    }
    
    // Dispara eventos de carregamento completo
    document.dispatchEvent(new Event("DOMContentLiteSpeedLoaded"));
    window.dispatchEvent(new Event("DOMContentLiteSpeedLoaded"));
}

/**
 * Carrega um script individual
 */
function litespeed_load_one(t, e) {
    console.log("[LiteSpeed] Load ", t);
    
    var d = document.createElement("script");
    d.addEventListener("load", e);
    d.addEventListener("error", e);
    
    // Copia atributos do script original
    t.getAttributeNames().forEach(e => {
        if ("type" != e) {
            d.setAttribute("data-src" == e ? "src" : e, t.getAttribute(e));
        }
    });
    
    let a = !(d.type = "text/javascript");
    
    // Se não tem src mas tem conteúdo, converte para blob URL
    if (!d.src && t.textContent) {
        d.src = litespeed_inline2src(t.textContent);
        a = true;
    }
    
    t.after(d);
    t.remove();
    
    if (a) {
        e();
    }
}

/**
 * Converte código inline para blob URL
 */
function litespeed_inline2src(t) {
    try {
        var d = urlCreator.createObjectURL(
            new Blob([t.replace(/^(?:<!--)?(.*?)(?:-->)?$/gm, "$1")], {
                type: "text/javascript"
            })
        );
    } catch (e) {
        d = "data:text/javascript;base64," + btoa(
            t.replace(/^(?:<!--)?(.*?)(?:-->)?$/gm, "$1")
        );
    }
    return d;
}

/**
 * LiteSpeed Vary Cookie
 * Verifica e atualiza cookie de cache
 */
(function() {
    'use strict';
    var litespeed_vary = document.cookie.replace(
        /(?:(?:^|.*;\s*)_lscache_vary\s*\=\s*([^;]*).*$)|^.*$/,
        ""
    );
    
    if (!litespeed_vary) {
        fetch("/wp-content/plugins/litespeed-cache/guest.vary.php", {
            method: "POST",
            cache: "no-cache",
            redirect: "follow"
        })
        .then(e => e.json())
        .then(e => {
            console.log(e);
            if (e.hasOwnProperty("reload") && "yes" == e.reload) {
                sessionStorage.setItem("litespeed_docref", document.referrer);
                window.location.reload(true);
            }
        });
    }
})();

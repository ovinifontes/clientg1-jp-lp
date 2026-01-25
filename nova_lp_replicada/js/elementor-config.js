/**
 * ============================================
 * ELEMENTOR CONFIGURATION
 * Configurações do Elementor Frontend e Pro
 * ============================================
 */

// Elementor Frontend Config
var elementorFrontendConfig = {
    "environmentMode": {
        "edit": false,
        "wpPreview": false,
        "isScriptDebug": false
    },
    "i18n": {
        "shareOnFacebook": "Compartilhar no Facebook",
        "shareOnTwitter": "Compartilhar no Twitter",
        "pinIt": "Fixar",
        "download": "Baixar",
        "downloadImage": "Baixar imagem",
        "fullscreen": "Tela cheia",
        "zoom": "Zoom",
        "share": "Compartilhar",
        "playVideo": "Reproduzir vídeo",
        "previous": "Anterior",
        "next": "Próximo",
        "close": "Fechar",
        "a11yCarouselPrevSlideMessage": "Slide anterior",
        "a11yCarouselNextSlideMessage": "Próximo slide",
        "a11yCarouselFirstSlideMessage": "Este é o primeiro slide",
        "a11yCarouselLastSlideMessage": "Este é o último slide",
        "a11yCarouselPaginationBulletMessage": "Ir para o slide"
    },
    "is_rtl": false,
    "breakpoints": {
        "xs": 0,
        "sm": 480,
        "md": 768,
        "lg": 1025,
        "xl": 1440,
        "xxl": 1600
    },
    "responsive": {
        "breakpoints": {
            "mobile": {
                "label": "Dispositivos móveis no modo retrato",
                "value": 767,
                "default_value": 767,
                "direction": "max",
                "is_enabled": true
            },
            "mobile_extra": {
                "label": "Dispositivos móveis no modo paisagem",
                "value": 880,
                "default_value": 880,
                "direction": "max",
                "is_enabled": false
            },
            "tablet": {
                "label": "Tablet no modo retrato",
                "value": 1024,
                "default_value": 1024,
                "direction": "max",
                "is_enabled": true
            },
            "tablet_extra": {
                "label": "Tablet no modo paisagem",
                "value": 1200,
                "default_value": 1200,
                "direction": "max",
                "is_enabled": false
            },
            "laptop": {
                "label": "Notebook",
                "value": 1366,
                "default_value": 1366,
                "direction": "max",
                "is_enabled": true
            },
            "widescreen": {
                "label": "Tela ampla (widescreen)",
                "value": 2400,
                "default_value": 2400,
                "direction": "min",
                "is_enabled": true
            }
        },
        "hasCustomBreakpoints": true
    },
    "version": "3.34.2",
    "is_static": false,
    "experimentalFeatures": {
        "e_font_icon_svg": true,
        "additional_custom_breakpoints": true,
        "container": true,
        "e_optimized_markup": true,
        "theme_builder_v2": true,
        "hello-theme-header-footer": true,
        "nested-elements": true,
        "home_screen": true,
        "global_classes_should_enforce_capabilities": true,
        "e_variables": true,
        "cloud-library": true,
        "e_opt_in_v4_page": true,
        "e_interactions": true,
        "e_editor_one": true,
        "import-export-customization": true,
        "e_pro_variables": true
    },
    "urls": {
        "assets": "https://filipepenoni.com.br/wp-content/plugins/elementor/assets/",
        "ajaxurl": "https://filipepenoni.com.br/wp-admin/admin-ajax.php",
        "uploadUrl": "https://filipepenoni.com.br/wp-content/uploads"
    },
    "nonces": {
        "floatingButtonsClickTracking": "0c35be5d64"
    },
    "swiperClass": "swiper",
    "settings": {
        "page": [],
        "editorPreferences": []
    },
    "kit": {
        "active_breakpoints": ["viewport_mobile", "viewport_tablet", "viewport_laptop", "viewport_widescreen"],
        "global_image_lightbox": "yes",
        "lightbox_enable_counter": "yes",
        "lightbox_enable_fullscreen": "yes",
        "lightbox_enable_zoom": "yes",
        "lightbox_enable_share": "yes",
        "lightbox_title_src": "title",
        "lightbox_description_src": "description",
        "hello_header_logo_type": "title",
        "hello_footer_logo_type": "logo"
    },
    "post": {
        "id": 8277,
        "title": "Página%20LDR%20-%20Filipe%20Penoni",
        "excerpt": "",
        "featuredImage": false
    }
};

// Elementor Pro Frontend Config
var ElementorProFrontendConfig = {
    "ajaxurl": "https://filipepenoni.com.br/wp-admin/admin-ajax.php",
    "nonce": "003d0d2a50",
    "urls": {
        "assets": "https://filipepenoni.com.br/wp-content/plugins/elementor-pro/assets/",
        "rest": "https://filipepenoni.com.br/wp-json/"
    },
    "settings": {
        "lazy_load_background_images": true
    },
    "popup": {
        "hasPopUps": true
    },
    "shareButtonsNetworks": {
        "facebook": {
            "title": "Facebook",
            "has_counter": true
        },
        "twitter": {
            "title": "Twitter"
        },
        "linkedin": {
            "title": "LinkedIn",
            "has_counter": true
        },
        "pinterest": {
            "title": "Pinterest",
            "has_counter": true
        },
        "reddit": {
            "title": "Reddit",
            "has_counter": true
        },
        "vk": {
            "title": "VK",
            "has_counter": true
        },
        "odnoklassniki": {
            "title": "OK",
            "has_counter": true
        },
        "tumblr": {
            "title": "Tumblr"
        },
        "digg": {
            "title": "Digg"
        },
        "skype": {
            "title": "Skype"
        },
        "stumbleupon": {
            "title": "StumbleUpon",
            "has_counter": true
        },
        "mix": {
            "title": "Mix"
        },
        "telegram": {
            "title": "Telegram"
        },
        "pocket": {
            "title": "Pocket",
            "has_counter": true
        },
        "xing": {
            "title": "XING",
            "has_counter": true
        },
        "whatsapp": {
            "title": "WhatsApp"
        },
        "email": {
            "title": "Email"
        },
        "print": {
            "title": "Print"
        },
        "x-twitter": {
            "title": "X"
        },
        "threads": {
            "title": "Threads"
        }
    },
    "facebook_sdk": {
        "lang": "pt_BR",
        "app_id": ""
    },
    "lottie": {
        "defaultAnimationUrl": "https://filipepenoni.com.br/wp-content/plugins/elementor-pro/modules/lottie/assets/animations/default.json"
    }
};

// WordPress i18n
if (typeof wp !== 'undefined' && wp.i18n) {
    wp.i18n.setLocaleData({'text direction\u0004ltr': ['ltr']});
}

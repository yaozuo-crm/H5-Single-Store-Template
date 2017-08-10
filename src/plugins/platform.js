(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(factory);
    } else if (typeof exports === 'object') {
        // CommonJS
        module.exports = factory();
    } else {
        // Browser global
        factory();
    }
}(this, () => {
    // ////////
    // Name //
    // ////////

    const COMPONENT_NAME = 'Platform';

    // /////////////
    // Component //
    // /////////////

    const ua = window.navigator.userAgent.toLowerCase();
    const html = document.getElementsByTagName('html')[0];

    const Component = {
        hasTouch: 'ontouchstart' in window,
        isiPad: ua.match(/ipad/i) !== null,
        isNexus7: ua.match(/Nexus 7/gi) !== null,
        isMobile: ua.match(/Android|webOS|iPhone|iPod|BlackBerry|IEMobile/i) !== null && ua.match(/Mobile/i) !== null,
        isiPhone: ua.match(/iphone/i) !== null,
        isAndroid: ua.match(/android/i) !== null,
        isS4: ua.match(/(gt\-i95)|(sph\-l720)/i) !== null,
        isS5: ua.match(/sm\-g900/i) !== null,
        isS6: ua.match(/sm\-g9250/i) !== null,
        isS7: ua.match(/sm\-g930p/i) !== null || ua.match(/sm\-g9300/i) !== null,
        isIE: ua.match(/(msie|trident)/i) !== null,
        isIE11: ua.match(/Trident\/7\.0/i) !== null,
        isEdge: ua.match(/edge/i) !== null,
        isChrome: ua.match(/chrome/gi) !== null,
        isFirefox: ua.match(/firefox/gi) !== null,
        isSafari: ua.match(/safari/gi) !== null && ua.match(/chrome/gi) === null,
        isMac: ua.match(/mac/gi) !== null,
        isWindows: ua.match(/windows/gi) !== null,
        isSamsungNative: ua.match(/samsung/gi) !== null,
    };

    Component.isAndroidPad = Component.isAndroid && !Component.isMobile;
    Component.isTablet = Component.isiPad || Component.isAndroidPad;
    Component.isDesktop = !(Component.isMobile || Component.isTablet);
    Component.isIOS = Component.isiPad || Component.isiPhone;


    Object.keys(Component).forEach(key => {
        let className = key.toLowerCase().replace('is', '');

        if (className.indexOf('has') === 0) {
            className = className.replace('has', 'has-');
        }

        if (!Component[key]) {
            if (className.indexOf('has') === 0) {
                className = className.replace('has', 'no');
            } else {
                className = `not-${className}`;
            }
        }

        html.classList.add(className);
        html.setAttribute(`data-${className}`, '');
    });


    if (window[COMPONENT_NAME] === undefined) {
        window[COMPONENT_NAME] = Component;
    }

    return Component;
}));

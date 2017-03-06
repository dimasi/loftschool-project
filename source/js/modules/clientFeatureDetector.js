require(`Root/node_modules/modernizr/bin/modernizr`);

/** 
 * The module determines the client's capabilities using Modernizr
 * @module clientFeatureDetector
 * */
module.exports = (() => {
    let _Modernizr = global.Modernizr;

    let _detectTouchevents = () => new Promise(resolve => _Modernizr.on(`touchevents`, result => resolve(result)));

    return {
        touchevents: _detectTouchevents
    };
})();

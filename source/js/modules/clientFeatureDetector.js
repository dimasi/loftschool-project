require(`Root/node_modules/modernizr/bin/modernizr`);

/** 
 * @module clientFeatureDetector
 * The module determines the client's capabilities using Modernizr
 * */
module.exports = (() => {
    let _Modernizr = global.Modernizr;

    return {
        videoautoplay: () => new Promise(resolve => _Modernizr.on(`videoautoplay`, result => resolve(result))),
        touchevents: () => new Promise(resolve => _Modernizr.on(`touchevents`, result => resolve(result)))
    };

})();

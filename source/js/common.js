const mediaBackground = require('Modules/mediaBackground');
const parallax = require('Modules/parallax');

/** 
 * @module common
 * Common scripts
 * */
module.exports = (() => {
    // Create animated background
    mediaBackground.init({
        layerHolder: `.page-header__bg-video`,
        videoSrc: `media-background.mp4`,
        gifSrc: `media-background.gif`,
        className: `page-header__bg-video`
    });

    // Create parallax
    parallax.scroll([
        {
            selector: `.page-header__user`,
            divider: 0.05
        },
        {
            selector: `.page-header__bg-user`,
            divider: 0.07
        },
        {
            selector: `.page-header__bg`,
            divider: 0.09
        }
    ]);
})();

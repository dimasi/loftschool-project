/**
 * @module background
 */
import videoBackground from 'Components/video-background/script';

export default (() => {
    let init = $el => {
        videoBackground.init($el.find('.video-background'), {
            onRender: () => $(document).trigger(`preloader:continue`)
        });
    };

    return {
        init: init
    };
})();

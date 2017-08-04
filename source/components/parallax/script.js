/**
 * The module creates a parallax effect for a set of layers
 * @module parallax
 * */
export default (() => {
    const eventListener = event => {
        return layers => {
            setLayers(layers);
            $(window).on(event, e => updateScene(e));
        };
    };

    let _layers = [];

    /**
     * Binding to DOM
     * @param {array} layers
     */
    let setLayers = layers => layers.forEach(({selector, divider}) => _layers.push({
        $selector: $(selector),
        divider
    }));

    /**
     * Update the position of the layers
     * @param {array} e - Mousemove event
     */
    let updateScene = e => {
        if (e.type === 'scroll') {
            _layers.forEach(layer => setPositionByScroll($(window).scrollTop(), layer));
        }

        if (e.type === 'mousemove') {
            _layers.forEach(layer => setPositionByMousemove(e, layer));
        }
    };

    /**
     * Calculate and set layer position for mousemove parallax
     * @param {object} e - Mousemove event
     * @param {object} layer - Object of layer
     */
    let setPositionByMousemove = (e, {$selector, divider}) => {
        let bottomPosition = (window.innerHeight / 2) * divider,
            pageX = e.pageX,
            pageY = e.pageY,
            initialX = (window.innerWidth / 2) - pageX,
            initialY = (window.innerHeight / 2) - pageY,
            positionX = initialX * divider,
            positionY = initialY * divider;

        $selector.css({
            'transform': `translate3d(${positionX}px, ${positionY}px, 0)`,
            '-webkit-transform': `translate3d(${positionX}px, ${positionY}px, 0)`,
            'bottom': `-${bottomPosition}px`
        });
    };

    /**
     * Calculate and set layer position for scroll parallax
     * @param {number} scrollTop - The height of the scrolling page
     * @param {object} layer - Object of layer
     */
    let setPositionByScroll = (scrollTop, {$selector, divider}) => {
        let shiftY = `-${scrollTop / 100 / divider}px`;

        $selector.css({
            'transform': `translate3d(0 ${shiftY}, 0)`,
            '-webkit-transform': `translate3d(0, ${shiftY}, 0)`
        });
    };

    return {
        mousemove: eventListener(`mousemove`),
        scroll: eventListener(`scroll`)
    };
})();

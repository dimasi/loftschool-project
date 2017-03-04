/** 
 * @module parallax
 * The module creates a parallax effect for a set of layers
 * */
module.exports = (() => {
    let _layers = [],

        /**
         * Binding to DOM
         * @private
         * @param {array} layers 
         */
        _setLayers = layers => layers.forEach(({selector, divider}) => _layers.push({
            $selector: $(selector),
            divider: divider
        })),

        /**
         * Update the position of the layers
         * @private
         * @param {array} e - Mousemove event 
         */
        _updateScene = e => _layers.forEach(layer => _setPosition(e, layer)),

        /**
         * Calculate and set layer position
         * @private
         * @param {array} e - Mousemove event
         * @param {object} layer - Object of layer
         */
        _setPosition = (e, {$selector, divider}) => {
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

    return {
        init: (layers) => {
            _setLayers(layers);
            $(window).on('mousemove', e => _updateScene(e));
        }
    };

})();

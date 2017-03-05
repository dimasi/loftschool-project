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
        _updateScene = e => {
            if (e.type == `scroll`) {
                _layers.forEach(layer => _setPositionByScroll($(window).scrollTop(), layer));
            }

            if (e.type == `mousemove`) {
                _layers.forEach(layer => _setPositionByMousemove(e, layer));
            }
        },

        /**
         * Calculate and set layer position for mousemove parallax
         * @private
         * @param {object} e - Mousemove event
         * @param {object} layer - Object of layer
         */
        _setPositionByMousemove = (e, {$selector, divider}) => {
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
        },

        /**
         * Calculate and set layer position for scroll parallax
         * @private
         * @param {number} scrollTop - The height of the scrolling page
         * @param {object} layer - Object of layer
         */
        _setPositionByScroll = (scrollTop, {$selector, divider}) => {
            let shiftY = `${-scrollTop / 100 / divider}px`;

            $selector.css({
                'margin-top': shiftY
            });
        };

    return {
        mousemove: layers => {
            _setLayers(layers);
            $(window).on(`mousemove`, e => _updateScene(e));
        },

        scroll: layers => {
            _setLayers(layers);
            $(window).on(`scroll`, e => _updateScene(e));
        }
    };

})();

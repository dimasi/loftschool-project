/** 
 * @module carousel
 * Carousel
 * @todo Autoplay
 * */
module.exports = (() => {
    let _params = {
        initialIndex: 0,
        duration: 400,
        type: `horizontal`,
        reverse: false,
        $toggler: false
    };

    /**
     * @param {jQuery} $el
     * @param {object} params
     * @param {jQuery} [params.toggler=false] - Toggle button
     * @param {number} [params.type=`horizontal`] - `horizontal`, `vertical` or `fade`
     * @param {number} [params.reverse=false] - Revers animation
     * @param {number} [params.duration=400] - Scroll animation duration
     * @param {number} [params.initialIndex=0] - Initial slide index
     */
    let _init = ($el, params) => {
        params = Object.assign(_params, params);
        
        let $items = $el.find(`.carousel__item`);

        let carousel = {
            $el: $el,
            $slides: $items,
            slidesCount: $items.length,
            $toggler: params.$toggler,
            currentIndex: params.initialIndex,
            cssShiftProp: _getAnimationProp(params),
            type: params.type == `fade` ? `fade` : `slide`,
            duration: params.duration
        };
        
        _stashSlide(carousel, -1);
        _showSlide(carousel, carousel.currentIndex);
        _setEventListeners(carousel);
    };

    /**
     * Event listeners
     */
    let _setEventListeners = carousel => {
        if (carousel.$toggler) {
            carousel.$toggler.on(`click`, () => _onMoveRequest(carousel));
        }
        carousel.$el.on(`carousel:move`, () => _onMoveRequest(carousel));
    };

    let _onMoveRequest = carousel => {
        if (!carousel.inProcess) {
            carousel.inProcess = true;
            carousel.currentIndex = _move(carousel, carousel.currentIndex);
        }
    };

    /**
     * Move carousel action
     * @returns {number} New index
     */
    let _move = (carousel) => {
        let nextIndex = carousel.currentIndex == carousel.slidesCount - 1 ? 0 : carousel.currentIndex + 1;

        $.when(_stashSlide(carousel, carousel.currentIndex))
        .done(_showSlide(carousel, nextIndex))
        .done(() => {
            carousel.inProcess = false;
            carousel.$el.trigger(`carousel:move:complete`);
        });

        return nextIndex;
    };

    /**
     * Set the animated property in accordance with the parameters
     */
    let _getAnimationProp = params => {
        if (params.type == `vertical`) {
            return params.reverse ? `bottom` : `top`;
        } else {
            return params.reverse ? `right` : `left`;
        }
    };

    /**
     * Stash slide by index
     * @param {string} [index] - Stash all immediately if index is undefined
     */
    let _stashSlide = (carousel, index) => {
        let defer = $.Deferred();

        let rule = {};
        rule[carousel.cssShiftProp] = `-100%`;
        
        if (index < 0) {
            // Immediately stash all slides
            if (carousel.type == `fade`) {
                carousel.$slides.hide();
            }

            if (carousel.type == `slide`) {
                carousel.$slides.css(rule);
                defer.resolve();
            }
        } else {
            if (carousel.type == `fade`) {
                $(carousel.$slides[index]).fadeOut(carousel.duration, () => defer.resolve());
            }

            if (carousel.type == `slide`) {
                rule[carousel.cssShiftProp] = `100%`;

                $(carousel.$slides[index]).animate(rule, carousel.duration, () => {
                    rule[carousel.cssShiftProp] = `-100%`;

                    $(carousel.$slides[index]).css(rule);
                    defer.resolve();
                });
            }
        }

        $(carousel.$slides[index]).css(`z-index`, 1);

        return defer.promise();
    };

    /**
     * Show slide by index
     * @param {string} index
     */
    let _showSlide = (carousel, index) => {
        let defer = $.Deferred();

        if (carousel.type == `fade`) {
            $(carousel.$slides[index]).fadeIn(carousel.duration, () => defer.resolve());
        }

        if (carousel.type == `slide`) {
            let rule = {};
            rule[carousel.cssShiftProp] = `0%`;
            $(carousel.$slides[index]).animate(rule, carousel.duration, () => defer.resolve());
        }

        $(carousel.$slides[index]).css(`z-index`, 2);

        return defer.promise();
    };

    return {
        init: _init
    };
})();

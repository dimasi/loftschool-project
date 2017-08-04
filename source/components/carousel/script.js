/**
 * @module carousel
 * */
const lodashPairs = require('lodash/frompairs');
const lodashEntries = require('lodash/topairs');

export default (() => {
    /**
     * @namespace
     * @property {number}            initialIndex
     * @property {number}            duration
     * @property {string}            type
     * @property {boolean}           reverse
     * @property {boolean|jQuery}    $toggler
     * @private
     */
    let _params = {
        initialIndex: 0,
        duration: 400,
        type: 'horizontal',
        reverse: false,
        $toggler: false
    };

    /**
     * @param {jQuery}   $el
     * @param {object}   params
     * @param {jQuery}   [params.toggler=false]      - Toggle button
     * @param {string}   [params.type='horizontal']  - 'horizontal', 'vertical' or 'fade'
     * @param {boolean}  [params.reverse=false]      - Revers animation
     * @param {number}   [params.duration=400]       - Scroll animation duration
     * @param {number}   [params.initialIndex=0]     - Initial slide index
     */
    let init = ($el, params) => {
        params = Object.assign(_params, params);

        let $items = $el.find('.carousel__item');

        let carousel = {
            $el: $el,
            $slides: $items,
            slidesCount: $items.length,
            $toggler: params.$toggler,
            currentIndex: params.initialIndex,
            cssShiftProp: getAnimationProp(params),
            type: params.type === 'fade' ? 'fade' : 'slide',
            duration: params.duration,
            initialParams: lodashPairs(lodashEntries(params).slice())
        };

        stashSlide(carousel, -1);
        showSlide(carousel, carousel.currentIndex);
        setEventListeners(carousel);
    };

    /**
     * Event listeners
     */
    let setEventListeners = carousel => {
        if (carousel.$toggler) {
            carousel.$toggler.on('click', () => onMoveRequest(carousel));
        }
        carousel.$el.on('carousel:move', () => onMoveRequest(carousel));
        carousel.$el.on('carousel:move:back', () => onMoveBackRequest(carousel));
    };

    /**
     * carousel:move event handler
     * @param carousel
     */
    let onMoveRequest = carousel => {
        if (!carousel.inProcess) {
            carousel.inProcess = true;
            carousel.currentIndex = move(carousel);
        }
    };

    /**
     * carousel:move:back event handler
     * @param carousel
     */
    let onMoveBackRequest = carousel => {
        if (!carousel.inProcess) {
            carousel.inProcess = true;
            carousel.currentIndex = moveBack(carousel);
        }
    };

    /**
     * Scrolls the carousel to the next slide
     * @returns {number} New index
     */
    let move = (carousel) => {
        let nextIndex = carousel.currentIndex === carousel.slidesCount - 1 ? 0 : carousel.currentIndex + 1;

        $.when(stashSlide(carousel, carousel.currentIndex))
            .done(showSlide(carousel, nextIndex))
            .done(() => {
                carousel.inProcess = false;
                carousel.$el.trigger('carousel:move:complete');
            });

        return nextIndex;
    };

    /**
     * Scrolls the carousel to the previous slide
     * @returns {number} New index
     */
    let moveBack = (carousel) => {
        let nextIndex = carousel.currentIndex === 0 ? carousel.slidesCount - 1 : carousel.currentIndex - 1;

        carousel.cssShiftProp = getAnimationProp({
            type: carousel.initialParams.type,
            reverse: !carousel.initialParams.reverse
        });

        flipItemPositionStyles(carousel);

        $.when(stashSlide(carousel, carousel.currentIndex))
            .done(showSlide(carousel, nextIndex))
            .done(() => {
                carousel.inProcess = false;
                carousel.$el.trigger('carousel:move:complete');

                carousel.cssShiftProp = getAnimationProp({
                    type: carousel.initialParams.type,
                    reverse: carousel.initialParams.reverse
                });

                flipItemPositionStyles(carousel);
            });

        return nextIndex;
    };

    /**
     * Flip CSS position property
     * @param carousel
     */
    let flipItemPositionStyles = carousel => {
        carousel.$el.find('.carousel__item').each((index, el) => {
            let style = $(el).attr('style');
            if (style.match(/top/ig)) {
                $(el).attr('style', style.replace('top', 'bottom'));
            } else if (style.match(/bottom/ig)) {
                $(el).attr('style', style.replace('bottom', 'top'));
            } else if (style.match(/right/ig)) {
                $(el).attr('style', style.replace('right', 'left'));
            } else if (style.match(/left/ig)) {
                $(el).attr('style', style.replace('left', 'right'));
            }
        });
    };

    /**
     * Set the animated property in accordance with the parameters
     */
    let getAnimationProp = params => {
        if (params.type == 'vertical') {
            return params.reverse ? 'bottom' : 'top';
        } else {
            return params.reverse ? 'right' : 'left';
        }
    };

    /**
     * Stash slide by index
     * @param carousel
     * @param {number} index - Stash all immediately if index is a negative number
     */
    let stashSlide = (carousel, index) => {
        let defer = $.Deferred();

        let rule = {};
        rule[carousel.cssShiftProp] = '-100%';

        if (index < 0) {
            // Immediately stash all slides
            if (carousel.type === 'fade') {
                carousel.$slides.hide();
            }

            if (carousel.type === 'slide') {
                carousel.$slides.css(rule);
                defer.resolve();
            }
        } else {
            if (carousel.type === 'fade') {
                $(carousel.$slides[index]).fadeOut(carousel.duration, () => defer.resolve());
            }

            if (carousel.type === 'slide') {
                rule[carousel.cssShiftProp] = '100%';

                $(carousel.$slides[index]).animate(rule, carousel.duration, () => {
                    rule[carousel.cssShiftProp] = '-100%';

                    $(carousel.$slides[index]).css(rule);
                    defer.resolve();
                });
            }
        }

        $(carousel.$slides[index]).css('z-index', 1);

        return defer.promise();
    };

    /**
     * Show slide by index
     * @param carousel
     * @param {number} index
     */
    let showSlide = (carousel, index) => {
        let defer = $.Deferred();

        if (carousel.type === 'fade') {
            $(carousel.$slides[index]).fadeIn(carousel.duration, () => defer.resolve());
        }

        if (carousel.type === 'slide') {
            let rule = {};
            rule[carousel.cssShiftProp] = '0%';
            $(carousel.$slides[index]).animate(rule, carousel.duration, () => defer.resolve());
        }

        $(carousel.$slides[index]).css('z-index', 2);

        return defer.promise();
    };

    return {
        init: init
    };
})();

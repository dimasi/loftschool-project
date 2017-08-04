/**
 * @module stickBlock
 */
export default (() => {
    /**
     * Initialize
     * @param {jQuery} $elements
     */
    let init = $elements => {
        $elements.each((index, item) => {
            /**
             * @namespace
             * @property {HTMLElement}   el
             * @property {jQuery}        $el
             * @property {boolean}       isFixed
             * @property {number}        staticTopOffset
             */
            let stickBlock = {
                el: item,
                $el: $(item),
                isFixed: false
            };
            refresh(stickBlock);
            setEventListeners(stickBlock);
        });
    };

    /**
     * Set event listeners
     * @param stickBlock
     */
    let setEventListeners = stickBlock => {
        $(window).scroll(() => checkScroll(stickBlock));
        $(window).resize(() => refresh(stickBlock));
    };

    /**
     * Update block static offset and position
     * @param stickBlock
     */
    let refresh = stickBlock => {
        updateItemStaticOffset(stickBlock);
        checkScroll(stickBlock);
    };

    /**
     * Update block static offset
     * @param stickBlock
     */
    let updateItemStaticOffset = stickBlock => {
        if (stickBlock.isFixed) {
            blockStatic(stickBlock);
            stickBlock.staticTopOffset = stickBlock.$el.offset().top;
            blockFixed(stickBlock);
        } else {
            stickBlock.staticTopOffset = stickBlock.$el.offset().top;
        }
    };

    /**
     * Update position
     * @param stickBlock
     */
    let checkScroll = stickBlock => {
        if ($(window).scrollTop() > stickBlock.staticTopOffset && !stickBlock.isFixed) blockFixed(stickBlock);
        if ($(window).scrollTop() < stickBlock.staticTopOffset && stickBlock.isFixed) blockStatic(stickBlock);
    };

    /**
     * Make a static block
     * @param stickBlock
     */
    let blockStatic = stickBlock => {
        stickBlock.$el.css({
            position: 'static'
        });
        stickBlock.isFixed = false;
    };

    /**
     * Make a fixed block
     * @param stickBlock
     */
    let blockFixed = stickBlock => {
        stickBlock.$el.css({
            position: 'fixed',
            top: 0
        });
        stickBlock.isFixed = true;
    };

    return {
        init: init
    };
})();

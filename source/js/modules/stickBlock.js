/** 
 * @module stickBlock
 * Stick block
 * */
module.exports = (() => {
    let _$elements = $();

    /** Initialize */
    let _init = $elements => {
        $elements.each((index, item) => {
            $(item).data(`static-offset`, $(item).offset().top);
        });
        
        _$elements = _$elements.add($elements);
        
        _checkScroll();
        $(window).scroll(_checkScroll);
    };

    /** Check scroll */
    let _checkScroll = () => {
        _$elements.each((index, item) => {
            let isFixed = $(item).css(`position`) == `fixed`;
            let itemStaticOffset = $(item).data(`static-offset`);

            if ($(window).scrollTop() > itemStaticOffset && !isFixed) { 
                $(item).css({
                    position: `fixed`, 
                    top: 0
                });
            }

            if ($(window).scrollTop() < itemStaticOffset && isFixed) { 
                $(item).css({
                    position: `static`
                });
            } 
        });
    };

    return {
        init: _init
    };
})();

/**
 * @module textFx
 * Effects for strings
 */
export default (() => {
    /**
     * Show characters one by one
     * @param    {string}       str
     * @param    {object}       options
     * @param    {number}       options.delay
     * @param    {number}       options.duration
     * @returns  {string}       HTML
     */
    let _charsOneByOne = (str, options) => {
        /**
         * @namespace
         * @property     {number}        delay
         * @property     {number}        duration
         */
        options = Object.assign({
            delay: 30,
            duration: 70
        }, options);

        let transitionRule;
        let $chars = splitChars(str).map((wrappedChar, index) => {
            transitionRule = `opacity ${options.duration}ms linear ${options.delay * (index + 1)}ms`;
            return $(wrappedChar).addClass('text-fx__item').css('transition', transitionRule);
        }).reduce(($prevItem, $curItem) => {
            return $prevItem.add($curItem);
        });

        return $(`<span class='text-fx text-fx_chars-one-by-one'></span>`).html($chars);
    };

    /**
     * Wrap each character in a separate tag
     * @param    {string}        str
     * @param    {string}        [tagName='span']
     * @returns  {Array}         Array of symbols
     */
    let splitChars = (str, tagName) => {
        tagName = tagName || 'span';

        return str.split('').map(char => {
            return `<${tagName}>${char}</${tagName}>`;
        });
    };

    return {
        charsOneByOne: _charsOneByOne
    };
})();

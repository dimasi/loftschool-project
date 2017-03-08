/** 
 * @module textFx
 * Effects for strings
 * */
module.exports = (() => {
    /**
     * Create an HTML markup for text effect
     * @param {array} str - Target string
     * @param {object} options - Effect parameters 
     * @param {number} options.delay - The delay between showing chars
     * @param {number} options.duration - Opacity transition duration
     * @returns {string} HTML markup
     */
    let _charsOneByOne = (str, options) => {
        options = Object.assign({
            delay: 30,
            duration: 70
        }, options);

        let transitionRule;
        let $chars = _splitChars(str).map((wrappedChar, index) => {
            transitionRule = `opacity ${options.duration}ms linear ${options.delay * (index + 1)}ms`;
            return $(wrappedChar).addClass(`chars-one-by-one__item`).css(`transition`, transitionRule);
        }).reduce(($prevItem, $curItem) => {
            return $prevItem.add($curItem);
        });

        return $(`<span class='chars-one-by-one'></span>`).html($chars);
    };

    /**
     * Wrap each character in a custom tag
     * @param {string} str
     * @returns {array} Array of characters wrapped into some tag
     */
    let _splitChars = (str, tagName) => {
        tagName = tagName || `span`;

        return str.split(``).map(char => {
            return `<${tagName}>${char}</${tagName}>`;
        });
    };

    return {
        charsOneByOne: _charsOneByOne
    };
})();

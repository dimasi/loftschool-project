const textFx = require('Modules/textFx');
const carousel = require('Modules/carousel');

/** 
 * @module comboSlider
 * Combo slider for portfolio
 * */
module.exports = (() => {
    let _params = {
        duration: 300,
        initialIndex: 0
    };

    /** Initialize */
    let _init = ($el, params) => {
        params = Object.assign(_params, params);

        let comboSlider = {
            $el: $el,
            $toggler: $el.find(`.combo-slider__nav-btn`),
            $info: $el.find(`.combo-slider__slide-info`),
            $title: $el.find(`.combo-slider__slide-title`),
            $features: $el.find(`.combo-slider__work-features`),
            $slideLink: $el.find(`.combo-slider__slide-link`),
            data: _parseData($el),
            duration: params.duration,
            currentIndex: params.initialIndex
        };
        comboSlider.slidesCount = comboSlider.data.length;
        
        _createSubSliders(comboSlider);
        _updateInfo(comboSlider, comboSlider.currentIndex);
    };

    /**
     * Create sub-sliders
     */
    let _createSubSliders = comboSlider => {
        let $mainSlider = comboSlider.$el.find(`.combo-slider__main-slider`);
        let $prevBtnSlider = comboSlider.$el.find(`.combo-slider__nav-btn_slider_prev .combo-slider__nav-slider`);
        let $nextBtnSlider = comboSlider.$el.find(`.combo-slider__nav-btn_slider_next .combo-slider__nav-slider`);
        comboSlider.$navSliders = $mainSlider.add($prevBtnSlider).add($nextBtnSlider);

        let $item;
        comboSlider.data.forEach(item => {
            $item = $(`<span class='carousel__item'></span>`).append(_createImage(item.imgSrc, `carousel__img`));
            comboSlider.$navSliders.append($item);
        });
        
        carousel.init($mainSlider, {
            type: `fade`,
            initialIndex: comboSlider.currentIndex
        });
        
        carousel.init($prevBtnSlider, {
            type: `vertical`,
            initialIndex: comboSlider.currentIndex - 1 < 0 ? comboSlider.slidesCount -1 : comboSlider.currentIndex - 1 
        });
        
        carousel.init($nextBtnSlider, {
            type: `vertical`,
            reverse: true,
            initialIndex: comboSlider.currentIndex + 1 >= comboSlider.slidesCount ? 0 : comboSlider.currentIndex + 1
        });

        _setEventListeners(comboSlider);
    };

    let _setEventListeners = comboSlider => {
        comboSlider.$toggler.on(`click`, () => _onChangeRequest(comboSlider));
    };

    let _onChangeRequest = comboSlider => {
        if (!comboSlider.inProcess) {
            comboSlider.inProcess = true;
            comboSlider.currentIndex = _move(comboSlider, comboSlider.currentIndex);
        }
    };

    let _move = comboSlider => {
        let nextIndex = comboSlider.currentIndex == comboSlider.slidesCount - 1 ? 0 : comboSlider.currentIndex + 1;

        let endActionsCounter = 0;

        comboSlider.$navSliders.on(`carousel:move:complete`, () => comboSlider.$el.trigger(`change:complete`));

        comboSlider.$el.on(`change:complete`, () => {
            endActionsCounter++;

            if (endActionsCounter == 4) {
                comboSlider.inProcess = false;
            }
        });

        comboSlider.$navSliders.trigger(`carousel:move`);
        _updateInfo(comboSlider, nextIndex);

        return nextIndex;
    };

    let _updateInfo = (comboSlider, index) => {
        let $charsOneByOne = textFx.charsOneByOne(comboSlider.data[index].title);

        comboSlider.$info.removeClass(`combo-slider__slide-info_state_active`);

        // Set title
        comboSlider.$title.html($charsOneByOne);

        // Set features
        comboSlider.$features.html(``);
        comboSlider.data[index].features.forEach(item => {
            comboSlider.$features.append(`<li class='work-features__item'>${item}</li>`);
        });
        
        // Set button link
        comboSlider.$slideLink.attr(`href`, comboSlider.data[index].link);

        setTimeout(() => {
            $charsOneByOne.addClass(`chars-one-by-one_state_active`);
            comboSlider.$info.addClass(`combo-slider__slide-info_state_active`);
            comboSlider.$el.trigger(`change:complete`);
        }, 150);
    };

    /**
     * Create image
     */
    let _createImage = (src, className) => {
        return $(`<img>`).attr(`src`, src).addClass(className);
    };

    /**
     * Parsing data from inner .slider-data element
     */
    let _parseData = $el => {
        let $sliderData = $el.find(`.slider-data__item`);

        let data = $sliderData.toArray().map(item => {
            let $item = $(item);

            return {
                link: $item.data(`link`),
                imgSrc: $item.find(`.slider-data__img`).attr(`src`),
                title: $item.find(`.slider-data__title`).text(),
                features: $item.find(`.slider-data__feature`).toArray().map(feature => {
                    return $(feature).text();
                })
            };
        });

        $sliderData.remove();

        return data;
    };

    return {
        init: _init
    };
})();

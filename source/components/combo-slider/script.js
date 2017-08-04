/**
 * @module comboSlider
 */
import textFx from 'Components/text-fx/script';
import carousel from 'Components/carousel/script';

export default (() => {
    let _params = {
        duration: 300,
        initialIndex: 0
    };

    /**
     * Initialize
     * @param $el
     * @param params
     */
    let init = ($el, params) => {
        params = Object.assign(_params, params);

        let comboSlider = {
            $el: $el,
            $togglerNext: $el.find('.combo-slider__nav-btn_slider_next'),
            $togglerPrev: $el.find('.combo-slider__nav-btn_slider_prev'),
            $info: $el.find('.combo-slider__slide-info'),
            $title: $el.find('.combo-slider__slide-title'),
            $features: $el.find('.combo-slider__work-techs'),
            $slideLink: $el.find('.combo-slider__slide-link'),
            $slideGithubLink: $el.find('.combo-slider__slide-github-link'),
            data: parseData($el),
            duration: params.duration,
            currentIndex: params.initialIndex
        };
        comboSlider.slidesCount = comboSlider.data.length;

        createSubSliders(comboSlider);
        updateInfo(comboSlider, comboSlider.currentIndex);
    };

    /**
     * Creates a carousel (main and navigation buttons)
     * @param comboSlider
     */
    let createSubSliders = comboSlider => {
        let $mainSlider = comboSlider.$el.find('.combo-slider__main-slider');
        let $prevBtnSlider = comboSlider.$el.find('.combo-slider__nav-btn_slider_prev .combo-slider__nav-slider');
        let $nextBtnSlider = comboSlider.$el.find('.combo-slider__nav-btn_slider_next .combo-slider__nav-slider');
        comboSlider.$navSliders = $mainSlider.add($prevBtnSlider).add($nextBtnSlider);

        let $item;
        comboSlider.data.forEach(item => {
            $item = $('<span class="carousel__item"></span>').append(createImage(item.imgSrc, 'carousel__img'));
            comboSlider.$navSliders.append($item);
        });

        carousel.init($mainSlider, {
            type: 'fade',
            initialIndex: comboSlider.currentIndex
        });

        carousel.init($prevBtnSlider, {
            type: 'vertical',
            initialIndex: comboSlider.currentIndex - 1 < 0 ? comboSlider.slidesCount -1 : comboSlider.currentIndex - 1
        });

        carousel.init($nextBtnSlider, {
            type: 'vertical',
            reverse: true,
            initialIndex: comboSlider.currentIndex + 1 >= comboSlider.slidesCount ? 0 : comboSlider.currentIndex + 1
        });

        setEventListeners(comboSlider);
    };

    /**
     * Set event listeners
     * @param comboSlider
     */
    let setEventListeners = comboSlider => {
        comboSlider.$togglerNext.on('click', () => onMoveRequest(comboSlider));
        comboSlider.$togglerPrev.on('click', () => onMoveBackRequest(comboSlider));
    };

    /**
     * Move event handler
     * @param comboSlider
     */
    let onMoveRequest = comboSlider => {
        if (!comboSlider.inProcess) {
            comboSlider.inProcess = true;
            comboSlider.currentIndex = move(comboSlider, comboSlider.currentIndex);
        }
    };

    /**
     * Move back event handler
     * @param comboSlider
     */
    let onMoveBackRequest = comboSlider => {
        if (!comboSlider.inProcess) {
            comboSlider.inProcess = true;
            comboSlider.currentIndex = moveBack(comboSlider, comboSlider.currentIndex);
        }
    };

    /**
     * Move all carousels
     * @param comboSlider
     * @returns {number}
     */
    let move = comboSlider => {
        let nextIndex = comboSlider.currentIndex === comboSlider.slidesCount - 1 ? 0 : comboSlider.currentIndex + 1;

        let endActionsCounter = 0;

        comboSlider.$navSliders.on('carousel:move:complete', () => comboSlider.$el.trigger('change:complete'));

        comboSlider.$el.on('change:complete', () => {
            endActionsCounter++;

            if (endActionsCounter === 4) {
                comboSlider.inProcess = false;
            }
        });

        comboSlider.$navSliders.trigger('carousel:move');
        updateInfo(comboSlider, nextIndex);

        return nextIndex;
    };

    /**
     * Move all carousels back
     * @param comboSlider
     * @returns {number}
     */
    let moveBack = comboSlider => {
        let nextIndex = comboSlider.currentIndex === 0 ? comboSlider.slidesCount - 1 : comboSlider.currentIndex - 1;

        let endActionsCounter = 0;

        comboSlider.$navSliders.on('carousel:move:complete', () => comboSlider.$el.trigger('change:complete'));

        comboSlider.$el.on('change:complete', () => {
            endActionsCounter++;

            if (endActionsCounter === 4) {
                comboSlider.inProcess = false;
            }
        });

        comboSlider.$navSliders.trigger('carousel:move:back');
        updateInfo(comboSlider, nextIndex);

        return nextIndex;
    };

    /**
     * Update information block
     * @param comboSlider
     * @param index
     */
    let updateInfo = (comboSlider, index) => {
        let $charsOneByOne = textFx.charsOneByOne(comboSlider.data[index].title);

        comboSlider.$info.removeClass('combo-slider__slide-info_state_active');

        // Set title
        comboSlider.$title.html($charsOneByOne);

        // Set features
        comboSlider.$features.html('');
        comboSlider.data[index].features.forEach(item => {
            comboSlider.$features.append(`<li class="combo-slider__work-tech">${item}</li>`);
        });

        // Set button link
        comboSlider.$slideLink.attr('href', comboSlider.data[index].link);

        // Set github link
        if (comboSlider.data[index].githubLink) {
            comboSlider.$slideGithubLink.attr('href', comboSlider.data[index].githubLink).show();
        } else {
            comboSlider.$slideGithubLink.attr('href', '#').hide();
        }

        setTimeout(() => {
            $charsOneByOne.addClass('text-fx_active');
            comboSlider.$info.addClass('combo-slider__slide-info_state_active');
            comboSlider.$el.trigger('change:complete');
        }, 150);
    };

    /**
     * Create image
     * @param src
     * @param className
     * @returns {*|jQuery}
     */
    let createImage = (src, className) => {
        return $('<img>').attr('src', src).addClass(className);
    };

    /**
     * Parse data from inner slider data
     * @param $el
     */
    let parseData = $el => {
        let $sliderData = $el.find('.slider-data__item');

        let data = $sliderData.toArray().map(item => {
            let $item = $(item);

            return {
                link: $item.data('link'),
                githubLink: $item.data('github-link') || false,
                imgSrc: $item.find('.slider-data__img').attr('src'),
                title: $item.find('.slider-data__title').text(),
                features: $item.find('.slider-data__tech').toArray().map(feature => {
                    return $(feature).text();
                })
            };
        });

        $sliderData.remove();

        return data;
    };

    return {
        init: init
    };
})();

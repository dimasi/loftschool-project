/** 
 * @module tabs
 * Tabs
 * */
module.exports = (() => {
    let _params = {
        tabsChangeDuration: 500
    };

    /**
     * @param {object} params
     * @param {string} params.navLinkSelector - Tabs navigation link selector
     * @param {string} params.tabSelector - Tab selector
     * @param {string} params.navLinkActiveClass - Active classname for active navigation link 
     * @param {number} [params.tabsChangeDuration=500] - Summary duration in ms for tabs change
     */
    let _init = params => {
        let tabs = Object.assign(_params, params);
        
        _setInitialState(tabs);
        _setEventListeners(tabs);
    };

    /**
     * Set initial active tab
     */
    let _setInitialState = tabs => {
        let $navLinks = $(tabs.navLinkSelector);
        let $activeNavLink = $navLinks.filter(`.${tabs.navLinkActiveClass}`);
        if (!$activeNavLink.length) {
            $activeNavLink = $navLinks.first();
        } else {
            $activeNavLink = $activeNavLink.first();
        }

        $activeNavLink.removeClass(tabs.navLinkActiveClass);
        $(tabs.tabSelector).hide();
        _showTab(tabs, $activeNavLink);
    };

    /**
     * Event listeners
     */
    let _setEventListeners = tabs => {
        $(document).on(`click`, tabs.navLinkSelector, e => {
            e.preventDefault();
            if (!tabs.inProccess) {
                _showTab(tabs, $(e.currentTarget));
            }
        });
    };

    /**
     * Tab change
     */
    let _showTab = (tabs, $targetNavLink) => {
        let fadeDuration = tabs.tabsChangeDuration / 2;
        let $targetTab = $($targetNavLink.attr(`href`) || $targetNavLink.data(`target`));
        let $activeNavLink = $(`.${tabs.navLinkActiveClass}`);
        let $currentActiveTab = $($activeNavLink.attr(`href`) || $activeNavLink.data(`target`));

        if (!$targetNavLink.is($activeNavLink)) {
            tabs.inProccess = true;
            $activeNavLink.removeClass(tabs.navLinkActiveClass);
            $targetNavLink.addClass(tabs.navLinkActiveClass);

            if ($currentActiveTab.length) {
                $currentActiveTab.fadeOut(fadeDuration, () => {
                    $targetTab.fadeIn(fadeDuration, () => {
                        tabs.inProccess = false;
                    });
                });
            } else {
                $targetTab.fadeIn(fadeDuration, () => {
                    tabs.inProccess = false;
                });
            }
        }
    };

    return {
        init: _init
    };
})();

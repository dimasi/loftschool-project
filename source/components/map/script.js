let loadGoogleMapsApi = require(`load-google-maps-api-2`);
loadGoogleMapsApi.key = MAPS_KEY;

/**
 * @module map
 * */
export default (() => {
    let breakpoints = {
        desktop: [1200, Infinity],
        tabletLandscape: [975, 1199],
        tablet: [768, 974],
        mobile: [-Infinity, 767]
    };

    let _params = {
        mapCenterCoords: {
            desktop: {
                lat: 55.013060,
                lng: 82.910846
            },
            tabletLandscape: {
                lat: 55.013060,
                lng: 82.910846
            },
            tablet: {
                lat: 55.012962,
                lng: 82.917884
            },
            mobile: {
                lat: 55.012739,
                lng: 82.928628
            }
        },
        markerCoords: {
            lat: 55.012739,
            lng: 82.928628
        },
        markerImage: require(`Components/map/images/map-marker.png`),
        styles: [
            {
                featureType: `landscape`,
                stylers: [{
                    color: `#f2f2f2`
                }]
            },
            {
                featureType: `water`,
                stylers: [{
                    color: `#4369aa`
                }]
            },
            {
                featureType: `water`,
                elementType: `labels.text`,
                stylers: [{
                    visibility: `off`
                }]
            },
            {
                featureType: `road.arterial`,
                stylers: [{
                    color: `#ffffff`
                }]
            },
            {
                featureType: `road.arterial`,
                elementType: `geometry.stroke`,
                stylers: [{
                    color: `#eaeaea`
                }]
            },
            {
                featureType: `road.local`,
                stylers: [{
                    color: `#eaeaea`
                }]
            },
            {
                featureType: `road`,
                stylers: [{
                    visibility: `simplified`
                }]
            },
            {
                featureType: `road.highway`,
                stylers: [{
                    color: `#d6d6d6`
                }]
            },
            {
                featureType: `road.highway`,
                elementType: `labels.text`,
                stylers: [{
                    visibility: `off`
                }]
            },
            {
                featureType: `transit`,
                stylers: [{
                    visibility: `off`
                }]
            },
            {
                elementType: `labels.text.stroke`,
                stylers: [{
                    color: `#ffffff`
                }]
            },
            {
                elementType: `labels.text.fill`,
                stylers: [{
                    color: `#b9b9b9`
                }]
            },
            {
                featureType: `road`,
                elementType: `labels.icon`,
                stylers: [{
                    visibility: `off`
                }]
            },
            {
                featureType: `poi`,
                stylers: [{
                    visibility: `off`
                }]
            },
            {
                featureType: `administrative`,
                stylers: [{
                    visibility: `off`
                }]
            },
            {
                featureType: `administrative.locality`,
                stylers: [{
                    visibility: `on`
                }]
            },
            {
                featureType: `administrative.locality`,
                elementType: `labels.text.fill`,
                stylers: [{
                    color: `#424241`
                }]
            }
        ]
    };

    /**
     * @param {HTMLElement} el
     * @param {object} params
     */
    let init = (el, params) => {
        _params = Object.assign(_params, params);

        loadGoogleMapsApi().then(googleMaps => {
            let map = new googleMaps.Map(el, {
                center: _params.mapCenterCoords[getCurrentBreakpointName()],
                scrollwheel: false,
                zoom: 15,
                disableDefaultUI: true
            });

            new googleMaps.Marker({
                position: _params.markerCoords,
                map: map,
                icon: _params.markerImage
            });

            map.setOptions({styles: _params.styles});
        }).catch(err => {
            console.error(err);
        });
    };

    /**
     * Return current breakpoint name
     * @returns {string}
     */
    let getCurrentBreakpointName = () => {
        let windowWidth = window.innerWidth;
        for (let breakpoint in breakpoints) {
            if (windowWidth >= breakpoints[breakpoint][0] && windowWidth <= breakpoints[breakpoint][1]) {
                return breakpoint;
            }
        }
    };

    return {
        init: init
    };
})();

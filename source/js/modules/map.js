let loadGoogleMapsApi = require(`load-google-maps-api-2`);
loadGoogleMapsApi.key = `AIzaSyCbvw7Kset1Cx4fTl3EQZkL0VFdlSpJnaY`;

/** 
 * @module map
 * */
module.exports = (() => {
    let _params = {
        mapCenterCoords: {
            lat: 55.013060, 
            lng: 82.910846
        },
        markerCoords: {
            lat: 55.012739, 
            lng: 82.928628
        },
        markerImage: require(`Images/map-marker.png`),
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
    let _init = (el, params) => {
        _params = Object.assign(_params, params);

        loadGoogleMapsApi().then(googleMaps => {
            let map = new googleMaps.Map(el, {
                center: _params.mapCenterCoords,
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

    return {
        init: _init
    };

})();

function ready(cb) {
    /in/.test(document.readyState)
        ? setTimeout(ready.bind(null, cb), 90)
        : cb();
};

var App;
ready(function(){

    App = {
        "init": function () {
            window.mobileAndTabletcheck();
            this.bindEventListeners();
            App.nav.init();
            App.sidebar.init();
            App.contact.init();
            App.header.init();
            App.intro.init();
        },
        "bindEventListeners":function(){

        },
        "header": {
            "state":false,
            "init":function(){
                if(document.querySelector('.overview-toggle')){
                    App.header.bindEventListeners();
                }
            },
            "bindEventListeners":function(){
                var gridIcon = document.querySelector('.overview-toggle');
                gridIcon.addEventListener("mouseover", function () {
                    gridIcon.classList.remove("offhover");
                    gridIcon.classList.add("hover");
                    gridIcon.classList.add("link");
                });
                gridIcon.addEventListener("mouseleave", function () {
                    gridIcon.classList.remove("hover");
                    gridIcon.classList.remove("link");
                    gridIcon.classList.add("offhover");
                });
                gridIcon.addEventListener("click", function () {
                    window.history.back();
                })
            }
        },
        "nav":{
            "state":false,
            "init":function(){
                if(document.querySelector('.menu-toggle.menu')){
                    App.nav.bindEventListeners();
                }
            },
            "bindEventListeners":function(){
                //console.log("Binding Menu events");
                var icon = document.querySelector('.menu-toggle.menu');
                icon.addEventListener("click", function () {
                    var self = this;
                    App.nav.toggleNavigation();
                });
            },
            'toggleNavigation':function(){
                var icon = document.querySelector('.menu-toggle.menu');
                var body = document.querySelector('body');
                var navigation = document.querySelector('.navigation');
                if (App.nav.state) {
                    icon.classList.remove("active");
                    body.classList.remove("nav-open");
                    navigation.classList.remove("active");
                    App.nav.state = false;
                } else {
                    body.classList.add("nav-open");
                    icon.classList.add("active");
                    navigation.classList.add("active");
                    App.nav.state = true;
                }
            },
        },
        "sidebar":{
            "state":false,
            "shareState":false,
            "init":function(){
                if(document.querySelector('.sidebar-toggle')){
                    App.sidebar.bindEventListeners();
                }
            },
            "bindEventListeners":function(){
                //console.log('Binding sidebar events');

                var closer = document.querySelector('.sidebar-toggle');
                var shareToggle = document.querySelector('.share-toggle');
                var shareBox = document.querySelector('.share-container');
                var sidebar = document.querySelector('.sidebarContainer');
                var sidebarBox = document.querySelector('.sidebarContainer .bg-box');
                var content = document.querySelector('.detail-page-container');
                closer.addEventListener("click", function () {
                    if (App.sidebar.state) {
                        sidebar.classList.remove("shrink");
                        content.classList.remove("grow");
                        App.sidebar.state = false;
                    } else{
                        sidebar.classList.add("shrink");
                        content.classList.add("grow");
                        App.sidebar.state = true;
                    }
                });
                sidebarBox.addEventListener("click", function () {
                    if (App.sidebar.state) {
                        sidebar.classList.remove("shrink");
                        content.classList.remove("grow");
                        App.sidebar.state = false;
                    }
                });
                if(window.mobileAndTabletcheck()){
                    shareToggle.addEventListener("touchstart", function () {
                        var timout;
                        if (!App.sidebar.shareState) {
                            shareToggle.classList.add('active');
                            App.sidebar.shareState = true;
                        } else {
                            shareToggle.classList.remove('active');
                            App.sidebar.shareState = false;
                        }
                    });
                } else {
                    shareToggle.addEventListener("mouseenter", function () {
                        var timout;
                        if (!App.sidebar.shareState) {
                            shareToggle.classList.add('active');
                            App.sidebar.shareState = true;
                        }
                        shareBox.addEventListener("mouseleave", function () {
                            timout = setTimeout(function () {
                                shareToggle.classList.remove('active');
                                App.sidebar.shareState = false;
                            }, 3000);
                        });
                        shareBox.addEventListener("mouseenter", function () {
                            clearTimeout(timout);
                        });
                    });
                }
            }
        },
        'contact': {
            "init":function(){
                if(document.querySelector('.contact-form')){
                    App.contact.bindEventListeners();
                }
            },
            "bindEventListeners":function(){
                if(document.querySelector('#gmap')){
                    App.contact.map.load();
                }
            },
            "map":{
                "initialised":false,
                "initGoogleMaps":function(){
                    this.initialised = true;
                    App.contact.map.init();
                },
                "init":function(){
                    var myLatlng = new google.maps.LatLng(51.0873012,3.667899); // Add the coordinates

                    var mapOptions = {
                        zoom:15,
                        center: new google.maps.LatLng(51.0873012,3.667899),
                        panControl: false,
                        mapTypeControl: false,
                        scaleControl: false,
                        streetViewControl: false,
                        overviewMapControl: false,
                        zoomControl: false,
                        styles: [
                            {
                                "featureType": "all",
                                "elementType": "labels.text.fill",
                                "stylers": [
                                    {
                                        "visibility": "on"
                                    },
                                    {
                                        "color": "#1a1a1a"
                                    }
                                ]
                            },
                            {
                                "featureType": "all",
                                "elementType": "labels.text.stroke",
                                "stylers": [
                                    {
                                        "visibility": "on"
                                    },
                                    {
                                        "weight": 0.9
                                    }
                                ]
                            },
                            {
                                "featureType": "all",
                                "elementType": "labels.icon",
                                "stylers": [
                                    {
                                        "visibility": "off"
                                    }
                                ]
                            },
                            {
                                "featureType": "administrative",
                                "elementType": "geometry",
                                "stylers": [
                                    {
                                        "color": "#f2f2f2"
                                    },
                                    {
                                        "weight": 0.7
                                    }
                                ]
                            },
                            {
                                "featureType": "administrative",
                                "elementType": "geometry.fill",
                                "stylers": [
                                    {
                                        "visibility": "on"
                                    }
                                ]
                            },
                            {
                                "featureType": "landscape",
                                "elementType": "geometry",
                                "stylers": [
                                    {
                                        "color": "#f2f2f2"
                                    }
                                ]
                            },
                            {
                                "featureType": "poi",
                                "elementType": "labels",
                                "stylers": [
                                    {
                                        "visibility": "off"
                                    }
                                ]
                            },
                            {
                                "featureType": "road.highway",
                                "elementType": "geometry",
                                "stylers": [
                                    {
                                        "color": "#ee9900"
                                    }
                                ]
                            },
                            {
                                "featureType": "road.arterial",
                                "elementType": "geometry",
                                "stylers": [
                                    {
                                        "color": "#00aacc"
                                    },
                                    {
                                        "lightness": -20
                                    }
                                ]
                            },
                            {
                                "featureType": "road.local",
                                "elementType": "geometry",
                                "stylers": [
                                    {
                                        "color": "#00aacc"
                                    },
                                    {
                                        "lightness": -17
                                    }
                                ]
                            },
                            {
                                "featureType": "transit",
                                "elementType": "geometry",
                                "stylers": [
                                    {
                                        "color": "#bbcc00"
                                    },
                                    {
                                        "lightness": -10
                                    }
                                ]
                            },
                            {
                                "featureType": "water",
                                "elementType": "geometry",
                                "stylers": [
                                    {
                                        "color": "#00aacc"
                                    }
                                ]
                            }
                        ],
                        scrollwheel: false
                    }
                    App.contact.map._map = new google.maps.Map(document.querySelector('#gmap'), mapOptions);
                    google.maps.visualRefresh = true;
                    google.maps.event.trigger(App.contact.map._map, 'resize');
                    App.contact.map._geoLocationMarker = new google.maps.Marker({
                        position: myLatlng,
                        icon: '/assets/img/logo/marker.png',
                        title: 'Arteveldehogeschool Campus Mariakerke.',
                        size: new google.maps.Size(35, 32),
                    });
                    var contentString = '<div class="map-marker-info">' +
                        '<h4>Arteveldehogeschool Campus Mariakerke</h4>'+
                        '<p>Industrieweg 232 - 9030 Gent<br>Belgie '+
                        '<br>T. +32(0)9 234 86 00'+
                        '</p>'+
                        ''+
                        '</div>';

                    var infowindow = new google.maps.InfoWindow({
                        content: contentString
                    });
                    google.maps.event.addListener(App.contact.map._geoLocationMarker, 'click', function() {
                        infowindow.open(App.contact.map._map,App.contact.map._geoLocationMarker);
                    });
                    App.contact.map._geoLocationMarker.setMap(App.contact.map._map);
                    window.onresize = function(event) {
                        App.contact.map.resize(myLatlng);
                    }
                    App.contact.map.controlBind();

                },
                "load":function(){
                    var key = 'AIzaSyBdn8xMIp4qHAWal3I2VZ9QfxmS4UvWCGg'; // Use your own Key!
                    //Load Google Maps Async
                    var script = document.createElement('script');
                    script.type = 'text/javascript';
                    script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp'
                        + '&key=' + key
                        + '&callback=App.contact.map.initGoogleMaps';
                    document.body.appendChild(script);

                },
                'resize': function(myLatlng){
                    google.maps.event.trigger(App.contact.map._map, 'resize');
                    App.contact.map._map.setCenter(myLatlng);
                },
                'controlBind':function(){
                    google.maps.event.addDomListener(zoomout, 'click', function() {
                        var currentZoomLevel = App.contact.map._map.getZoom();
                        if(currentZoomLevel != 0){
                            App.contact.map._map.setZoom(currentZoomLevel - 1);}
                    });

                    google.maps.event.addDomListener(zoomin, 'click', function() {
                        var currentZoomLevel = App.contact.map._map.getZoom();
                        if(currentZoomLevel != 21){
                            App.contact.map._map.setZoom(currentZoomLevel + 1);}
                    });
                }
            },
        },
        'intro':{
            'init':function(){
                if(document.querySelector('.intro-page')){
                    App.intro.bindEventListeners();
                    document.querySelector('.wrapper').classList.add("intro-animating");
                }
            },
            'bindEventListeners':function(){
                var btn = document.querySelector('.intro-continue-button');
                btn.addEventListener("click", function () {
                    var self = this;
                    App.intro.hide();
                });
                setTimeout(function(){
                    App.intro.hide();
                },20000);
            },
            'hide':function(){
                document.querySelector('.intro-page').classList.add("hide");
                document.querySelector('.wrapper').classList.add("popin");
                setTimeout(function(){
                    document.querySelector('.wrapper').classList.remove("intro-animating");
                },800);
            }

        }
    };

    App.init();

});
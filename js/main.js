function ready(cb) {
    /in/.test(document.readyState)
        ? setTimeout(ready.bind(null, cb), 90)
        : cb();
};

var App;
ready(function(){

    App = {
        "init": function () {
            this.bindEventListeners();
            App.nav.init();
            App.sidebar.init();
        },
        "bindEventListeners":function(){

        },
        "nav":{
            "state":false,
            "init":function(){
                if(document.querySelector('.menu-toggle')){
                    App.nav.bindEventListeners();
                }
            },
            "bindEventListeners":function(){
                var icon = document.querySelector('.menu-toggle.menu');
                icon.addEventListener("click", function () {
                    var self = this;
                    if (App.nav.state) {
                        self.classList.remove("active");
                        App.nav.state = false;
                    } else {
                        self.classList.add("active");
                        App.nav.state = true;
                    }
                });
            }
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
                console.log('Binding sidebar events');

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
                if(mobileAndTabletcheck()){
                    shareToggle.addEventListener("mouseenter", function () {
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
        }
    };

    App.init();

});
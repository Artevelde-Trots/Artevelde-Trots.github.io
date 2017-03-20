(function () {
    App = {
        "init": function () {
            App.nav.init();
            App.intro.init();
            App.text.init();
            App.fullscreen.init();
        },
        "nav": {
            "state": false,
            "init": function () {
                if (document.querySelector('.menu')) {
                    App.nav.bindEventListeners();
                }
            },
            "bindEventListeners": function () {
                var menuItems = document.querySelector('.menu-items');
                var items = menuItems.querySelectorAll('.nav-item > a');
                var gridIcon = document.querySelector('.overview-toggle');
                var menuIcon = document.querySelector('.menu-toggle');
                var shareIcon = document.querySelector('.share-toggle');
            
                document.addEventListener('slidechanged', function (event) {
                    App.nav.activeItem();
                });

                shareIcon.addEventListener("click", function () {
                    App.nav.share();
                });

                menuIcon.addEventListener("click", function () {
                    App.nav.toggleNavigation();
                }, false);

                menuItems.addEventListener("click", function () {
                    App.nav.closeMenuOnClick();
                }, false);

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
                
                for (i = 0; i <= items.length; i++) {
                    if (items[i] != undefined){
                        items[i].setAttribute("href", "#/" + i);
                        items[i].classList.add(i);
                    }
                }
            },
            "share": function () {
                var list = document.querySelector('.share-list');
                if (list.classList.contains("inactive")) {
                    list.classList.remove("inactive");
                } else {
                    list.classList.add("inactive");
                }
            },
            "toggleNavigation": function () {
                var icon = document.querySelector('.menu-toggle');
                var menu = document.querySelector('.menu');

                if (App.nav.state) {
                    menu.classList.add("hide");
                    menu.classList.remove("open");
                    icon.classList.remove("close");
                    icon.classList.add("open");
                    App.nav.state = false;
                } else {
                    menu.classList.add("open");
                    menu.classList.remove("hide");
                    icon.classList.add("close");
                    App.nav.state = true;
                }
            },
            "activeItem": function () {
                var state = Reveal.getState().indexh;
                var container = document.querySelectorAll('.nav-item > a');
                var items = document.querySelectorAll('.nav-item > a > img');
                for (var i = 0; i <= items.length; i++) {
                    if (items[i] != undefined && container[i].classList.contains(state)) {
                        items[i].classList.add('active');
                        
                    }
                    else if (items[i] != undefined) {
                        items[i].classList.remove('active');
                    }
                }
            },
            "closeMenuOnClick": function () {
                var icon = document.querySelector('.menu-toggle');
                var menu = document.querySelector('.menu');

                if (App.nav.state) {
                    menu.classList.add("hide");
                    menu.classList.remove("open");
                    icon.classList.remove("close");
                    icon.classList.add("open");
                    App.nav.state = false;
                } else {
                    menu.classList.add("open");
                    menu.classList.remove("hide");
                    icon.classList.add("close");
                    App.nav.state = true;
                }
            }
        },
        "intro": {
            "state": false,
            "init": function () {
                if (document.querySelector('.intro')) {
                    App.intro.bindEventListeners();
                }
            },
            "bindEventListeners": function () {
                var menu = document.querySelector('.menu');
                var intro = document.querySelector('.intro');
                var button = document.querySelector('.button');

                if(!intro.classList.contains("hide")){
                    App.text.makeTextSticky();
                }
                // DESKTOP CLOSE
                button.addEventListener("click", function () {
                    intro.classList.add('hide');
                }, false);

                // MOBILE CLOSE
                intro.addEventListener("touchstart", function () {
                    intro.classList.add('hide');
                }, false)
            }
        },
        "fullscreen": {
            "state": false,
            "init": function () {
                if (document.querySelector('.menu')) {
                    App.fullscreen.bindEventListeners();
                }
            },
            "bindEventListeners": function () {
                var icon = document.querySelector('.fullscreen');
                icon.addEventListener('click', function() {
                    App.fullscreen.enterFullscreen();
                }, false);
            },
            "enterFullscreen": function () {
                var isInFullScreen = (document.fullscreenElement && document.fullscreenElement !== null) ||
                    (document.webkitFullscreenElement && document.webkitFullscreenElement !== null) ||
                    (document.mozFullScreenElement && document.mozFullScreenElement !== null) ||
                    (document.msFullscreenElement && document.msFullscreenElement !== null);

                var docElm = document.documentElement;
                if (!isInFullScreen) {
                    var video = document.querySelector('.present > video');

                    var srcImage = document.querySelector('.fullscreen');
                    srcImage.src = "../assets/stories/intro/buttons/exitfullscreen.svg";

                    var pointer = document.querySelector('.present > svg');
                    if (pointer != undefined) {
                        pointer.classList.add('hide-on-desktop');
                    }
                    if (docElm.requestFullscreen) {
                        docElm.requestFullscreen();
                    } else if (docElm.mozRequestFullScreen) {
                        docElm.mozRequestFullScreen();
                    } else if (docElm.webkitRequestFullScreen) {
                        docElm.webkitRequestFullScreen();
                    } else if (docElm.msRequestFullscreen) {
                        docElm.msRequestFullscreen();
                    }
                } else {
                    var srcImage = document.querySelector('.fullscreen');
                    srcImage.src = "../assets/img/icons/fullscreenButton.svg";
                    var pointer = document.querySelector('.present > svg');
                    if (pointer != undefined) {
                        pointer.classList.remove('hide-on-desktop');
                    }
                    if (document.exitFullscreen) {
                        document.exitFullscreen();
                    } else if (document.webkitExitFullscreen) {
                        document.webkitExitFullscreen();
                    } else if (document.mozCancelFullScreen) {
                        document.mozCancelFullScreen();
                    } else if (document.msExitFullscreen) {
                        document.msExitFullscreen();
                    }
                }
            }
        },
        "text": {
            "state": false,
            "init": function () {
                if (document.querySelector('.text')) {
                    App.text.bindEventListeners();
                }
            },
            "bindEventListeners": function () {
                var text = document.querySelector('section.present > mobile-light-text-bg');
                if (text != undefined) {
                    text.addEventListener('touchmove', function () {
                        App.text.getSrollPersentage();
                    }, false);
                }

                document.addEventListener('slidechanged', function () {
                    var text = document.querySelector('.present > .text');
                    var textlong = document.querySelector('.present > .text-long');

                    if (text != undefined && text.classList.contains('stay') == false) {
                          App.text.makeTextSticky();
                    }  else if (textlong != undefined && textlong.classList.contains('stay') == false){
                        App.text.makeTextSticky();
                    }
                });
            },
            "makeTextSticky": function () {
                setTimeout(function () {
                    var text = document.querySelector('section.present > .text');
                    var textlong = document.querySelector('section.present > .text-long');
                    if (textlong != null && !textlong.classList.contains('stay')) {
                        textlong.classList.add("stay");
                        textlong.classList.remove("text-fade-in");
                    } else if (text != null && !text.classList.contains('stay')){
                        text.classList.remove("text-fade-in");
                        text.classList.add("stay");
                    }
                }, 3000);
            },
        }
    };

    App.init();

})();



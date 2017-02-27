var Grid = {};


if(document.querySelector('.grid')){
    //console.log('Grid div detected');
    Grid = {
        "currentFilter":"all",
        "msnry":new Masonry( '.grid', {
            itemSelector: '.grid-item',
            columnWidth: '.grid-sizer',
            gutter: 0,
            percentPosition: true
        }),
        "init":function() {
            Grid.bindEventListeners();
            document.querySelector('.footer').classList.add('grid-footer')
            Grid.scroll();
            $( window ).scroll(function() {
                Grid.scroll();
            });
            var timeout = null;
            $("body").mousemove(function(e){
                Grid.animateShapes(e);
            });
        },
        "animateShapes":function(e){

            var movementStrength = 20;
            var height = movementStrength / $(window).height();
            var width = movementStrength / $(window).width();

            var pageX = e.pageX - ($(window).width() / 4);
            var pageY = e.pageY - ($(window).height() / 4);
            var newvalueX = width * pageX * -1 + movementStrength;
            var newvalueY = height * pageY * -1 + movementStrength;
            var newvalue2X = width * pageX * 1 - movementStrength;
            var newvalue2Y = height * pageY * 1 - movementStrength;
            $('.sh1').css("background-position", newvalueX+"px     "+newvalueY+"px");
            $('.sh2').css("background-position", newvalue2X+"px     "+newvalue2Y+"px");

        },
        "open":function(target){

        },
        "bindEventListeners":function(){

            //Filters
            var filters = document.querySelectorAll('.grid-filters-wrapper .filter');
            [].forEach.call(filters, function(filter) {
                filter.addEventListener("click", function () {
                    //console.log('Clicked a filter-button');
                    document.querySelectorAll('.grid-filters-wrapper .filter[data-filter='+Grid.currentFilter+']').forEach(function(el) {
                        el.classList.remove('active');
                    });
                    document.querySelectorAll('.grid-filters-wrapper .filter[data-filter='+this.dataset.filter+']').forEach(function(el) {
                        el.classList.add('active');
                    });
                    Grid.filter(this.dataset.filter);
                });
            });
            /*
            var items = document.querySelectorAll('.grid .grid-item');
            [].forEach.call(items, function(item) {
                imagesLoaded(item, function(){
                    //console.log('Current Item',item);
                    item.classList.add('loaded');
                });
            });
            */
        },
        "filter":function(type){
            Grid.currentFilter = type;
            var items = document.querySelectorAll('.grid .grid-item');
            [].forEach.call(items, function(item) {
                item.classList.remove('filtered');
                if(type !== 'all' && item.dataset.type !== type){
                    item.classList.add('filtered');
                }
            });

            Grid.msnry.layout();
        },
        'scroll':function(){
            var items = document.querySelectorAll('.grid .grid-item:not(.loaded)');
            [].forEach.call(items, function(item) {
                var temp = isInViewport(item);
                if(temp){
                    var images = item.querySelectorAll(".image");
                    [].forEach.call(images, function(image) {
                        //console.log("Tag Name",image.tagName);
                        if(image.tagName === 'IMG'){
                            image.src = image.dataset.src;
                        } else {
                            image.style = "background-image: url("+image.dataset.src+");"
                        }
                        imagesLoaded(image, function(){
                            //console.log('Current Item',item);
                            item.classList.add('loaded');
                        });
                    });
                }
            });

        }
    }
    Grid.init();
} else {
    //console.log('No grid required');
}
//var scrollbar = new SimpleBar(document.querySelector('.wrapper'));
window.onresize = function(event) {
    //scrollbar.SimpleBar.recalculate();
};
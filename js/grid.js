var Grid = {};


if(document.querySelector('.grid')){
    //console.log('Grid div detected');
    Grid = {
        "currentFilter":"all",
        "msnry":new Masonry( '.grid', {
            itemSelector: '.grid-item',
            columnWidth: '.grid-sizer'
        }),
        "init":function() {
            Grid.bindEventListeners();
            document.querySelector('.footer').classList.add('grid-footer')
        },
        "open":function(target){

        },
        "bindEventListeners":function(){
            //Filters
            var filters = document.querySelectorAll('.grid-filters-wrapper .filter');
            [].forEach.call(filters, function(filter) {
                filter.addEventListener("click", function () {
                    console.log('Clicked a filter-button');
                    document.querySelectorAll('.grid-filters-wrapper .filter[data-filter='+Grid.currentFilter+']').forEach(function(el) {
                        el.classList.remove('active');
                    });
                    document.querySelectorAll('.grid-filters-wrapper .filter[data-filter='+this.dataset.filter+']').forEach(function(el) {
                        el.classList.add('active');
                    });
                    Grid.filter(this.dataset.filter);
                });
            });

            var items = document.querySelectorAll('.grid .grid-item');
            [].forEach.call(items, function(item) {
                imagesLoaded(item, function(){
                    //console.log('Current Item',item);
                    item.classList.add('loaded');
                });
            });

            //Scroll listener for alternative filters
            var lineFilters = document.querySelector('.grid-filters'),
                scrollFilters = document.querySelector('.grid-filters-scroll');
            window.addEventListener("scroll",function(){
                var viewportOffset = lineFilters.getBoundingClientRect()
                if(viewportOffset.top < 0){
                    scrollFilters.classList.add('active');
                } else {
                    scrollFilters.classList.remove('active');
                }
            });
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
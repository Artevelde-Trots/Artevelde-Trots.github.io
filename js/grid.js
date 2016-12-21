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
        },
        "open":function(target){

        },
        "bindEventListeners":function(){
            //Filters
            var filters = document.querySelectorAll('.grid-filters .filter');
            [].forEach.call(filters, function(filter) {
                filter.addEventListener("click", function () {
                    console.log('Clicked a filter-button');
                    document.querySelector('.grid-filters .filter[data-filter='+Grid.currentFilter+']').classList.remove('active');
                    this.classList.add('active');
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
        },
        "filter":function(type){
            Grid.currentFilter = type;
            var items = document.querySelectorAll('.grid .grid-item');
            [].forEach.call(items, function(item) {
                item.classList.remove('filtered');
            });

            switch(type){
                case 'all':
                    break;
                default:
                    var items = document.querySelectorAll('.grid .grid-item[data-type='+type+']');
                    [].forEach.call(items, function(item) {
                        item.classList.add('filtered');
                    });
                    break;
            }
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
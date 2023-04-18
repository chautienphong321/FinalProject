$(document).ready(function() {
    let shopFilterEle = $('.shop-filter-container>div');
  
    if (shopFilterEle) {
    //   let shopFilterIsotope = new Isotope(shopFilterEle[0], {
    //     itemSelector: '.shop-filter-item',
    //     layoutMode: 'masonry'
    //   });
  
      let shopFilters = $('#shop-flters li');
  
      shopFilters.on('click', function(e) {
        e.preventDefault();
        shopFilters.each(function() {
          $(this).removeClass('filter-active');
        });
        $(this).addClass('filter-active');
        
        var dataFilter = $(this).attr('data-filter');
        var items = $('.shop-filter-item');
        var count = 0;

        for(var i = 0; i < items.length; i++) {
            if($(items[i]).hasClass(dataFilter)){
                count++;
            }
        }
        
        for(var i = 0; i < items.length; i++) {
            if(dataFilter == '*'){
                $(items[i]).show();
                $(items[i]).removeClass(function(index, className) {
                    return className.split(' ').filter(c => c.includes('col-')).join(' ');
                });
                $(items[i]).addClass('col-lg-3 col-md-6 col-sm-12');
                // break;
            }
            else if($(items[i]).hasClass(dataFilter)){
                $(items[i]).show();
                
                switch(count){
                    case 3:
                        $(items[i]).removeClass('col-lg-3').addClass('col-lg-4');
                        break;
                    case 2:
                        $(items[i]).removeClass('col-lg-3').addClass('col-lg-6');
                        break;
                    case 1:
                        $(items[i]).removeClass('col-lg-3').addClass('col-lg-12');
                        break;
                    default:
                        break;
                }
            } else {
                $(items[i]).hide();
                $(items[i]).removeClass(function(index, className) {
                    return className.split(' ').filter(c => c.includes('col-')).join(' ');
                });
            }
        }
      });
    }
  });
  
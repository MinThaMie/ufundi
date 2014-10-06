(function($){
    $().ready(function(){
        heads();
    });
    
    function heads(){        
        $('#klik-hoofden').delegate('div img', 'click', function(){
            var elemClicked = $(this).parent();
            //close the opened heads (just in case there are more)
            $('#klik-hoofden').children().each(function(index, elem){
                if($(elem).hasClass('active') && $(elem)[0] !== elemClicked[0]){
                    closeHead($(elem));
                }
            });
            
            //open the clicked head
            if(!elemClicked.hasClass('active')){
                var defaultOffsetLeft = elemClicked.css('left');
                elemClicked.addClass('active').attr('data-default-left', defaultOffsetLeft);
                
                var center = Math.floor($('#klik-hoofden').width() / 2);
                var imgWidth = Math.floor($(this).width() / 2);
                var offsetLeft = center - imgWidth;
                elemClicked.animate({
                    'left': offsetLeft,
                    'z-index': '999'
                }, 400, 'swing', function(){popHead(elemClicked);});
            }
        });
        
        //close the correct head when clicking outside of the container
        $(document).mouseup(function (e){
            var openHead = $("#klik-hoofden .active");
            if (!openHead.is(e.target) && openHead.has(e.target).length === 0){
                closeHead(openHead.parent());
            }
        });
    };
    
    function popHead(elem){
        var headWidth = Math.floor(elem.children('img').first().width() / 2);
        var textWidth = Math.floor(elem.children('div.hoofd-tekst').first().outerWidth() / 2);
        var textOffset = (textWidth - headWidth)*-1 + 1*elem.children('img').first().css('left').slice(0, -2);
        
        elem.children('div.hoofd-tekst').first()
                .css('left', textOffset)//-1*($(this).width() / 2 - headWidth))
                .hide().show()
                .animate({'opacity': 1});
    };
    
    function closeHead(elem){
        elem.removeClass('active');
        var offsetLeft = elem.attr('data-default-left');
        if(offsetLeft !== false){
            elem.children('div.hoofd-tekst').first().animate({'opacity': 0}, 400, 'swing', function(){
                $(this)
                    .hide();
                elem
                    .css('z-index', '1')
                    .animate({
                        'left': offsetLeft
                    }, 400, 'swing');
            });
        }
    }
})(jQuery);
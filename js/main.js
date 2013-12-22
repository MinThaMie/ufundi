(function($){
    $().ready(function(){
        heads();
    });
    
    function heads(){
        $('#klik-hoofden').delegate('div img', 'click', function(){
            if(!$(this).parent().hasClass('active')){
                var defaultOffsetLeft = $(this).parent().css('left');
                $(this).parent().addClass('active').attr('data-default-left', defaultOffsetLeft);
                
                var center = Math.floor($('#klik-hoofden').width() / 2);
                var imgWidth = Math.floor($(this).width() / 2);
                var offsetLeft = center - imgWidth;
                $(this).parent().animate({
                    'left': offsetLeft
                });
            } else {
                $(this).parent().removeClass('active');
                var offsetLeft = $(this).parent().attr('data-default-left');
                $(this).parent().animate({
                    'left': offsetLeft
                });
            }
        });
    };
})(jQuery);
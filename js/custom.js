

(function($) {
    function top_menu(){
        var menu = $('.top-nav');
        var menu_w = $(menu).width(); 
        var el_w = 0;
        $('.top-nav__item').each(function(){
            el_w = el_w + $(this).width();
        });
        if(menu_w < el_w){
            $(menu).addClass('mob-menu');
        } else {
            $(menu).removeClass('mob-menu');
        }
    }    
    
    $(document).ready(function(){
        //starting
        top_menu();
        
        $(window).resize(function(){
            top_menu();
        });
        
        $('.top-nav__open').click(function(){
            var menu = $('.top-nav');
            if($(menu).hasClass('open')){
                $(menu).stop().slideUp('fast', function(){$(this).attr('style','')}).removeClass('open');
            } else {
                $(menu).stop().slideDown('fast').addClass('open');
            }
            return false;
        });
        
        $('.open-spoiler').click(function(){  
            var text = $(this).siblings(".spoiler");
            if($(text).hasClass('open')){
                $(this).removeClass('open');
                $(text).stop().slideUp('fast').removeClass('open');
            } else {
                $(this).addClass('open');
                $(text).stop().slideDown('fast').addClass('open');
            }
            return false;
        });
        
        $('.b-portfolio__tabs-header-link').click(function(){
            var tab = $($(this).attr('href'));
            
            if($(this).hasClass('current')){

            } else {
                $('.b-portfolio__tabs-header-link').removeClass('current');
                $('.b-portfolio__tab_open').stop().animate({
                    opacity:0
                }, 100, function(){
                    $(this).css('display','none').removeClass('b-portfolio__tab_open');
                    $(tab).css('display','block').stop().animate({
                        opacity:1
                    }, 100).addClass('b-portfolio__tab_open');
                });
                $(this).addClass('current');
            }
            return false;
        });
        
        $('.ajax-load').click(function(){
            var url = $(this).attr('href');
            window.block = $(this).data('data-block');
                $.ajax({
                    url: url,
                    dataType: "html",
                    beforeSend: function(data){
                       // $('#project-data').slideUp('fast');
                    },
                    success: function(data){	
                        history.pushState('', '', url);
                        var html = $(data).find('#project-data').html();
                        var new_link = $(data).find('.b-project-content__detalis-view');
                        $('.b-project-content__text').html($(data).find('.b-project-content__text').html());
                        $('.b-project-content__detalis-view').attr('href', $(new_link).attr('href')).html($(new_link).html());
                        $('#project-data').html(html);
                        //.slideDown('fast')
                        //alert(content);
                    },
                    error: function(data){
                        alert('Ошибка получения данных'); 
                    }
                });            
            return false;
        });
        
        $('.header').before('<div class="header-phantom" style="height:'+$('.header').height()+'px;"></div>');
        $(window).resize(function(){
            $('.header-phantom').height($('.header').height());
        });
    });

    $(window).load(function() {
         var flex_destroy = 1;
         if($(window).width() <= 760){
            $('.b-ourteam__list__slider').flexslider({
                controlNav: false,
                slideshow: false,
                prevText: "",
               nextText: ""
            });
            window.flex_destroy = 0;
        }
         $(window).resize(function(){
             if($('.b-ourteam__list__slider').length){
                 if($(window).width() > 760){
                     if(window.flex_destroy < 1){
                         $('.b-ourteam__list__slider').flexslider('destroy');
                         window.flex_destroy = 1;
                     }
                 } else {
                     $('.b-ourteam__list__slider').flexslider({
                         controlNav: false,
                         slideshow: false,
                         prevText: "",
                         nextText: ""
                     });
                     window.flex_destroy = 0;
                 }
             }
         });
    });
}(jQuery));
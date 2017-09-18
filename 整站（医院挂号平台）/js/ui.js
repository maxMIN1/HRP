//alert(1);

//ui-search定义
    $.fn.UiSearch=function(){
        var ui=$(this);
        $('.ui-search-selected',ui).on('click',function(){
            $('.ui-search-select-list').show();
            return false;
        });
        $('.ui-search-select-list a',ui).on('click',function(){
            $('.ui-search-selected').text($(this).text());
            $('.ui-search-select-list').hide();

            return false;
        });

        $('body').on('click',function(){
            $('.ui-search-select-list').hide();
        });
    }

//ui-tab 定规
    

// @param {string} header TAB组件，所有选项卡 .item
// @param {string} content TAB组件，内容区域 所有.item
    $.fn.UiTab=function(header,content){
        var ui=$(this);
        var tabs=$(header,ui);
        var cons=$(content,ui);

        tabs.on('click',function(){
            var index=$(this).index();
            tabs.removeClass('item_focus').eq(index).addClass('item_focus');
            tabs.removeClass('block-caption-item_focus').eq(index).addClass('block-caption-item_focus');
            cons.hide().eq(index).show();
            return false;
        });
    }

//ui-backTop

    $.fn.UiBackTop=function(){
        var ui=$(this);
        var el=$('<a class="ui-backTop" href="#0"></a>');
        ui.append(el);
        el.hide();

        var windowHeight=$(window).height();
        $(window).on('scroll',function(){
            var top=$('body').scrollTop();
            //console.log(windowHeight-top);
            //console.log(top);
            //console.log(windowHeight);
            
            if(top>windowHeight){
                //console.log('1');
                el.show();
            }else{
                el.hide();
            }
        });
        el.on('click',function(){
                 $('body,html').animate({scrollTop:0},300);
             });
            //  console.log(st);
        }


        //ui-slider

        //1.左右箭头能够控制翻页
        //2.翻页的时候进度点联动
        //3.第一和第三页能够连接
        //4.进度点点击时能够切换到对应页面
        //5.自动翻页
        //6.手动翻页过程中，屏蔽其他操作
        //7.高级——无缝滚动
        $.fn.UiSlider=function(){
            var ui=$(this);
            var wrap=$('.ui-slider-wrap',this);
            var btn_prev=$('.ui-slider-arrow .left',ui);
            var btn_next=$('.ui-slider-arrow .right',ui);
            
            var items=$('.ui-slider-wrap .item',ui);
            var tips=$('.ui-slider-process .item',ui);
            
            //预定义

            var current=0;

            var size=items.length;

            var width=items.eq(0).width();

            var enableAuto=true;
            //设置自动滚动感应（如果鼠标在wrap中，不要自动滚动）

            ui.on('mouseover',function(){
                enableAuto=false;
            })

            .on('mouseout',function(){
                enableAuto=true;
            })

            //具体操作

            wrap
            .on('move_to',function(evt,index){
                tips.removeClass('item_focus').eq(index).addClass('item_focus');
                wrap.css('left',width*index*-1);
            })
            .on('move_prev',function(){
                if(current<=0){
                    current=size;
                }
                    current=current-1;
                    $(this).triggerHandler('move_to',current);
                    return $(this);
            })
            .on('move_next',function(){
                if(current>=size-1){
                    current=-1;
                }
                current=current+1;
                wrap.triggerHandler('move_to',current);
            })
            .on('auto_move',function(){
                setInterval(function() {
                    enableAuto && wrap.triggerHandler('move_next');
                }, 2000);
                wrap.triggerHandler('move_to',current);
            }).triggerHandler('auto_move');

            //事件

            btn_prev.on('click',function(){
                console.log('move')
                wrap.triggerHandler('move_prev');
                
            });
            btn_next.on('click',function(){
                wrap.triggerHandler('move_next');
            });
            tips.on('click',function(){
                var index=$(this).index();
                wrap.triggerHandler('move_to',index);
            });
        }
//页面的脚本逻辑

    $(function(){
        $('.ui-search').UiSearch();
        $('.content-tab').UiTab('.caption > .item','.block > .item');
        $('.content-tab .block .item').UiTab('.block-caption > a','.block-content','.block-wrap');

        $('body').UiBackTop();

        $('.ui-slider').UiSlider();

        // $('.left').on('click',function(){
        //     alert(1);
        // })
        
    });
// $(function(){
//     alert(1);
// });
// alert(2);




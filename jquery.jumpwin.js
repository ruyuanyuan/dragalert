(function($){
    var deful={
        alertbox:{        
                width:430,
                bgColor:'skyblue'           
        },
        title:'标题',
        dragflage:true,
        content:{
            text:'内容',
            style:{
                height:300,
                overflow:'hidden'
            }
        },
        btnbox:[  {
                       btnid:'btn1',
                       btntext:'确定',
                       btnfn:function(){
                        alert(0)
                       } 
                    },
                    {
                       btnid:'btn3',
                       btntext:'重置',
                       btnfn:function(){
                        alert(3)
                       } 
                    },
                    {
                       btnid:'btn2',
                       btntext:'取消',
                       btnfn:function(){
                        alert(1)
                       } 
                    }]
        ,
        blg:{
            bgFloge:true,
            bgColor:'#000',
            opacity:0.6
        }
    
    };

    var plan={
                init:function(options){
                    this.options=options;
                    this.blgcreate();
                    this.alertcreate();
                    this.contentcreate();
                    this.btnboxcreate();
                    if(this.options.dragflage){
                        this.dragplan()
                    }
                    
                },
                blgcreate:function(){
                    var blgstyle=this.options.blg;
                    if(blgstyle.bgFloge){
                        var back=$('<div class="black"></div>');
                        _body.append(back);
                        $('.black').css({
                            'background':blgstyle.bgColor,
                            'opacity':blgstyle.opacity
                        })
                    }
                }, 
                alertcreate:function(){
                    var alertstyle=this.options.alertbox;
                    var titletext=this.options.title;
                    var str='';
                    str='<div class="alertbox">'+
                            '<div class="title">'+titletext+'</div>'+
                            '<div class="content"></div>'+
                            '<div class="btnbox"></div>'
                        '</div>'
                    _body.append(str);
                    $('.alertbox').css({
                        'width':alertstyle.width+'px',
                        'background':alertstyle.bgColor
                    })
                },
                contentcreate:function(){
                    var contentstyle=this.options.content;
                    $(".content").css({
                        'height':contentstyle.style.height+'px',
                        'overflow':contentstyle.style.overflow
                    })
                    if(typeof(contentstyle.text)=='string'){
                        $(".content").html(contentstyle.text);   
                    }
                },
                btnboxcreate:function(){
                    var btnstyle=this.options.btnbox;
                    var btnnum=btnstyle.length;
                    var str='';
                    for(var i=0;i<btnnum;i++){
                        str+='<a href="javascript:;" id="'+btnstyle[i].btnid+'">'+btnstyle[i].btntext+'</a>';
                    }
                    $('.btnbox').append(str);
                    for(var i=0;i<btnnum;i++){
                        console.log();
                        $('#'+btnstyle[i].btnid).on('click',btnstyle[i].btnfn)
                    }
                },
                dragplan:function(){
                    var alertbox=document.getElementsByClassName('alertbox')[0];
                    alert(0)
                    alertbox.onmovedown=function(e){
                        alert(0)
                        ev=e||window.event;
                        var dix=ev.clientX-$('.alertbox').offset().left;
                        var diy=ev.clientY-$('.alertbox').offset().top;
                        document.onmousemove=function(e){
                             ev=e||window.event;
                             $('.alertbox').css({'left':ev.clientX-dix,'top':ev.clientY-diy})
                        }
                         document.onmouseup=function(){
                            document.onmousemove=null;
                            document.onmouseup=null;
                           
                        };
                    }
                    $('.alertbox').on('mousedown',function(e){
                        var ev=e||window.event;
                        var dix=ev.clientX-$('.alertbox').offset().left;
                        var diy=ev.clientY-$('.alertbox').offset().top;
                        $('body').on('mousemove',function(e){
                             var ev=e||window.event;                            
                             $('.alertbox').css({'left':ev.clientX-dix+'px','top':ev.clientY-diy+'px','transform':'translate(0,0)'})                                 
                        })
                        $('body').on('mouseup',function(e){
                
                            $('body').off('mousemove mouseup')
                        })
                        return false
                    })

                }
            }    
    $.fn.jumpwin=function(options){
        
        var options=$.extend(true,deful,options);
        return this.each(function() {
            _body=$('body');
            $(this).click(function(){
                plan.init(options);
            })
        });
    }
})(jQuery)
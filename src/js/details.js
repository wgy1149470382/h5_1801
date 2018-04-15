require(['config'],function(){
    require(['jquery','Zoom','autoCar','autoAjax'],function($){

        //头部
        $('#pageHeader').load('../html/header.html',function(){
            $('#offside').load('../html/offside.html',function(){
            var $off_car = $('.off_car');
            //数据输出
            $('.addcar').click(function(){
                // console.log($('.name').html())
                // console.log($('.simg').attr('src'))
                // console.log($num.val())
                // console.log($('.price').text())
                // console.log($('.category').html())

                //飞入购物车
                var $img = $('.picture').find('img');
                var $copyImg = $img.clone();
                $copyImg.css({
                    position:'absolute',
                    left:$img.offset().left,
                    top:$img.offset().top,
                    width:$img.outerWidth()
                });

                $copyImg.appendTo($('body'));
                // $('body').append($copyImg);

                $copyImg.animate({
                    left:$off_car.offset().left,
                    top:$off_car.offset().top,
                    width:20
                },function(){
                    $copyImg.remove();

                    $.ajax({
                        url:'../api/addcar.php',
                        data:{
                            id:id,
                            name:$('.name').html(),
                            price:$('.price').text(),
                            qty:$num.val(),
                            imgs:$('.simg').attr('src'),
                            category:$('.category').html(),
                        },
                            success:function(data){
                                    autoAjax();
                                    autocar();
                                
                            }
                        
                    })
                    
                })

                
            })
            });
        })
        //底部
        $('#pageFooter').load('../html/footer.html');

        var $off_car = $('.off_car');

        var id = location.search.slice(4);
        console.log(id)
        
        var $num = $('.num');


        //数据传入
        $.ajax({
            url:'../api/details.php',
            data:{id:id},
            dataType:'json',
            success:function(data){

                data.forEach(function(item){console.log(item)
                    $('.category').html(item.category);
                    $('.name').html(item.name);
                    $('.b_name').html(item.name);
                    $('.comment').html(item.comment);
                    $('.sell').html(item.sell);
                    $('.price').html(item.price);
                    $num.val(item.qty);
                    $('.picture').find('img').attr('src',item.imgs);
                    $('.picture').find('img').attr('data-big',item.imgs);
                    $('.simg').attr('src',item.imgs);

                    var qty = $num.val();
                    $('.sub').click(function(){
                        qty--;
                        if(qty===0){
                            qty=1;
                        }
                        $num.val(qty)
                    })
                    $('.add').click(function(){
                        qty++;
                        $num.val(qty)
                    })

                })
                //放大镜
                $('.picture').xZoom({
                    width:380,
                    height:440
                })

            }
        })
        
        

        

        

        $off_car.on('mouseenter',function(){
            autoAjax();
        })


        //右侧购物车
        
        // function autoAjax(){

        //     $.ajax({
        //     url:'../api/carlist.php',
        //     dataType:'json',
        //     success:function(data){console.log(data);
        //         $('.emqty').hide();
        //         $('.join').show();
        //         $('.checkcar').show();
        //         $('.sss').html('');
        //         var total = 0;
                
        //         var res = data.map(function(item){
        //            total = total + item.qty*1;
        //             return `<li data-id="${item.id}">
        //                     <a href="">
        //                     <img src="${item.imgs}">
        //                     <span class="name">${item.name}</span>
        //                     <span class="nameEn">${item.category}</span>
        //                     <span class="price"><strong>${item.price}</strong>X<em>${item.qty}</em></span>
        //                     </a>
        //                     <div title="从购物车移除${item.name}" class="btn-remove">&times;</div>
        //                     </li>`
                    
        //         })
        //         $('.c_qty').html(total);
        //         $('.sss').append(res);
        //         $('.measure').text(total);
        //     }
        //     })
        // }

        //切换
        ;(function(){
            $('.imgbox').on('click','li',function(){
                var imgsrc = $(this).find('img').attr('src');
                $('.picture').find('img').attr('src',imgsrc);
            })


        })();
        


    })
})
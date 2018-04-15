require(['config'],function(){
    require(['jquery','carousel','scarousel','autoCar'],function($){
        //头部
        $('#pageHeader').load('html/header.html',function(){
            autocar();
            var a = $('.nav_l').find('ul').find('a');

            a.click(function(e){
                e.preventDefault();

                location.href = '../html/pagelist.html';
            })

        })

        //底部
        $('#pageFooter').load('html/footer.html')


        //轮播图

        var $banner = $('#banner');
        var $ul = $banner.children('ul');
        var $copyli = $ul.find('li').first().clone();
        var len = $ul.children().length+1;console.log(len)
        var imgwidth = $banner.innerWidth()
        $ul.append($copyli);
        var $page = $('.page');
        var idx = 0;
        $ul.css('width',imgwidth*len);

        var timer = setInterval(auto,3000);
        //页码
        for(var i=1;i<len;i++){
            var $span = $('<span/>');
            $span.text(i);
            if(i == idx){
                $span.addClass('circle');
            }
            $page.append($span);
        }

        $page.on('mouseover','span',function(){
            idx = $(this).index()-1;
            auto();
        })

        $banner.on('mouseover',function(){
            clearInterval(timer);
            
        })
        $banner.on('mouseout',function(){
            timer = setInterval(auto,3000)
        })

        function auto(){
            idx++;
            if(idx>len-1){
                $ul.css('left',0)
                idx=1;
            }
            var target = -imgwidth*idx;
            $ul.stop().animate({left:target});
            if(idx<len-1){
                $page.find('span').eq(idx).addClass('circle').siblings('span').removeClass('circle')
            }else{
                $page.find('span').removeClass('circle').first().addClass('circle');
            }
        }





        $('.box2').xCarousel({
            imgs:[
                '../img/a1.jpg',
                '../img/a2.jpg',
                ],
            
        });

        $('.box3').xCarousel({
            imgs:[
                '../img/c1.jpg',
                '../img/c2.jpg',
                '../img/c3.jpg',
                '../img/c4.jpg',
                '../img/c5.jpg',
                ],
            
        });

        $('.box4').xCarousel({
            imgs:[
                '../img/d1.jpg',
                '../img/d2.jpg',
                '../img/d3.jpg',
                ],
            
        });

        $('.box5').xCarousel({
            imgs:[
                '../img/e1.jpg',
                '../img/e2.jpg',
                ],
            
        });

        $('.box6').carousel({
            imgs:[
                '../img/f1.jpg',
                '../img/f2.jpg',
                '../img/f1.jpg',
                ],
            
        });




        //发请求
        $.ajax({
            url:'../api/index.php',
            dataType:'json',
            success:function(data){console.log(data)
                //白酒
                let wine1 = data.wine1.map(function(item){
                    return createData(item)
                })
                $('.wine1').html(wine1);

                let wine2 = data.wine2.map(function(item){
                    return createData(item)
                })
                $('.wine2').html(wine2);
                //洋酒
                let yangjiu = data.yangjiu.map(function(item){
                    return createData(item)
                })
                $('.yangjiu').html(yangjiu);
                //白酒
                let baijiu1 = data.baijiu1.map(function(item){
                    return createData(item)
                })
                $('.baijiu1').html(baijiu1);
                let baijiu2 = data.baijiu2.map(function(item){
                    return createData(item)
                })
                $('.baijiu2').html(baijiu2);
                //老酒
                let laojiu1 = data.laojiu1.map(function(item){
                    return createData(item)
                })
                $('.laojiu1').html(laojiu1);
                let laojiu2 = data.laojiu2.map(function(item){
                    return createData(item)
                })
                $('.laojiu2').html(laojiu2);
                //酒具
                let jiuju = data.jiuju.map(function(item){
                    return createData(item)
                })
                $('.jiuju').html(jiuju);
                //猜你喜欢
                let like = data.like.map(function(item){
                    return `<li data-id="${item.id}">
                        <a href="" class="pull"><img src="${item.imgs}"></a>
                        <dl>
                        <dt class="pull">${item.name}</dt>
                        <dd>${item.nikname}</dd>
                        <dd>${item.place}</dd>
                        <dd>${item.category}</dd>
                        <dd>${item.grade}</dd>
                        <dd class="last"><span>￥</span><strong>${item.price}</strong></dd>
                        </dl>
                    </li>`

                })
                $('.like').html(like);

            }
        })

        


        //生成列表
        function createData(item){
            return `<li data-id=${item.id}>
                    <a href="" class="pimg"><img src="${item.imgs}" class="pull"></a>
                    <div class="space"><a href="" class="pull">${item.name}</a><p class="price">￥<span>${item.price}</span></p></div>
                    <p class="sum"><span>售出<strong>${item.comment}</strong></span><span class="fr">好评<strong>${item.sell}</strong></span></p>
                    </li>`
        }


        //点击商品
        $("body").on('click','.pull',function(e){
            e.preventDefault();
            
            var id = $(this).closest('li').attr('data-id');

            location.href = '../html/details.html?id='+id;
        })

        //切换
        ;(function(){
            var $tabhead = $('.hottabs').find('li');
            var $tabcon = $('.hb').find('ul');
            
            $tabcon.slice(1).hide();
            $tabhead.first().addClass('light');

            $('.hottabs').on('mouseenter','li',function(){
                var idx = $(this).index();

                $tabhead.eq(idx).addClass('light').siblings('li').removeClass('light');
                $tabcon.eq(idx).show().siblings('ul').hide();
            })

            var $bd = $('.bd');
            var $h3s = $bd.find('span');
            var $uls = $bd.find('ul');

            $uls.slice(1).hide();
            $h3s.first().addClass('cut');

            $bd.on('mouseenter','span',function(){
                var idx = $(this).index();

                $h3s.eq(idx).addClass('cut').siblings('span').removeClass('cut');
                $uls.eq(idx).show().siblings('ul').hide();

            })

        })();
        
        //返回顶部
        ;(function(){
            var $backtop = $('#backtop')
            $(window).scroll(function(){
                if($(window).scrollTop()>1666){
                    $backtop.show();
                }else{
                    $backtop.hide();
                }
            })

            $backtop.click(function(){
                $('html , body').animate({scrollTop: 0},500)
            })
        })();


    })
})
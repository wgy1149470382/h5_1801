require(['config'],function(){
    require(['jquery','autoCar','autoAjax'],function($){

        //头部
        $('#pageHeader').load('../html/header.html',function(){
            autocar();
        })
        $('#pageFooter').load('../html/footer.html');

        $('#offside').load('../html/offside.html');

        var $goodlist = $('.goodlist')
        var $ul = $goodlist.find('ul');
        var qty = 12;

        $.ajax({
            url:'../api/pagelist.php',
            data:{qty:qty},
            dataType:'json',
            success:function(data){console.log(data)
                createlist(data);

                var pageLen = Math.ceil(data.total/data.qty);
                pageLen.innerHTML = '';

                for(var i=0;i<pageLen;i++){
                    var span = $('<span/>').html(i+1);
                    $('.page').append(span);
                }


                var check = true;
                var check2 = true;
                var check3 = true;

                //各种排序
                $('.first').on('click','a',function(e){
                     e.preventDefault();
                    
                    //价格排序    
                    if($(this).hasClass('priceRank')){
                        data.data.forEach(function(item){
                            if(check == true){
                                data.data.sort(function(a,b){
                                    return a.price - b.price;
                                })  
                                createlist(data)
                                check = false;
                                $('.priceRank').html('价格 ↓')
                            }else if(check == false){
                                data.data.sort(function(a,b){
                                    return b.price - a.price;
                                })  
                                createlist(data)
                                check = true;
                                $('.priceRank').html('价格 ↑')
                            }
                        })
                    }
                    //评论数排序
                    if($(this).hasClass('commentRank')){
                        data.data.forEach(function(item){
                            if(check2 == true){
                                data.data.sort(function(a,b){
                                    return a.comment.slice(0,-1) - b.comment.slice(0,-1);
                                })  
                                createlist(data)
                                check2 = false;
                                
                                $('.commentRank').html('评论数 ↓')
                            }else if(check2 == false){
                                data.data.sort(function(a,b){
                                    return b.comment.slice(0,-1) - a.comment.slice(0,-1);
                                })  
                                createlist(data)
                                check2 = true;
                                $('.commentRank').html('评论数 ↑')
                            }
                        })
                    }
                //销量排序
                    if($(this).hasClass('sellRank')){
                        data.data.forEach(function(item){
                            if(check3 == true){
                                data.data.sort(function(a,b){
                                    return a.sell - b.sell;
                                })  
                                createlist(data)
                                check3 = false;
                                // console.log($(this).html())
                                $('.sellRank').html('销量 ↓')
                            }else if(check3 == false){
                                data.data.sort(function(a,b){
                                    return b.sell - a.sell;
                                })  
                                createlist(data)
                                check3 = true;
                                $('.sellRank').html('销量 ↑')
                            }
                        })
                    }
                })

            }
        })
        //分页
        $('.page').on('click','span',function(){
            var page = $(this).text();
            $(this).addClass('light').siblings('span').removeClass('light');

            // console.log(page)
            $.ajax({
                url:'../api/pagelist.php',
                data:{
                    qty:qty,
                    page:page
                },
                dataType:'json',
                success:function(data){console.log(data)
                    createlist(data);
                }
            })
        })



        //生成列表
        function createlist(data){
            var res = data.data.map(function(item){
                    return `<li data-id="${item.id}">
                    <dl>
                    <dt><a href=""><img src="${item.imgs}"></a></dt>
                    <dd class="base"><a href=""><span class="name">${item.name}</span><span class="category">${item.category}</span><span></span></a>
                    <p class="price">￥${item.price}</p>
                    </dd>
                    <dd class="action">
                    <p><a href="" class="toCar">加入购物车</a></p>
                    </dd>
                    <dd class="sum">
                    <span><strong>${item.comment}</strong>好评度</span>
                    <span><strong>24</strong>评论</span>
                    <span><strong>${item.sell}</strong>售出</span>
                    </dd>
                    </dl>
                    </li>`
                })
                $ul.html(res);
        }




        //跳转详情页
        $goodlist.on('click','dt',function(e){
            e.preventDefault();

            var id = $(this).closest('li').attr('data-id');
            
            location.href = '../html/details.html?id='+id;

        })

        //加入购物车
        $goodlist.on('click','.toCar',function(e){
            e.preventDefault();
            var id = $(this).closest('li').attr('data-id');
            var name = $(this).closest('li').find('.name').html();
            var price = $(this).closest('li').find('.price').html().slice(1);
            var imgs = $(this).closest('li').find('img').attr('src');
            var category = $(this).closest('li').find('.category').html();
            // console.log(imgs)

            $.ajax({
                    url:'../api/addcar.php',
                    data:{
                        id:id,
                        name:name,
                        price:price,
                        qty:1,
                        imgs:imgs,
                        category:category,
                    },
                        success:function(data){
                                autoAjax();
                                autocar();
                            
                        }
                    
                })
        })
        
        

    })
})
require(['config'],function(){
    require(['jquery','Zoom'],function($){

        var $total = $('.total');
        var $g_price = $('.g_price')
        var $piece = $('.piece');

        //生成购物车
        var $ul = $('.cartgood').find('ul');
        $.ajax({
            url:'../api/carlist.php',
            dataType:'json',
            success:function(data){console.log(data)
                var total = 0;
                var pie = 0;
                var res = data.map(function(item){
                    total = total + (item.price*item.qty);
                    pie = pie+item.qty*1;

                    var ptotal = (item.price*item.qty).toFixed(2);
                    return `<li data-id=${item.id}>
                    <span><input type="checkbox">全选</span>
                    <span><a href=""><img src="${item.imgs}"></a></span>
                    <span><a href="" class="g_name">${item.name}</a></span>
                    <span class="s_price">￥${item.price}</span>
                    <span><button class="sub">-</button><input type="text" value="${item.qty}" class="g_qty"><button class="add">+</button></span>
                    <span class="g_price">￥${ptotal}</span>
                    <span><a href="" class="collect">加入收藏夹</a>&nbsp;<a href="" class="del">删除</a></span>
                    </li>`
                })
                $ul.append(res);
                $piece.html(pie)
                $total.html(`￥${total.toFixed(2)}`);
                var $g_qty = $('.g_qty');
                var $s_price = $('.s_price');

                // var value = $g_qty.val();
                $ul.on('click','button',function(){
                    if($(this).hasClass('sub')){
                        var value = $(this).next().val()
                        value--;

                        if(value<=0){
                            value=1;
                        }
                        var a = $(this).closest('li').find($g_qty);
                        a.val(value)
                        Qtyajax($(this).closest('li').attr('data-id'),a.val());

                        //写入对应价格
                        corresponding($(this),a);

                        //计算总价
                        autoTotal();

                    }else if($(this).hasClass('add')){
                        var value = $(this).prev().val();
                        value++;

                        var a = $(this).closest('li').find($g_qty);
                        a.val(value)
                        Qtyajax($(this).closest('li').attr('data-id'),a.val());

                        //写入对应价格
                        corresponding($(this),a);

                        //计算总价
                        autoTotal();
                    }

                })

                $ul.on('blur','.g_qty',function(){
                    var a = $(this).val();

                    //更新数量
                    Qtyajax($(this).closest('li').attr('data-id'),a)

                    //写入对应价格
                    corresponding($(this),$(this));

                    //更新总价
                    autoTotal();

                })

                $ul.on('click','a',function(e){
                    e.preventDefault();
                    if($(this).hasClass('del')){
                        var id = $(this).closest('li').attr('data-id');
                        var currentLi = $(this).closest('li');
                        $.ajax({
                            url:'../api/delcar.php',
                            data:{
                                id:id,
                            },
                            success:function(data){
                                if(data == 'yes'){

                                    currentLi.remove();
                                }
                            }
                        })
                    }
                    if($(this).hasClass('collect')){
                        alert('敬请开放')
                    }
                })

                var $checkboxs = $ul.find(':checkbox');
                //全选
                $('.all').click(function(){
                    $checkboxs.prop('checked',this.checked);
                })

                //全部删除
                $('.batchdel').click(function(){
                    $.ajax({
                        url:'../api/delcar.php',
                        data:{
                            type:'del'
                        },
                        success:function(data){
                            console.log(data);
                        }
                    })
                })

            }
        })

        //改变数量
        function Qtyajax(id,qty){
            $.ajax({
                url:'../api/goodsqty.php',
                data:{
                    id:id,
                    qty:qty
                },
                success:function(data){

                }

            })
        }

        //自动计算购物车总价和件数
        function autoTotal(){
            var $c = $('.g_price')
            var len = $c.length;
                        var Atotal = 0;
                        var Bpiece = 0;
                        for(var i=0;i<len;i++){
                            Atotal = Atotal+$c.eq(i).html().slice(1)*1;
                            Bpiece = Bpiece+$c.eq(i).closest('li').find('.g_qty').val()*1;
                        }
            $total.html(`￥${Atotal.toFixed(2)}`);
            $piece.html(Bpiece);
        }

        //对应商品总价
        function corresponding(d,a){
            var b = d.closest('li').find('.s_price').html().slice(1)*1;

                        var tol = a.val()*1*b;
                        d.closest('li').find('.g_price').text(`￥${tol.toFixed(2)}`);
        }


    })
        
})
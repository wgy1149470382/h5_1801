
    //右上购物车
    function autocar(){
        var $ul = $('.shopcart').find('ul');
            var $piece = $('.piece');
            var $total = $('.total');
            var $qtyCar = $('.qtyCar');

        $.ajax({
            url:'../api/carlist.php',
            dataType:'json',
            success:function(data){console.log(data)
                var qty = 0;
                var total = 0;
                var res = data.map(function(item){
                    qty += item.qty*1
                    total = total+(item.price*item.qty)*1;
                    return `<li data-id="${item.id}">
                    <a href="">
                    <img src="${item.imgs}"><span class="name">${item.name}</span><span class="nameEn"></span><span class="price"><strong class="pp">￥${item.price}</strong> X <em class="qq">${item.qty}</em></span>
                    </a>
                    <button class="remove">&times;</button>
                    </li>`
                })
                $ul.append(res);
                $piece.html(qty);
                $qtyCar.html(qty);
                $total.text(total.toFixed(2));

                $('.remove').click(function(){
                    var currentLi = $(this).closest('li')
                    var id = currentLi.attr('data-id');

                    $.ajax({
                        url:'../api/delcar.php',
                        data:{id:id},
                        success:function(data){console.log(data)
                            if(data == 'yes'){
                                currentLi.remove();

                                var $pp = $('.pp')
                                var $qq = $('.qq')
                                var len = $qq.length;
                                var q = 0;
                                var t = 0;
                                for(var i=0;i<len;i++){
                                    q += $qq.eq(i).html()*1;
                                    t += q*$pp.eq(i).html().slice(1)*1;
                                console.log(t)
                                }
                                $piece.html(q);
                                $qtyCar.html(q);
                                $total.html(t);
                            }
                        }
                    })
                })


            }
        })

    }
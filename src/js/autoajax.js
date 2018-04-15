
//右侧购物车
function autoAjax(){

            $.ajax({
            url:'../api/carlist.php',
            dataType:'json',
            success:function(data){console.log(data);
                $('.emqty').hide();
                $('.join').show();
                $('.checkcar').show();
                $('.sss').html('');
                var total = 0;
                
                var res = data.map(function(item){
                   total = total + item.qty*1;
                    return `<li data-id="${item.id}">
                            <a href="">
                            <img src="${item.imgs}">
                            <span class="name">${item.name}</span>
                            <span class="nameEn">${item.category}</span>
                            <span class="price"><strong>${item.price}</strong>X<em>${item.qty}</em></span>
                            </a>
                            <div title="从购物车移除${item.name}" class="btn-remove">&times;</div>
                            </li>`
                    
                })
                $('.c_qty').html(total);
                $('.sss').append(res);
                $('.measure').text(total);
            }
            })
        }
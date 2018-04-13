require(['config'],function(){
    require(['jquery'],function($){

        $('#pageHeader').load('../html/rHeader.html');

        var $loginname = $('.login-name');
        var $password = $('.login-password');

        //判断用户
        $loginname.on('blur',function(){
            $.ajax({
                url:'../api/login.php',
                data:{username:$loginname.val()},
                success:function(data){
                    if(data == 'no'){
                        $loginname.siblings('span').text('没有这个用户名')
                    }else{
                        $loginname.siblings('span').text('')
                    }
                }
            })
        })

        //登录
        $('.submit').click(function(){
            $.ajax({
                url:'../api/login.php',
                data:{
                    username:$loginname.val(),
                    password:$password.val(),
                    type:'log',
                },
                success:function(data){
                    if(data == 'yesyes'){
                        alert('登录成功');
                        location.href = '../index.html';
                    }else{
                        $password.siblings('span').text('密码错误')
                    }
                }
            })
        })

    })
})
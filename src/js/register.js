require(['config'],function(){
    require(['jquery','common'],function($){

        $('#pageHeader').load('../html/rHeader.html');

        var $username = $('.username');
        var $password1 = $('.password1');
        var $password2 = $('.password2');

        
        //判断手机号码规范
        $username.on('input',function(){
            phone();
        })

        function phone(){
            if(!(/^[1][3,4,5,7,8][0-9]{9}$/.test($username.val()))){
                $username.siblings('span').text('手机号码不对')
                return false;
            }else{
                return true;
            }
        }

        $username.on('blur',function(){
            userpost();
        })
      
        function userpost(){
            $.ajax({
                    url:'../api/register.php',
                    data:{username:$username.val()},
                    success:function(data){
                        if(data == 'no'){
                            $username.siblings('span').text('该手机号码已存在');
                            
                        }else{
                            $username.siblings('span').text('');
                            
                        }

                    }
                    
                })
        }


        $password1.on('blur',function(){
            pass();
        })

        function pass(){
            if($password1.val().length>=6&&$password1.val().length<=20){
                $password1.siblings('span').text('')
                return true;
            }else{
                $password1.siblings('span').text('密码不对')
                return false;
            }
        }

        //二次密码判断
        $password2.on('blur',function(){
            twicePass();
        })

        function twicePass(){
            if($password1.val()!==$password2.val()){
                $password2.siblings('span').text('两次密码不对')
                return false;
            }else{
                $password2.siblings('span').text('')
                return true;
            }
        }

            

        var $fCode = $('.fCode');
        var $code = $('.code');
        //获取验证码
        show();
        $fCode.click(function(){
            show();
        })
        //随机颜色
        function show(){
            $fCode.text(showCode());
            $fCode.css('color',randomColor());
        }

        //生成4位验证码
        function showCode(){
            return Math.random().toString(32).slice(2,6)
        }

        //验证码判断
        $code.on('blur',function(){
            code();
        })

        function code(){
            if($code.val()!=$fCode.text()){
                $code.siblings('span').text('验证码不对')
                return false;
            }else{
                $code.siblings('span').text('')
                return true;
            }
        }

        //注册完成
        var $check = $('.check');
        $('.signin').click(function(){
            // console.log(phone())
            // console.log(code())
            // console.log(twicePass())
            // console.log($check.prop('checked'))
            // console.log(pass())
            if(twicePass()==true&&phone()==true&&code()==true&&pass()==true&&$check.prop('checked')){
                console.log(123)
                $.ajax({
                    url:'../api/register.php',
                    data:{
                        username:$username.val(),
                        password:$password2.val(),
                        type:'reg'
                    },
                    success:function(data){console.log(data)
                        if(data == 'yesyes'){
                            location.href = '../html/login.html';
                            alert('注册成功')
                        }else{
                            alert('注册失败')
                        }
                    }
                })
            }
        })


    })
})
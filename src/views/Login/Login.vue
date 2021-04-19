<template>
    <div class="wrapper">
        <img class=wrapper__img src="http://www.dell-lee.com/imgs/vue3/user.png" alt="">
        <div class="wrapper__input">
            <input type="text" class='wrapper__input__text' placeholder="请输入手机号">
        </div>
        <div class="wrapper__input">
            <input type="text" class='wrapper__input__text' placeholder="请输入密码">
        </div>
        
        <div class="wrapper__login">登录</div>
        <div class="wrapper__tips">
            <div>立即注册 &nbsp;&nbsp;|&nbsp;&nbsp; 忘记密码</div>
            
        </div>
        
        
    </div>
</template>

<script>
export default {
    name: 'Login'
}
</script>

<style lang="scss" scoped>
*{
    padding:0;
    margin:0;
}
.wrapper{
    position: absolute;
    top:1.4rem;
    left: 0;
    right: 0;
    padding: 0 0.4rem;
    
}
.wrapper__img{
    display: block;
    right:1.55rem;
    width: 0.66rem;
    height: 0.66rem;  
    margin: auto;
    padding-bottom: 0.4rem;
}
.wrapper__input{
    width: 100%;
    height: 0.48rem;
    line-height: 0.48rem;
    background: #F9F9F9;
    border: 0.01rem solid rgba(0,0,0,0.10);
    border-radius: 6px;
    margin-bottom: 0.16rem;
    box-sizing: border-box;
    &__text{
       border: none;
       outline: none;
       width: 90%;
       height: 0.24rem;
       background: #F9F9F9;
       font-size: 0.16rem;
       ::placeholder{
            font-family: PingFangSC-Regular;
            font-size: 016rem;
            color: rgba(0,0,0,0.50);
            letter-spacing: 0;
            line-height: 24px; 
       }
      
    }
}
.wrapper__login{
    width: 100%;
    height: 0.48rem;
    margin: 0.32rem 0 0.16rem 0;
    background: #0091FF;
    box-shadow: 0 4px 8px 0 rgba(0,145,255,0.32);
    border-radius: 4px;

    font-size: 16px;
    color: #FFFFFF;
    letter-spacing: 0;
    text-align: center;
    line-height: 0.45rem;
}

.wrapper__tips{
    text-align: center;
    font-size: 14px;
    color: rgba(0,0,0,0.50);
    letter-spacing: 0;
}
                          
</style>
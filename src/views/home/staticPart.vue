<template>
 <div class="position">
      <span class='iconfont'>&#xe605;</span>
      <span class='adress'>北京市海淀区西三环首都师范大学校本部理科大楼</span>
      <span class='iconfont position__bell'>&#xe6bb;</span>
      </div>

      <div class="search">
        <span class='iconfont'>&#xe60b;</span>
        <input type="text" value="山姆会员商店优惠商品" style="border:none;outline:none">
      </div>

      <div class="banner">
        <img class="banner__img"
          src="http://www.dell-lee.com/imgs/vue3/banner.jpg"
        />
      </div>

      <div class="icons">
        <div class="icons__item" v-for='item in staticList' :key='item.id'>
          <img class="icons__item__img"
          :src="item.img"/>
          <p class='icons__item__desc'>{{item.desc}}</p>
        </div>
        
      </div>
   <div class="gap"></div>
</template>

<script>
export default {
  name: 'StaticPart',
  setup(){
    const staticList=[
      { id:1, img:'http://www.dell-lee.com/imgs/vue3/超市.png',desc:'超市便利' } ,
        { id:2, img:'http://www.dell-lee.com/imgs/vue3/菜市场.png',desc:'菜市场' } ,
        { id:3, img:'http://www.dell-lee.com/imgs/vue3/水果店.png',desc:'水果店' } ,
        { id:4,img:'http://www.dell-lee.com/imgs/vue3/鲜花.png',desc:'鲜花绿植' } ,
        { id:5,img:'http://www.dell-lee.com/imgs/vue3/医药健康.png',desc:'医药健康' } ,
        { id:6,img:'http://www.dell-lee.com/imgs/vue3/家居.png',desc:'家居时尚' } ,
        { id:7, img:'http://www.dell-lee.com/imgs/vue3/蛋糕.png',desc:'烘焙蛋糕' } ,
        { id:8, img:'http://www.dell-lee.com/imgs/vue3/签到.png',  desc:'签到' } ,
        { id:8, img:'http://www.dell-lee.com/imgs/vue3/大牌免运.png', desc:'大牌免运' } ,
        { id:10, img:'http://www.dell-lee.com/imgs/vue3/红包.png', desc:'红包套餐' } 
    ]
      return{ staticList }
  }
}
</script>
<style lang="scss">
@import '../../style/mixins.scss';//换行
.position{
  padding: .16rem .16rem .16rem 0;
  position: relative;
  @include ellipse;
   .iconfont{
    font-size: 0.18rem;
    line-height: 0.18rem;
      }
 .adress{
   font-size: 0.16rem;
   font-weight:bold;
   margin-left: 0.08rem;
   margin-right: 0.08rem;
   color:#333333
  }
  .position__bell{
    position: absolute;
    right: 0;
    top:0.17rem
  }
}
  .search{
    margin-bottom: 0.12rem;
    background-color: #F5F5F5;
    line-height: .32rem;
    border-radius: 0.16rem;
    font-size: 0.14rem;
    position: relative;
    color: #B7B7B7;
    .iconfont{
      padding:0.01rem 0.12rem 0 0.16rem ;
    }
    input{
      color: #B7B7B7;
      background-color: #F5F5F5;
      width:80%;
    }
  }
  .banner{
    //防抖
    height:0;
    overflow: hidden;
    padding-bottom: 25.4%;
    margin-bottom: 0.16rem;
    .banner__img{
      width:100%
    }
  }
  .icons{
    display:flex;
    flex-wrap: wrap;
    position: relative;
    &__item{
       width:20%;
       justify-content: center;
       align-items: center;
      &__img{
        width:0.4rem;
        height: 0.4rem;
        display: block;
        margin: 0 auto;
      }
      &__desc{
        margin: 0.06rem 0 0.16rem 0;
        font-size: 0.12rem;
        text-align: center;
        font-family:PingFangSC-Regular;
        color: #333333;
      }
    }
    .gap{
    background-color: #F1F1F1;
    height: 0.1rem;
    margin: 0 -0.18rem
  }
  }
</style>

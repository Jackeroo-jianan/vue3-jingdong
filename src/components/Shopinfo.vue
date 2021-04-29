<template>
    <div class="shopinfo" >
     <img :src='item.imgUrl'>
     <div class="shop__item">
       <div class='shop'>{{item.name}}</div>
       <div class="sale">
        <span class="sale">月售: {{item.sales}}</span>
        <span class="sale">起送: {{item.expressLimit}}</span>
        <span class="sale">基础运费: {{item.expressPrice}}</span>
       </div>
       <div class='discount'>{{item.slogan}}</div>
     <div :class="{'gap':hideBorder ? false : true}"></div>
     </div>
      </div>  

</template>


<script>
export default {
    name:'ShopInfo',
    props:['item','hideBorder']
}
</script>

<style lang="scss" scoped>
.shopinfo{
    display: flex;
    img{
      width: 0.56rem;
      height: 0.56rem;
      padding-right: 0.19rem;
    }
      .shop__item{
        .shop{
        font-size: 0.16rem;
        color:#333333
      }
      .sale{
        line-height: 0.18rem;
        font-size: 0.13rem;
        margin: 0.08rem 0;
        color:#333333;
         span{
          margin-right: 0.16rem;
         }
      }
      .discount{
        color: #E93B3B;
        line-height: 0.18rem;
        font-size: 0.13rem;
      }
      .gap{
      background-color: #F1F1F1;
      height: 0.01rem;
      margin: 0.12rem 0;}
    }
  }
</style>
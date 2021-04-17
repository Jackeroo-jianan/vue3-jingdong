<template>
   <div class="docker">
     
    <span :class="{'docker__item':true,'docker__item--active':index==0?true:false}"
      v-for='(item , index) in dockerList' :key="index">

      <div class="iconfont" v-html='item.icon'></div>
      <div class="docker__title">{{item.text}}</div>
      </span>
    
  </div>
</template>

<script>
export default {
  name: 'Docker',
  setup(){
    const dockerList=[
    { icon:'&#xe6f1;', text: '首页' } ,
    { icon:'&#xe671;', text: '订单' } ,
    { icon:'&#xe603;', text: '购物车' } ,
    { icon:'&#xe604;', text : '我的' } ,
    ];
  return{ dockerList }
  }
}
</script>

<style lang="scss">
.docker{
  display: flex;
  box-sizing: border-box;
  padding:0 .18rem;
  position: absolute;
  left:0;
  bottom: 0;
  width: 100%;
  height: .49rem;
  border-top: .01rem solid #F1F1F1 ;
  &__item{
    flex:1;
  text-align: center;
  .iconfont{
  font-size: .18rem;
  padding: .07rem 0 .02rem 0;
}
  &--active{
    color:#1FA4FC;
  }
  }
&__title{
    font-size: .1rem;
  }
}
</style>

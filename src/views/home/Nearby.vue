<template>
<h3 class='tip'>附近店铺</h3>
   <div class="nearby" v-for='item in nearbyList' :key="item.id">
     <img :src='item.img'>
     <div class="nearby__item">
       <div class='shop'>{{item.title}}</div>
       <div class="sale">
        <span v-for="(it,i) in item.tags" :key='i'>{{it}}  </span>
       </div>
       <div class='discount'>{{item.desc}}</div>
     <div class=gap2></div>
     </div>
      </div>

</template>

<script>
export default {
  name: 'Nearby',
  setup(){
    const nearbyList=[{
      id:1,
      img:"http://www.dell-lee.com/imgs/vue3/near.png",
      title:'沃尔玛',
      tags:['月售1万+','起送￥0','基础运费￥5'],
      desc:'VIP尊享满89元减4元运费券（每月3张）' 
      } ,
      {
      id:2,
      img:"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwww.createbaby.com%2Fuploads%2Fimage%2F20170419%2F1492602191.jpg&refer=http%3A%2F%2Fwww.createbaby.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1621224501&t=5d8abd1b2fc192989fd1c6a0e1633a95",
      title:'山姆会员商店',
      tags:['月售2千+','起送￥0','基础运费￥5'],
      desc:'联合利华洗护满10减5' 
      } ,
      {
      id:3,
      img:"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwww.createbaby.com%2Fuploads%2Fimage%2F20170419%2F1492602191.jpg&refer=http%3A%2F%2Fwww.createbaby.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1621224501&t=5d8abd1b2fc192989fd1c6a0e1633a95",
      title:'山姆会员商店分店2',
      tags:['月售5千+','起送￥0','基础运费￥6'],
      desc:'联合利华洗护满50减10' 
      } ,
      {
      id:4,
      img:"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwww.createbaby.com%2Fuploads%2Fimage%2F20170419%2F1492602191.jpg&refer=http%3A%2F%2Fwww.createbaby.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1621224501&t=5d8abd1b2fc192989fd1c6a0e1633a95",
      title:'山姆会员商店分店3',
      tags:['月售8千+','起送￥0','基础运费￥10'],
      desc:'联合利华洗护满100减50' 
      } ,
    ]
    return { nearbyList }
  }
}
</script>

<style lang="scss">
.tip{
    margin: 0.16rem 0 0.14rem 0;
    font-size: .18rem;
  }
  .nearby{
    display: flex;
    img{
      width: 0.56rem;
      height: 0.56rem;
      padding-right: 0.19rem;
    }
      .nearby__item{
        .shop{
        font-size: 0.16rem;
      }
      .sale{
        line-height: 0.18rem;
        font-size: 0.13rem;
        margin: 0.08rem 0;
         span{
          margin-right: 0.16rem;
         }
      }
      .discount{
        color: #E93B3B;
        line-height: 0.18rem;
        font-size: 0.13rem;
      }
      .gap2{
      background-color: #F1F1F1;
      height: 0.01rem;
      margin: 0.12rem 0;}
    }
  }
</style>

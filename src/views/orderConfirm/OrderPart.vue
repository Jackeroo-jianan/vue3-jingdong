<template>
    <div class="order">
    <div class="order__prices">实付金额&nbsp; <b>&yen;{{getPrice}}</b></div>
    <div class="order__submit">提交订单</div>
</div>
</template>

<script>
import { useRoute } from 'vue-router'
import { commonCartMoudle } from "../../commonMoudel/commonCartMoudle";

export default {
    name:'OrderPart',
     setup(){
      const route = useRoute()
      const shopId = route.params.id
      const { getPrice } = commonCartMoudle(shopId)
      return  {  shopId ,getPrice }
  }
}
</script>

<style lang="scss" scoped>
    
.order{
    position: absolute;
    bottom: 0;
    right: 0;
    left: 0;
    height: 0.5rem;
    display: flex;
    line-height: 0.5rem;
    .order__prices{
        width: 70%;
        padding-left: 0.24rem;
        font-size: 0.14rem;
        color: #333333;
    }
    .order__submit{
        background: #4FB0F9;
        width: 30%;
        font-size: 0.14rem;
        color: #FFFFFF;
        text-align: center;
    }
}
</style>
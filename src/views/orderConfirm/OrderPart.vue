<template>
  <div class="order">
    <div class="order__prices">
      实付金额&nbsp; <b>&yen;{{ getPrice }}</b>
    </div>
    <div class="order__submit"
    @click='()=>handleSubmitOrder(true)'>
    提交订单</div>
  </div>
  <div class="mask" v-show="showMask">
    <div class="tip">
      <h4 class="tip__title">确认离开收银台</h4>
      <p class="tip__message">请尽快完成支付订单，否则将被取消</p>
      <div class="tip__select">
        <div class="tip__select__cancel btn" @click="()=>handleConfirmOrder(true)">
          取消订单
        </div>
        <div class="tip__select__confirm btn" @click="()=>handleConfirmOrder(false)">
          确认订单
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { post } from "../../utils/request";
import { useRoute, useRouter } from "vue-router";
import { commonCartMoudle } from "../../commonMoudel/commonCartMoudle";
import { useStore } from 'vuex';

const submitOrderMoudle = (shopId,shopName, productList)=>{
    const router = useRouter();
    const store = useStore();

   const handleConfirmOrder = async (isCanceled) => {
       //console.log(productList)
       const products  = []
       for (let i in productList.value){
           const product = productList.value[i]
           products.push({ id:product._id,num:product.count })
       }
       
      try {
        const result = await post("/api/order/confirm", {
          addressId: 1,
          shopId,
          shopName:shopName.value,
          isCanceled:isCanceled,
          products
          
        });
        if (result?.data?.errno === 0) {
          store.commit('cleanThisCart',{ shopId })
          router.push({ name: "MyOrder" });
        } else {
        }
      } catch (e) {
      }
    };

    return {   handleConfirmOrder  };
  }

const useMaskMoudel=()=>{
    const showMask = ref(false)
    const handleSubmitOrder = (isShowMask)=>{
        showMask.value = isShowMask
   }
   return{ showMask,handleSubmitOrder }
}
export default {
  name: "OrderPart",
  setup() {
    
    const route = useRoute();
    const shopId = route.params.id;
    const { getPrice , shopName ,productList } = commonCartMoudle(shopId);
    const { handleConfirmOrder } = submitOrderMoudle(shopId,shopName, productList)
    const { showMask,handleSubmitOrder } = useMaskMoudel()
   
   

    return { showMask,shopId, getPrice,  handleSubmitOrder,handleConfirmOrder ,shopName,productList };
  },
};
</script>

<style lang="scss" scoped>
.order {
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  height: 0.5rem;
  display: flex;
  line-height: 0.5rem;
  .order__prices {
    width: 70%;
    padding-left: 0.24rem;
    font-size: 0.14rem;
    color: #333333;
  }
  .order__submit {
    background: #4fb0f9;
    width: 30%;
    font-size: 0.14rem;
    color: #ffffff;
    text-align: center;
  }
}
.mask {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.5);
}
.tip {
  width: 3rem;
  height: 1.55rem;
  background: #ffffff;
  border-radius: 0.04rem;
  z-index: 2;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  .tip__title {
    margin: 0.24rem 0 0.08rem 0;
    font-size: 0.18rem;
    color: #333333;
  }
  .tip__message {
    font-size: 0.14rem;
    color: #666666;
    margin-bottom: 0.3rem;
  }
  .tip__select {
    display: flex;
    margin: 0 0.58rem;
    position: relative;
    .tip__select__cancel {
      border: 0.01rem solid #4fb0f9;
      border-radius: 0.16rem;
      width: 0.8rem;
      height: 0.32rem;
      font-size: 0.14rem;
      color: #0091ff;
      line-height: 0.32rem;
      box-sizing: border-box;
    }
    .tip__select__confirm {
      border: 1px solid #4fb0f9;
      border-radius: 0.16rem;
      background-color: #4fb0f9;
      width: 0.8rem;
      height: 0.32rem;
      font-size: 0.14rem;
      line-height: 0.32rem;
      color: #ffffff;
      box-sizing: border-box;
      position: absolute;
      right: 0;
    }
  }
}
</style>
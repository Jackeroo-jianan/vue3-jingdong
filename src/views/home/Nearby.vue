<template>
<h3 class='tip'>附近店铺</h3>
 <router-link 
  v-for='item in nearbyList' 
  :key="item._id"
  :to =" `/shop/${item._id}`" >
 <ShopInfo 
  :item='item'/> 
</router-link>
</template>

<script>

import { ref } from 'vue'
import { get } from '../../utils/request'
import ShopInfo from '../../components/Shopinfo'

 const nearbyMoudle=()=>{
    const nearbyList=ref([]);
    const getNearbyList=async()=>{
      const result = await get("/api/shop/hot-list")
      //console.log(result)
      //console.log(nearbyList)
      if (result?.data?.errno === 0) {
        nearbyList.value = result.data.data
      }   
    }
    getNearbyList()
    return { nearbyList, getNearbyList }
  }
export default {
  name: 'Nearby',
  components:{ ShopInfo },
  setup(){
      const { nearbyList, getNearbyList }=nearbyMoudle();

      return { nearbyList, getNearbyList }
  }
}
</script>

<style lang="scss" scoped>
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
  a{
      text-decoration: none;
    }
</style>

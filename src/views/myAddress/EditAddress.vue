<template>
  <div class="wrapper">
    <div class="header">
      <div class="iconfont back" @click="handelClickBack">&#xe697;</div>
      <h4 class="header__edit">修改地址信息</h4>
      <div class="header__create" @click="handleClickSaveAddress">保存</div>
    </div>
    <div class="address">
      <div class="address__item">
        <div class="address__item__desc">所在城市:</div>
         <input  v-model="currentAddress.city" /> 
      </div>
      <div class="address__item">
        <div class="address__item__desc">所在区域:</div>
        <input v-model="currentAddress.area" />
      </div>
      <div class="address__item">
        <div class="address__item__desc">具体住址:</div>
        <input v-model="currentAddress.houseNumber" />
      </div>
      <div class="address__item">
        <div class="address__item__desc">收货人:</div>
        <input v-model="currentAddress.name" />
      </div>
      <div class="address__item">
        <div class="address__item__desc">联系电话:</div>
        <input v-model="currentAddress.phone" />
      </div>
    </div>
    <div class="setDefault" @click="changeIsSelected">
      选择收货地址
    </div>
  </div>
</template>

<script>
import { useRouter, useRoute } from "vue-router";
import { reactive,  } from "vue";
import { get,post } from "../../utils/request";
import { AddressListMoudle } from '../../commonMoudel/commonAddressMoudle'
import { useStore } from 'vuex';

const useCurrentAddressMoudle=()=>{
    const route = useRoute()
    const router = useRouter()
    const addressId = route.params.id
    
    const currentAddress = reactive({
      city:'', area:'', houseNumber:'', name:'', phone:''
    })

    const getCurrentAddress = async () => {
      const result = await get(`/api/address/${addressId}`);
      console.log(result)
      if (result?.data?.errno === 0) {
        //console.log(result)
        const { city, area, houseNumber, name, phone } = result.data.data[addressId-1];
        currentAddress.city = city;
        currentAddress.area = area;
        currentAddress.houseNumber = houseNumber;
        currentAddress.name = name;
        currentAddress.phone = phone;
      }
      
    };
    const handleClickSaveAddress = async () => {
      const result = await post('/api/address', {
        data: currentAddress
      })
      if (result?.errno === 0) { router.back() } 
    }
  return { getCurrentAddress ,currentAddress,handleClickSaveAddress }
}

export default {
  name: "EditAddress",
  setup() {
    const store = useStore()
    console.log(store.state.addressList)
    const changeIsSelected = ()=>{
      store.commit('changeDefaultAddress',{ currentAddress  })
    }

    const { getCurrentAddress ,currentAddress,handleClickSaveAddress  } = useCurrentAddressMoudle()
    getCurrentAddress()
    const {  handelClickBack } = AddressListMoudle()
    return { getCurrentAddress ,currentAddress,handelClickBack,handleClickSaveAddress,changeIsSelected }
    
    
  },
};
</script>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
}
.wrapper {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #f5f5f5;
}
.header {
  height: 0.45rem;
  display: flex;
  text-align: center;
  line-height: 0.45rem;
  background-color: #fff;
  .header__edit {
    flex: 1;
    font-size: 0.16rem;
    color: #333333;
  }
  .back,
  .header__create {
    flex: 0 0 0.5rem;
  }
  .header__create {
    color: #333333;
    font-size: 0.16rem;
  }
  .back {
    font-size: 0.2rem;
  }
}
.title {
  margin: 0.16rem 0 0.12rem 0.18rem;
  font-size: 0.14rem;
  color: #333333;
}
.address {
  margin-top: 0.12rem;
  background-color: #fff;
}
.address__item {
  display: flex;
  height: 0.45rem;
  line-height: 0.45rem;
  border-bottom: 0.01rem solid #f5f5f5;
  font-size: 0.14rem;
  color: #666666;
  margin: 0 0.18rem;
  .address__item__desc {
    padding-right: 0.05rem;
    color: #666666;
  }
  input {
    border: none;
    outline: none;
    width: 75%;
  }
}
.setDefault{
  margin: auto;
  height: 1rem;
  font-size: 0.16rem;
  text-align: center;
  line-height: 1rem;
}
</style>
<template>
  <div class="wrapper">
    <div class="header">
      <div class="iconfont back" @click="handelClickBack">&#xe697;</div>
      <h4 class="header__edit">管理收货地址</h4>
      <div class="header__create" @click="handleClickToNew">新建</div>
    </div>
    <h5 class="title">我的收货地址</h5>
    <Address
      v-for="address in addressList"
      :key="address._id"
      :address="address"
     
    />
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { AddressListMoudle } from '../../commonMoudel/commonAddressMoudle'
import Address from '../../components/Address'

const toNewMoudle = ()=>{
  const router = useRouter()
  const handleClickToNew=()=>{
    router.push({ name:'NewAddress' })
  }
  return { handleClickToNew }
}
export default {
  name: "MyAddress",
  components:{ Address },
  setup() {
    
    const {  handelClickBack,addressList } = AddressListMoudle()
    const { handleClickToNew } = toNewMoudle()
    return { handelClickBack,addressList,handleClickToNew };
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
  overflow-y:scroll ;
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

</style>
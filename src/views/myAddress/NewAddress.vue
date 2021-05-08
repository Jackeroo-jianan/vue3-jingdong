<template>
  <div class="wrapper">
    <div class="header">
      <div class="iconfont back" @click="handelClickBack">&#xe697;</div>
      <h4 class="header__edit">新建地址</h4>
      <div class="header__create" @click="handleClickCreteAddress">保存</div>
    </div>
    <div class="address">
        <div class="address__item">
        <div class="address__item__desc">所在城市:</div>
        <input  placeholder="如北京市" v-model="newAddress.city"  />
        </div>
        <div class="address__item">
        <div class="address__item__desc">所在区域:</div>
        <input  placeholder="街道/小区/大厦/学校" v-model="newAddress.area"  />
        </div>
        <div class="address__item">
        <div class="address__item__desc">具体住址:</div>
        <input  placeholder="如3号楼一单元401" v-model="newAddress.houseNumber"  />
        </div>
        <div class="address__item">
        <div class="address__item__desc">收货人:</div>
        <input  placeholder="收货人的姓名" v-model="newAddress.name"  />
        </div>
        <div class="address__item">
        <div class="address__item__desc">联系电话:</div>
        <input  placeholder="收货人联系电话" v-model="newAddress.phone"  />
        </div>

    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import { reactive,  } from "vue";
import { post } from "../../utils/request";
import { AddressListMoudle } from '../../commonMoudel/commonAddressMoudle'

const useCurrentAddressMoudle=()=>{
    const router = useRouter()
    
    const newAddress = reactive({
      city:'', area:'', houseNumber:'', name:'', phone:''
    })

    const handleClickCreteAddress = async () => {
      const result = await post('/api/address', {
        data: newAddress
      })
      if (result?.errno === 0) { router.back() } 
    }
  return { newAddress,handleClickCreteAddress }
}

export default {
  name: "NewAddress",
  setup() {

    //console.log(currentAddress)
    const {  newAddress,handleClickCreteAddress  } = useCurrentAddressMoudle()
    const {  handelClickBack } = AddressListMoudle()
    return { newAddress,handleClickCreteAddress ,handelClickBack }
    
    
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
.address{
    margin-top: 0.12rem; 
    background-color: #fff;
    
}
.address__item{
    display: flex;
    height: .45rem;
    line-height: 0.45rem;
    border-bottom: 0.01rem solid #f5f5f5;
    font-size: 0.14rem;
    color: #666666;
    margin: 0 0.18rem;
    .address__item__desc{
        padding-right: 0.05rem;
        color: #666666 ;
    }
    input{
        border: none;
        outline: none;
        width: 75%;
    }
}
</style>
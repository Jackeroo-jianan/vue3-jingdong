<template>
  <div class="top">
    <div class="top__bgcor">
      <div class="top__header">
        <span class="top__header__iconfont iconfont" @click="handelClickBack"
          >&#xe697;</span
        >
        确认订单
      </div>
    </div>

    <div class="top__receive">
      <h4 class="top__receive__title">收货地址</h4>
      <div class="top__receive__address">
        {{ address.city }} {{ address.area }} {{ address.houseNumber }}
      </div>
      <div class="top__receive__personInfo">
        <span class="name">{{ address.name }}</span>
        <span class="phone">{{ address.phone }}</span>
      </div>
      <router-link :to="{ path: `/myAddress` }">
        <span
          class="top__receive__iconfont iconfont"
          @click="handleClickMyAddress"
          >&#xe60c;</span
        >
      </router-link>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { AddressListMoudle } from "../../commonMoudel/commonAddressMoudle";

export default {
  name: "TopPart",

  setup() {
    const store = useStore();
    const { handelClickBack } = AddressListMoudle();

    const address = store.state.addressList;
    return { handelClickBack, address };
  },
};
</script>

<style lang="scss" scoped>
.top {
  height: 1.96rem;
  position: relative;
}
.top__bgcor {
  height: 1.59rem;
  background-image: linear-gradient(to bottom, #0091ff, #fff);
}
.top__header {
  padding-top: 0.4rem;
  font-size: 0.16rem;
  position: relative;
  text-align: center;
  color: #ffffff;
  .top__header__iconfont {
    position: absolute;
    left: 0.15rem;
    font-size: 0.2rem;
    line-height: 0.18rem;
  }
}
.top__receive {
  background: #ffffff;
  border-radius: 0.04rem;
  height: 1.1rem;
  width: 3.4rem;
  position: absolute;
  bottom: 0;
  left: 0.18rem;
  box-sizing: border-box;
  .top__receive__title {
    margin: 0.16rem 0 0.14rem 0.16rem;
    font-size: 0.16rem;
    color: #333333;
  }
  .top__receive__address {
    font-size: 0.14rem;
    color: #333333;
    margin: 0 0 0.06rem 0.16rem;
    width: 80%;
  }
  .top__receive__personInfo {
    margin-left: 0.16rem;
    font-size: 0.12rem;
    color: #666666;
    .name {
      margin-right: 0.06rem;
    }
  }
}
.top__receive__iconfont {
  position: absolute;
  right: 0.3rem;
  top: 0.15rem;
  color: #666666;
  font-size: 0.18rem;
}
</style>
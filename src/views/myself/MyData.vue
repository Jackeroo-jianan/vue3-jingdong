<template>
  <div class="myData">
    <div class="myData__item">
      <div class="iconfont wallet">&#xe606;</div>
      <div class="describle">我的钱包</div>
      <div class="iconfont to">&#xe60c;</div>
    </div>
    <div class="myData__item">
      <div class="iconfont address">&#xe6e4;</div>
      <div class="describle">我的地址</div>
      <div class="iconfont to" @click="handleClickTo">&#xe60c;</div>
    </div>
    <div class="myData__item">
      <div class="iconfont forhelp">&#xe600;</div>
      <div class="describle">客服与帮助</div>
      <div class="iconfont to">&#xe60c;</div>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";

const useSkipTo = () => {
  const router = useRouter();
  const handleClickTo = () => {
    router.push({ name: "MyAddress" });
  };
  return { handleClickTo };
};

export default {
  name: "MyData",
  setup() {
    const { handleClickTo } = useSkipTo();
    return { handleClickTo };
  },
};
</script>

<style lang="scss" scoped>
.myData {
  margin: 0 0.18rem;
  box-shadow: 0.01rem 0.01rem 0.03rem #888888;
}
.myData__item {
  position: relative;
  display: flex;
  height: 0.45rem;
  line-height: 0.45rem;
  font-size: 0.15rem;
  color: #262626;
  .wallet {
    color: #ed4a47;
  }
  .address {
    color: #32c5ff;
    border-radius: 0.08rem;
  }
}
.iconfont {
  margin: 0 0.12rem 0 0.16rem;
  font-size: 0.22rem;
}
.to {
  position: absolute;
  right: 0;
  color: #c2c4ca;
}
</style>
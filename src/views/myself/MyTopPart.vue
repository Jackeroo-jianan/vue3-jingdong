<template>
  <div class="top">
    <div class="top__bgcor">
      <span class="top__iconfont iconfont"  @click="handleClickQuit">&#xe612;</span>
    </div>
    <div class="top__receive">
      <h5 class="top__receive__username">{{ personalInfo.username }}</h5>
      <div class="top__receive__id">ID:{{ personalInfo._id }}</div>
      <div class="gap"></div>
      <div class="top__receive__personInfo">
        <div class="redPacket item">
          <div class="info__title">红包</div>
          <div class="count">&yen;{{ personalInfo.redPacket }}</div>
        </div>
        <div class="coupons item">
          <div class="info__title">优惠卷</div>
          <div class="count">{{ personalInfo.coupons }}张</div>
        </div>
        <div class="allowance item">
          <div class="info__title">补贴</div>
          <div class="count">&yen;{{ personalInfo.allowance }}</div>
        </div>
        <div class="blankNote item">
          <div class="info__title">白条</div>
          <div class="count">&yen;{{ personalInfo.blankNote }}</div>
        </div>
      </div>
      <img class="top__pic" :src="personalInfo.imgUrl" />
    </div>
  </div>
</template>

<script>

import { reactive } from "vue";
import { useRouter } from 'vue-router';
import { get } from "../../utils/request";


const useTopPartMoudle = () => {
  const personalInfo = reactive({ 
    username: "",_id: "", redPacket: "",coupons: "",allowance: "", blankNote: "",
  });
  const getNearbyList = async () => {
    const result = await get("/api/user/info");
    if (result?.data?.errno === 0) {
      personalInfo.username = result.data.data.username||'';
      personalInfo._id = result.data.data._id||'';
      personalInfo.imgUrl = result.data.data.imgUrl||'';
      personalInfo.redPacket = result.data.data.redPacket||'';
      personalInfo.coupons = result.data.data.coupons||'';
      personalInfo.allowance = result.data.data.allowance||'';
      personalInfo.blankNote = result.data.data.blankNote||'';
    }
  };
  getNearbyList();
  return { personalInfo }
};

const useQuitMoudle = ()=>{
    const router = useRouter()
    const handleClickQuit = () => {
      localStorage.removeItem('isLogin')
      router.replace({ name: 'Login' })
    }
    return { handleClickQuit };
}
export default {
  name: "MyTopPart",
  setup() {
    const { handleClickQuit } = useQuitMoudle()
    const { personalInfo } = useTopPartMoudle();
    return { personalInfo ,handleClickQuit };
  },
};
</script>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
}
.top {
  position: relative;
  height:3.1rem ;
}
.top__bgcor {
  height: 2.2rem;
  background-image: linear-gradient(to bottom, #0091ff, #fff);
}
.top__iconfont {
  position: absolute;
  top: 0.2rem;
  right: 0.2rem;
  font-size: 0.2rem;
  color:#C1C0C9 ;
}
.top__pic {
  width: 0.94rem;
  height: 0.94rem;
  position: absolute;
  left: 50%;
  top: 0;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  z-index: 2;
}
.top__receive {
  background: #ffffff;
  border-radius: 0.04rem;
  width: 3.4rem;
  position: absolute;
  top: 1.1rem;
  left: 0.18rem;
  box-sizing: border-box;
  text-align: center;
  box-shadow: 0.01rem 0.01rem 0.03rem #888888; 
  .gap {
    margin: 0.12rem 0;
    height: 0.01rem;
    background: #f1f1f1;
  }
  .top__receive__username {
    margin: 0.5rem 0 0.02rem 0;
    font-size: 0.16rem;
    font-size: 24px;
    color: #262628;
    text-align: center;
  }
  .top__receive__id {
    font-size: 0.14rem;
    color: #c1c0c9;
  }
  .top__receive__personInfo {
    margin-top: 0.12rem;
    margin-bottom: 0.16rem;
    display: flex;
    .item {
      flex: 1;
    }
    .info__title {
      font-size: 0.14rem;
      color: #c1c0c9;
      text-align: center;
      margin-bottom: 0.05rem;
    }
    .count {
      font-size: 0.16rem;
      color: #262628;
      text-align: center;
    }
  }
}
</style>
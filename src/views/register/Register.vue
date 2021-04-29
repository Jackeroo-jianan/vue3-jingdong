<template>
  <div class="wrapper">
    <img
      class="wrapper__img"
      src="http://www.dell-lee.com/imgs/vue3/user.png"
      alt=""
    />
    <div class="wrapper__input">
      <input
        type="text"
        class="wrapper__input__text"
        placeholder="请输入用户名"
        v-model="registerData.username"
      />
    </div>
    <div class="wrapper__input">
      <input
        type="password"
        class="wrapper__input__text"
        placeholder="输入注册密码"
        v-model="registerData.password"
      />
    </div>
    <div class="wrapper__input">
      <input
        type="password"
        class="wrapper__input__text"
        placeholder="确认注册密码"
        v-model="registerData.ensurement"
      />
    </div>

    <div class="wrapper__register" @click="handleRegister">注册</div>
    <div class="wrapper__tips">
      <div @click="handleToLogin">已有账号前去登录</div>
    </div>
    <Toast v-if="toastData.showToast" :message="toastData.toastMessage" />
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import { reactive } from "vue";
import { post } from "../../utils/request";
import Toast, { toastMoudle } from "../../components/Toast";

//注册部分
const registerMoudel = (changeToast) => {
  const registerData = reactive({
    username: "",
    password: "",
    ensurement: "",
  });
  const handleRegister = async () => {
    try {
      const { username, password } = registerData;
      if (username.length === 0 || password.length === 0) {
        changeToast("用户名或密码不能为空");
        return false;
      }
      const result = await post("/api/user/register", {
        username: registerData.username,
        password: registerData.password,
        ensurement: registerData.ensurement,
      });
      if (registerData.password !== registerData.ensurement) {
        changeToast("请重新确认密码");
      } else if (result?.data?.errno === 0) {
        changeToast("注册成功");
      } else {
        changeToast("注册失败");
      }
    } catch (e) {
      changeToast("请求失败");
    }
  };
  return { registerData, handleRegister };
};

//跳转部分
const toLogin = () => {
  const router = useRouter();

  const handleToLogin = () => {
    router.push({ name: "Login" });
  };
  return { handleToLogin };
};

export default {
  name: "Register",
  components: { Toast },

  setup() {
    const { toastData, changeToast } = toastMoudle();
    const { registerData, handleRegister } = registerMoudel(changeToast);
    const { handleToLogin } = toLogin();

    return {
      handleToLogin,
      handleRegister,
      changeToast,
      toastData,
      registerData,
    };
  },
};
</script>


<style lang="scss" scoped>
* {
  padding: 0;
  margin: 0;
}
.wrapper {
  position: absolute;
  top: 1.4rem;
  left: 0;
  right: 0;
  padding: 0 0.4rem;
}
.wrapper__img {
  display: block;
  right: 1.55rem;
  width: 0.66rem;
  height: 0.66rem;
  margin: auto;
  padding-bottom: 0.4rem;
}
.wrapper__input {
  width: 100%;
  height: 0.48rem;
  line-height: 0.48rem;
  background: #f9f9f9;
  border: 0.01rem solid rgba(0, 0, 0, 0.1);
  border-radius: 6px;
  margin-bottom: 0.16rem;
  box-sizing: border-box;
  &__text {
    border: none;
    outline: none;
    width: 90%;
    height: 0.24rem;
    background: #f9f9f9;
    font-size: 0.16rem;
    padding-left: 0.1rem;
    ::placeholder {
      font-family: PingFangSC-Regular;
      font-size: 016rem;
      color: rgba(0, 0, 0, 0.5);
      letter-spacing: 0;
      line-height: 24px;
    }
  }
}
.wrapper__register {
  width: 100%;
  height: 0.48rem;
  margin: 0.32rem 0 0.16rem 0;
  background: #0091ff;
  box-shadow: 0 4px 8px 0 rgba(0, 145, 255, 0.32);
  border-radius: 4px;

  font-size: 16px;
  color: #ffffff;
  letter-spacing: 0;
  text-align: center;
  line-height: 0.45rem;
}

.wrapper__tips {
  text-align: center;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.5);
  letter-spacing: 0;
}
</style>
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
        v-model="data.username"
      />
    </div>
    <div class="wrapper__input">
      <input
        type="password"
        class="wrapper__input__text"
        placeholder="请输入密码"
        v-model="data.password"
      />
    </div>

    <div class="wrapper__login" @click="handleLogin">登录</div>
    <div class="wrapper__tips">
      <div @click="handleToRegister">立即注册</div>
    </div>

    <Toast v-if="toastData.showToast" :message="toastData.toastMessage" />
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import { reactive } from "vue";
import { post } from "../../utils/request";
import Toast, { toastMoudle } from "../../components/Toast";

//登录部分
const loginMoudle = (changeToast) => {
  const router = useRouter(); //通过useRouter()获取路由实例
  const data = reactive({
    username: "",
    password: "",
  });

  const handleLogin = async () => {
    try {
      const { username,password } = data;
      if (username.length === 0||password.length === 0){
          changeToast("用户名或密码不能为空");
          return false
      }
      const result = await post("/api/user/login", {
        username: data.username,
        password: data.password,
      });
      if (result?.data?.errno === 0) {
        localStorage.isLogin=true
        router.push({ name: "Home" });
      } else {
        changeToast("登录失败");
      }
    } catch (e) {
      changeToast("请求失败");
    }
  };
  return { data, handleLogin };
};

//注册部分
const registerMoudel = () => {
  const router = useRouter();
  const handleToRegister = () => {
    router.push({ name: "Register" });
  };
  return { handleToRegister };
};


export default {
  name: "Login",
  components: { Toast },

  setup() {
    const { toastData, changeToast } = toastMoudle();
    const { data, handleLogin } = loginMoudle(changeToast);
    const { handleToRegister } = registerMoudel();

    /* promise版本
        const handleLogin=()=>{
            axios.post('https://www.fastmock.site/mock/ae8e9031947a302fed5f92425995aa19/jd/api/user/login',{
            username:data.username,
            password:data.password
            }).then(()=>{
                localStorage.isLogin=true;
                router.push({ name:'Home' })
            }).catch(()=>{
                alert("登录失败")
            })
        }*/

    return { handleLogin, data, changeToast, toastData, handleToRegister };
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
.wrapper__login {
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
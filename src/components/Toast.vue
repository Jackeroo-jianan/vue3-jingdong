<template>
  <div class="toast">{{ message }}</div>
</template>

<script>
import { reactive } from "vue";
export default {
  props: ["message"], //子组件接受父组件的内容
};

export const toastMoudle = () => {
  const toastData = reactive({
    showToast: false,
    toastMessage: "",
  });
  const changeToast = (message) => {
    toastData.showToast = true;
    toastData.toastMessage = message;
    setTimeout(() => {
      toastData.showToast = false;
    }, 3000);
  };
  return { toastData, changeToast };
};
</script>

<style lang="scss" scoped>
.toast {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 0.1rem;
  background-color: rgba(0, 0, 0, 0.35);
  border-radius: 0.05rem;
  color: #fff;
}
</style>
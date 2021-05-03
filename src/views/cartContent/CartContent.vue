<template>
  <div class="wrapper">
    <div class="mask" v-if="Object.keys(allCartList)==0">
      <div class="toast">当前购物车为空</div>
    </div>
    <div class="toppart">
      <h4>我的购物车</h4>
    </div>
    <div class="scroll">
      <template
        class="border"
        v-for="(item, index) in allCartList"
        :key="index"
      >
        <div class="shopCart">
          <h4 class="shopName">{{ item.shopName }}</h4>

          <template
            class="product"
            v-for="(it, i) in item.productList"
            :key="i"
          >
            <div class="product__item" v-if="it.count > 0">
              <img :src="it.imgUrl" class="product__item__img" />
              <div class="product__item__desc">
                <h3 class="product__item__title">{{ it.name }}</h3>
                <div class="product__item__price">
                  <span class="newPrice"
                    >&yen;{{ it.price }} × {{ it.count }}</span
                  >
                  <span class="totalPrice"
                    >&yen;{{ (it.price * it.count).toFixed(2) }}</span
                  >
                </div>
              </div>
            </div>
          </template>
        </div>
      </template>
    </div>
  </div>
  <Docker :pageIndex="1" />
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import Docker from "../../components/Docker";

export default {
  name: "CartContent",
  components: { Docker },
  setup() {
    const store = useStore();
    const cartList = store.state.cartList;

    const allCartList = computed(() => {
      const myCartList = {};
      for (let shopId in cartList) {
        let totalCount = 0;
        const products = cartList[shopId].productList;
        for (let productId in products) {
          const product = products[productId];
          totalCount += product.count || 0;
        }
        if (totalCount > 0) {
          myCartList[shopId] = cartList[shopId];
        }
      }
      //console.log(myCartList.length)
      return myCartList;
    });

    return { allCartList };
  },
};
</script>


<style lang="scss" scoped>
@import "../../style/mixins.scss";
* {
  margin: 0;
  padding: 0;
}
.wrapper {
  background-color: #f5f5f5;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0.5rem;
}
.mask{
   position: absolute;
     top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background-color: rgba(0,0,0,0.5);
    z-index: 3;
}
.toast{
  height: 1.2rem;
  width: 2.5rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%) ;
  background-color: #fff;
  text-align: center;
  font-size: 0.16rem;
  color: #333333;
  line-height: 1.2rem;
}
.toppart {
  height: 0.44rem;
  font-size: 0.16rem;
  color: #333333;
  text-align: center;
  line-height: 0.44rem;
  background: #ffffff;
  z-index: 2;
}
.scroll {
  overflow-y: scroll;
  position: absolute;
  top: 0.5rem;
  bottom: 0;
  left: 0;
  right: 0;
}
.shopCart {
  font-size: 0.16rem;
  margin: 0.16rem 0.18rem;
  background-color: #ffffff;
  box-sizing: border-box;

  box-sizing: border-box;
  .shopName {
    text-align: center;
    padding: 0.16rem;
    font-size: 0.16rem;
    color: #333333;
  }
}
.product__item {
  display: flex;
  padding: 0 0.16rem 0.16rem 0.16rem;
}
.product__item__img {
  width: 0.46rem;
  height: 0.46rem;
  padding-right: 0.16rem;
}
.product__item__desc {
  .product__item__title {
    @include ellipse;
    line-height: 0.2rem;
    margin: 0;
    font-size: 14px;
    color: #333333;
  }
}
.product__item__price {
  display: flex;
  margin-top: 0.06rem;
  .newPrice {
    font-size: 0.14rem;
    color: #e93b3b;
    //line-height: 0.2rem;
    padding-right: 0.06rem;
  }
  .totalPrice {
    font-size: 0.14rem;
    line-height: 0.2rem;
    padding-right: 0.06rem;
    position: absolute;
    right: 0.16rem;
  }
}
</style>
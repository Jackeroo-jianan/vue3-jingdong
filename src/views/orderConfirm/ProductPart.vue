<template>
  <div class="products">
    <h4 class="shopName">{{ shopName }}</h4>
    <div class="product" v-for="item in productList" :key="item.id">
      <template v-if="item.count > 0">
        <img :src="item.imgUrl" class="product__item__img" />
        <div class="product__item__desc">
          <h3 class="product__item__title">{{ item.name }}</h3>
          <div class="product__item__price">
            <span class="newPrice"
              >&yen;{{ item.price }} × {{ item.count }}</span
            >
            <span class="totalPrice"
              >&yen;{{ (item.price * item.count).toFixed(2) }}</span
            >
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { useRoute } from 'vue-router'
import { commonCartMoudle } from "../../commonMoudel/commonCartMoudle";

export default {
  name: "ProductPart",
 
  setup(){
      const route = useRoute()
      const shopId = route.params.id
      const { productList ,shopName,getPrice } = commonCartMoudle(shopId)
      return  { productList, shopId ,shopName,getPrice }
  }
};
</script>

<style lang="scss" scoped>
@import '../../style/mixins.scss';
.products {
  width: 3.4rem;
  margin: 0.16rem 0.18rem;
  background-color: #ffffff;
  border-radius: 0.04rem;
  overflow: scroll;
  position: absolute;
  bottom: 0;
  top: 2rem;
}
.shopName {
  font-size: 0.16rem;
  color: #333333;
  padding: 0.16rem 0 0.16rem 0.16rem;
}
.product {
  overflow-y: scroll;
  display: flex;
  position: relative;
  padding: 0 0.16rem 0.16rem 0.16rem;
  .product__item__img {
    width: 0.46rem;
    height: 0.46rem;
    padding-right: 0.16rem;
  }
}
.product__item__desc {
  overflow: hidden;
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
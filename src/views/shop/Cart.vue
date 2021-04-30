<template>
<div class="mask" v-if='showCart' @click="changeShowCart"></div>
  <div class="cart">
    <div class="product" v-if='showCart '>
      <div class="product__header">
          <div class="product__header__all">
            <span class='iconfont selectall'
            v-html="allChecked ? '&#xe652;':'&#xe66c;'"
            @click="()=>setAllSelected(shopId)"
            ></span>
             全选
          </div>
          <div class="product__header__clear"
          @click="()=>cleanProductList(shopId)">
          清空购物车
          </div>
      </div>
      <template v-for="item in productList" :key="item._id">
        <div class="product__item" v-if="item.count > 0">
          <div
            class="product__item_ischecked iconfont"
            v-html="item.check ? '&#xe652;' : '&#xe66c;'"
            @click="() => changeProductCheck(shopId, item._id)"
          />

          <img :src="item.imgUrl" class="product__item__img" />
          <div class="product__item__desc">
            <h3 class="product__item__title">{{ item.name }}</h3>
            <div class="product__item__price">
              <span class="newPrice">￥{{ item.price }}</span>
              <span class="origanPrice">￥{{ item.oldprice }}</span>
            </div>
          </div>
          <div class="shopNums">
            <span
              class="decrease"
              @click="
                () => {
                  changeItemToCart(shopId, item._id, item, -1);
                }
              "
              >-</span
            >
            <span class="nums">
              {{ item.count || 0 }}
            </span>
            <span
              class="increase"
              @click="
                () => {
                  changeItemToCart(shopId, item._id, item, 1);
                }
              "
              >+</span
            >
          </div>
        </div>
      </template>
    </div>

    <div class="cart__check">
      <div class="cart__check__icon">
        <img
          src="http://www.dell-lee.com/imgs/vue3/basket.png"
          class="icon__cart"
          @click="changeShowCart"
        />
        <div class="icon__cart__num">{{ total }}</div>
      </div>

      <div class="cart__info">
        总计: &nbsp;<span class="cart__cost">&yen; {{ getPrice }}</span>
      </div>
      <div class="cart__balance">
        <router-link :to ="{path:`/orderConfirm/${shopId}`}" >
        去结算
        </router-link>
        </div>
    </div>
  </div>
</template>

<script>
import { computed,ref } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { commonCartMoudle } from "../../commonMoudel/commonCartMoudle";

//购物车组件
const useCartMoudle = (shopId) => {
  const store = useStore();
  const cartList = store.state.cartList;
  const total = computed(() => {
    const productList = cartList[shopId]?.productList;
    let count = 0;
    if (productList) {
      for (const i in productList) {
        const product = productList[i];
        count += product.count;
      }
    }
    return count;
  });

  const allChecked = computed(() => {
    const productList = cartList[shopId]?.productList;
    let result = true;
    if (productList) {
      for (const i in productList) {
        const product = productList[i];
        if (product.count>0 && !product.check) {
          result = false;
        }
      }
    }
    return result;
  });

  const productList = computed(() => {
    const productList = cartList[shopId]?.productList || [];
    return productList;
  });

  const changeProductCheck = (shopId, productId) => {
    store.commit("changeProductCheck", { shopId, productId });
  };

  const cleanProductList = (shopId)=>{
        store.commit('cleanProductList',{
          shopId
        })
  };

  const setAllSelected = (shopId)=>{
        store.commit('setAllSelected',{
          shopId
        })
  };

  return { total, productList, changeProductCheck,
  cleanProductList,allChecked,setAllSelected };
};

//展示已购组件
const showProductsInCart=()=>{
    const showCart = ref(false)
    const changeShowCart=()=>{
      showCart.value=!showCart.value
    }
    return { showCart, changeShowCart }
}

export default {
  name: "Cart",
  setup() {
    const route = useRoute();   
    const shopId = route.params.id;
    const { changeItemToCart,getPrice } = commonCartMoudle(shopId);
    const { showCart, changeShowCart } = showProductsInCart()
    const { total, productList, changeProductCheck,cleanProductList,allChecked,setAllSelected } = useCartMoudle(shopId);
    return {
      shopId,
      total,
      getPrice,
      productList,
      changeProductCheck,
      changeItemToCart,
      cleanProductList,
      allChecked,
      setAllSelected,
      showCart,
      changeShowCart
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../../style/mixins.scss";
*{
  padding: 0;
  margin: 0;
}
a{
  text-decoration: none;
  color: #fff;
}
.mask{
  position: fixed;
  bottom: 0;
  top:0;
  left: 0;
  right: 0;
  background-color: rgba(0,0,0,0.50);
  z-index: 1;

}

.cart {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  z-index: 2;
}
.product {
  overflow-y: scroll;
  box-sizing: border-box;
  background-color: #fff;
}
.product__header{
  height: 0.52rem;
  border-bottom: 0.01rem solid #F1F1F1;
  display: flex;
  .product__header__all{
    display: flex;
      width: 75%;
      font-size:0.14rem;
      color: #333333;
      line-height: 0.52rem;

      .selectall{
        line-height: 0.5rem;
        font-size: 0.2rem;
        color: #0091FF;
        margin: 0 0.08rem 0 0.18rem;
      }
  }
  .product__header__clear{
      text-align: right;
      font-size: 0.14rem;
      line-height: 0.46rem;
      color: #333333;
      margin-right: 0.18rem;
   }
}
.product__item {
  overflow-y: scroll;
  display: flex;
  position: relative;
  margin: 0.16rem 0;
  .product__item__img {
    width: 0.46rem;
    height: 0.46rem;
    padding-right: 0.16rem;
  }
}
.product__item_ischecked {
  font-size: 0.2rem;
  line-height: 0.5rem;
  margin: 0 0.16rem 0 0.18rem;
  color: #0091ff;
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
  .product__item__sales {
    font-size: 12px;
    color: #333333;
    line-height: 16px;
    margin: 0.06rem 0;
  }
}
.product__item__price {
  display: flex;
  margin: 0.06rem 0 0 0;
  .newPrice {
    font-size: 0.14rem;
    color: #e93b3b;
    line-height: 0.2rem;
    padding-right: 0.06rem;
  }
  .origanPrice {
    font-size: 0.1rem;
    color: #999999;
    line-height: 0.2rem;
    text-decoration: line-through;
  }
}
.shopNums {
  position: absolute;
  bottom: 0.12rem;
  right: 0;
  font-size: 0.14rem;
  line-height: 0.14rem;
  margin-right: 0.18rem;
  .increase,
  .decrease {
    display: inline-block;
    width: 0.2rem;
    height: 0.2rem;
    line-height: 0.16rem;
    border-radius: 50%;
    font-size: 0.2rem;
    text-align: center;
  }
  .decrease {
    border: 0.01rem solid #666;
    box-sizing: border-box;
  }
  .increase {
    background-color: #0091ff;
    border: 0.01rem solid #0091ff;
    box-sizing: border-box;
    color: white;
  }
  .nums {
    padding: 0 0.05rem;
  }
}

.cart__check {
  display: flex;
  height: 0.49rem;
  border-top: 0.01rem solid #f1f1f1;
  .cart__check__icon {
    position: relative;
    width: 0.86rem;
    .icon__cart {
      display: block;
      width: 0.28rem;
      height: 0.26rem;
      margin: 0.12rem auto;
    }
    .icon__cart__num {
      position: absolute;
      width: 0.2rem;
      height: 0.2rem;
      background-color: #e93b3b;
      border-radius: 50%;
      font-size: 0.12rem;
      text-align: center;
      line-height: 0.2rem;
      bottom: 0.3rem;
      right: 0.2rem;
      color: #ffffff;
      transform: scale(0.5);
    }
  }
}
.cart__info {
  line-height: 0.5rem;
  width: 70%;
  flex: 1;
  .cart__cost {
    font-size: 18px;
    color: #e93b3b;
  }
}
.cart__balance {
  height: 0.5rem;
  background: #4fb0f9;
  width: 30%;
  line-height: 0.49rem;
  text-align: center;
  font-size: 14px;
  color: #ffffff;
}
</style>
import { useStore } from 'vuex'
import { computed } from 'vue'

//购物车相关内容
export const commonCartMoudle = (shopId)=>{
    const store = useStore()
    const cartList = store.state.cartList
    const changeItemToCart = (shopId,productId,productInfo,num)=>{
        store.commit('changeItemToCart',{
            shopId,productId,productInfo,num
        })
    }

    const productList = computed(() => {
        const productList = cartList[shopId]?.productList || [];
        return productList;
      });

    const shopName = computed(() => {
        const shopName = cartList[shopId]?.shopName || [];
        return shopName;
      });

    const getPrice = computed(() => {
        const productList = cartList[shopId]?.productList;
        let count = 0;
        if (productList) {
          for (const i in productList) {
            const product = productList[i];
            if (product.check) {
              count += product.count * product.price;
            }
          }
        }
        return count.toFixed(2);
      });
    
    return { cartList,shopName,changeItemToCart,productList,getPrice }
}


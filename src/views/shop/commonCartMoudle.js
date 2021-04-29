import { useStore } from 'vuex'

//购物车相关内容
export const commonCartMoudle = ()=>{
    const store = useStore()
    const cartList = store.state.cartList
    const changeItemToCart = (shopId,productId,productInfo,num)=>{
        store.commit('changeItemToCart',{
            shopId,productId,productInfo,num
        })
    }
    
    return { cartList,changeItemToCart }
}
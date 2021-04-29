import { createStore } from 'vuex'

export default createStore({
  state: {
    
    cartList:{
      /*
      
       shopId:{
            shopName:'xxx'
            productList{
                productId:{
                    _id: '1',
                    name: '番茄250g/份',
                    sales: 10,
                    price:33.6,
                    oldprice: 39.6,
                    count:1
                  }
            }
            
        */
      }
  },
  mutations: {
    changeItemToCart(state,payload){
      const { shopId,productId,productInfo
       }=payload;
       
      let shopInfo = state.cartList[shopId]
      if(!shopInfo) { shopInfo= {} }

      let product = shopInfo[productId]
      if(!product) {
        product = productInfo
        product.count = 0  
      }

      product.count = product.count + payload.num
      if (payload.num > 0){product.check = true}
      if (product.count<0){product.count=0}
      shopInfo[productId] = product
      state.cartList[shopId] = shopInfo
      console.log(shopInfo)  
    },

    changeProductCheck(state,payload){
      const { shopId,productId } = payload
      const product = state.cartList[shopId][productId]
      product.check = !product.check
    },

    cleanProductList(state,payload){
      const { shopId } =payload
      state.cartList[shopId]={}
    },

    setAllSelected(state,payload){
      const{ shopId } = payload
      const products = state.cartList[shopId]
      if(products){
        for (const key in products){
          const product = products[key]
          product.check = true
        }
      }


    }

  },
  actions: {
  },
  modules: {
  }
})

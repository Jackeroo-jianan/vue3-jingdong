import Vuex from 'vuex'

const setLocalCartList = (state) => {
  const { cartList } = state
  const cartListString = JSON.stringify(cartList)
  localStorage.cartList = cartListString
}

const getLocalCartList = () => {
  try {
    return JSON.parse(localStorage.cartList) 
  } catch(e){
    return {}
  }
}

export default Vuex.createStore({
  state: {
    
    cartList:getLocalCartList()
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
      
  },
  mutations: {
    changeItemToCart(state,payload){
      const { shopId,productId,productInfo }=payload;
      const shopInfo = state.cartList[shopId] || {
        shopName:'',productList: {}
      }
      //if(!shopInfo) { shopInfo= {} }

      let product = shopInfo.productList[productId]
      if(!product) {
        productInfo.count = 0 
        product = productInfo    
      }

      product.count = product.count + payload.num
      if (payload.num > 0){product.check = true}
      if (product.count<0){product.count=0}
      shopInfo.productList[productId] = product
      state.cartList[shopId] = shopInfo
      setLocalCartList(state)
    },

    changeShopName(state,payload){
        const { shopId,shopName } = payload
        const shopInfo = state.cartList[shopId] || {
          shopName:'',productList:{}
        }
        shopInfo.shopName = shopName
        state.cartList[shopId] = shopInfo
        setLocalCartList(state)
    },

    changeProductCheck(state,payload){
      const { shopId,productId } = payload
      const product = state.cartList[shopId].productList[productId]
      product.check = !product.check
      setLocalCartList(state)
    },

    cleanProductList(state,payload){
      const { shopId } =payload
      state.cartList[shopId].productList={}
      setLocalCartList(state)
    },


    setAllSelected(state,payload){
      const{ shopId } = payload
      const products = state.cartList[shopId].productList
      if(products){
        for (const key in products){
          const product = products[key]
          product.check = true
        }
      }
      setLocalCartList(state)
    },

    cleanThisCart(state,payload){
      const { shopId } = payload
      state.cartList[shopId].productList = {} 
    }

  },
  actions: {
  },
  modules: {
  }
})

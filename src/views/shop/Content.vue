<template>
    <div class="content">
        <div class="content__category" >
            <div class="content__category__item" 
             v-for ='item in categories'
            :key="item.name"
            @click='()=>handleCategoryClick(item.tab)'>
            {{item.name}}</div>
        </div>
        <div class="product">
            <div class="product__item"
             v-for="item in contentList"
             :key='item.id'>
                <img :src='item.imgUrl' class="product__item__img">
                <div class="product__item__desc">
                    <h3 class="product__item__title">{{item.name}}</h3>
                    <p class="product__item__sales">月售{{item.sales}}件</p>
                    <div class="product__item__price">
                        <span class='newPrice'>￥{{item.price}}</span>
                        <span class='origanPrice'>￥{{item.oldprice}}</span>    
                    </div>
                </div>
                <div class='shopNums'>
                    <span class='decrease'
                     @click="() => { changeCartItem(shopId, item._id, item, -1,shopName) }"
                     >-</span>   
                    <span class='nums'>{{ getCartProductCount(shopId,item._id) }}</span>
                    <span class='increase'
                    @click="() => { changeCartItem(shopId, item._id, item, 1,shopName) }"
                    >+</span> 
                </div>
            </div>
        </div>
    </div>
    
</template>

<script>
import { useRoute } from 'vue-router'
import { reactive ,toRefs } from 'vue'
import { useStore } from 'vuex'
import { get } from '../../utils/request'
import { commonCartMoudle } from "../../commonMoudel/commonCartMoudle";

const categories = [
           { name:'全部商品', tab:'all' },
           { name:'限时折扣', tab:'seckill' },
        ]
//列表相关的模块
const useListMouele=(shopId)=>{
    
    const data = reactive({ contentList:[] })
    const getContentData = async(tab)=>{
            const result = await get(`/api/shop/${shopId}/products`,{ tab })
            if (result?.data?.errno===0){
                data.contentList=result.data.data
            }
        }
        const handleCategoryClick=(tab)=>{
        getContentData(tab)
        }
        getContentData()
        const { contentList } = toRefs(data)
        return { contentList,categories,handleCategoryClick }
}

//购物车组件
const useCartMoudle = ()=>{
        const store = useStore()
        const { changeItemToCart,cartList } = commonCartMoudle()
        const changeShopName = (shopId,shopName)=>{
            store.commit('changeShopName',{
                shopId,shopName
            })
        }        
        const changeCartItem = (shopId, productId, item,num,shopName)=>{
                changeItemToCart(shopId, productId, item,num)
                changeShopName(shopId,shopName)       
        }
        const getCartProductCount = (shopId,productId)=>{
            return cartList?.[shopId]?.productList?.[productId]?.count || 0

        }

        return { changeShopName,changeCartItem,cartList,getCartProductCount }
}


export default {
    name:'Content',
    props:['shopName'],
    setup(){
        const route = useRoute()
        const shopId = route.params.id
        
        const { contentList,categories,handleCategoryClick }=useListMouele(shopId)
        const { changeShopName,changeCartItem,cartList,getCartProductCount  } = useCartMoudle()
    
        return{ contentList,categories,handleCategoryClick,
         shopId,changeShopName,cartList,changeCartItem,getCartProductCount }
    }
}
</script>

<style lang="scss" scoped>
@import '../../style/mixins.scss';
*{
    margin: 0;
    padding: 0;
}
.content{
    display: flex;
    position: absolute;
    top:1.5rem;
    right:0;
    left:0;
    bottom: 0.5rem;
}
.content__category{
    overflow-y: scroll;
    height: 100%;
    width:0.76rem;
    background-color:#F5F5F5 ;
    .content__category__item{
        height: 0.4rem;
        font-size: 0.14rem;
        color: #333333;
        font-family: arial;
        line-height: 0.4rem;
        text-align: center;
    };
    .content__category__item:hover{
        background-color:#FFFFFF;
    }
}
.product{
    flex:1;
    overflow-y: scroll;
}
.product__item{
    overflow-y: scroll;
    display: flex;
    position: relative;
    margin: 0 0.16rem 0.16rem 0.16rem;
    padding-bottom: 0.12rem;
    border-bottom: 0.01rem solid #F1F1F1;;
    .product__item__img{
        width: 0.68rem;
        height: 0.68rem;
        padding-right: 0.16rem;
    }
}
.product__item__desc{
   overflow: hidden;
    .product__item__title{
        @include ellipse;
        line-height: 0.2rem;
        margin: 0;
        font-size: 14px;
        color: #333333;
    }
    .product__item__sales{
        font-size: 12px;
        color: #333333;
        line-height: 16px;
        margin: 0.06rem 0;
    }
}
.product__item__price{
    display: flex;
    .newPrice{
        font-size: 0.14rem;
        color: #E93B3B;
        line-height: 0.2rem;
        padding-right: 0.06rem
    };
    .origanPrice{
        font-size: 0.1rem;
        color: #999999;
        line-height: 0.2rem;
        text-decoration: line-through;
    }
}
.shopNums{
    position: absolute;
    bottom:0.12rem;
    right:0;
    font-size: 0.14rem;
    line-height: 0.14rem;
    .increase,.decrease{
        display: inline-block;
        width: 0.2rem;
        height: 0.2rem;
        line-height: 0.16rem;
        border-radius: 50%;
        font-size: 0.2rem;
        text-align: center;    
    }
    .decrease{
        border: 0.01rem solid #666;
        box-sizing: border-box;
    }
    .increase{
        background-color: #0091FF;
        border: 0.01rem solid  #0091FF;
        box-sizing: border-box;
        color: white;
    }
    .nums{
        padding: 0 0.05rem;
    }
}

</style>
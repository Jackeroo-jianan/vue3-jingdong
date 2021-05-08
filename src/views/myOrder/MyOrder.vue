<template>
<div class="wrapper">
    <h4 class="title">我的订单</h4>
<div class="orders">
    <div class="order"
    v-for ='(item,index) in list'
    :key ='index'>
        <div class="order__title">
            <span class="shopName">{{item.shopName}}</span>
            <span class='cancle'>{{item.isCanceled?'已取消':'已支付'}}</span>
        </div>
        <div class="order__content">
            <div class="order__content__imgs"
            v-for="(it,id) in item.products"
            :key="id">
                <img class='pic' :src="it.product.img" />
            </div>
            <div class="order__content__desc">
                    <div class="cost">&yen;{{item.totalPrice}}</div>
                    <div class="num">共{{item.totalCount}}件</div>
            </div>
        </div>
    </div>
</div>
</div>
    <Docker :pageIndex='2'/>
</template>

<script>
import { reactive, toRefs } from 'vue'
import { get } from '../../utils/request'
import Docker from '../../components/Docker'

const useOrderListMoudle = ()=>{
    const data = reactive({ list:[] })
    const getBoughtList = async()=>{
        const result = await get('/api/order/review')
        if (result?.data?.errno === 0 && result?.data?.data?.length){
            const orderList = result.data.data
            //console.log(orderList)
            orderList.forEach((orderFactor) => {
                const products = orderFactor.products
                let totalPrice = 0
                let totalCount = 0
                products.forEach((productsItem)=>{
                    totalPrice += (productsItem?.orderSales * productsItem?.product.price) || 0
                    totalCount += Number(productsItem.orderSales)
                })
               orderFactor.totalPrice = totalPrice
               orderFactor.totalCount = totalCount
            });
            data.list = result.data.data
            //console.log(data.list)
        }
        
        
    }
    getBoughtList()
    const { list } = toRefs(data)
    return { list }
}

export default {
  components: { Docker },
    name:'MyOrder',
    
    setup(){
        const { list } =useOrderListMoudle()
        //console.log(list)
        return { list }
    }
}
</script>

<style lang="scss" scoped>
*{
    margin: 0;
    padding: 0;
}
.wrapper{
  overflow-y:auto;
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
  bottom:.49rem;
  right: 0;
  background-color: #F5F5F5;
}
.title{
    height: 0.44rem;
    font-size: 0.16rem;
    color: #333333;
    text-align: center;
    line-height: 0.44rem;
    background: #FFFFFF
}
.order{
    padding:0.16rem ;
    margin: 0.16rem 0.18rem;
    background-color: #FFFFFF;
}
.order__title{
    .shopName{
        font-size: 0.16rem;
        color: #333333;
    }
    .cancle{
        font-size: 0.14rem;
        color: #999999;
        float: right;
    }
}
.order__content{
    display: flex;
    margin-top: 0.16rem;
    position: relative;
    .order__content__imgs{
        
        display: flex;
        .pic{
            width: 0.4rem;
            height: 0.4rem;
            margin-right:0.12rem ;
        }
    }
}
.order__content__desc{
    line-height:0.2rem ;
    position: absolute;
    right: 0;
    .cost{
        font-size: 0.14rem;
        color: #E93B3B;
        margin-bottom:0.04rem 
    };
    .num{
        font-size: 0.12rem;
        color: #333333;
        text-align: right;
        line-height: 0.14rem;
    }
}
</style>
<template>
<div class="wrapper">
    <div class="search">
        <div class="search__back iconfont" @click='handleBack'>&#xe697;</div>
        <div class="search__content">
            <span class='search__content__icon iconfont'>&#xe60b;</span>
            <input type="text" class='search__content__input' style="border:none;outline:none"
            placeholder="请输入商品名称">
        </div>
    </div>
    <ShopInfo :item='item' :hideBorder='true' v-show='item.imgUrl'/>
    <!-- 属性传给子组件  隐藏分界线  防止出现裂图效果 -->
    <Content :shopName="item.name"/>
    <Cart/>
</div>

</template>


<script>
import { reactive, toRefs } from 'vue' 
import { useRouter, useRoute } from 'vue-router'
import { get } from '../../utils/request'
import ShopInfo from '../../components/Shopinfo'
import Content from './Content'
import Cart from './Cart'

//使用shopinfo的部分
const useShopInfoMoudle=()=>{
    const route =useRoute()
    const data = reactive({ item:{} })
    const getItemData = async()=>{
        const result = await get(`/api/shop/${route.params.id}`)
        //console.log(route.params)
        if(result?.data?.errno === 0){
            data.item=result.data.data[route.params.id-1]
        }
    }
    const { item } = toRefs(data)
    getItemData()
    return { item ,getItemData }
    }

//返回键部分
const backMoudel = ()=>{
    const router =useRouter()
    const handleBack=()=>{
            router.push({ name: "Home" });
        }
        return { handleBack }
}

export default {
    name:'Shop',
    components:{ ShopInfo , Content, Cart },
    setup(){
    
    const { item }=useShopInfoMoudle()
    const { handleBack }=backMoudel()
        return { item , handleBack }
    }
}
</script>

<style lang="scss" scoped>
*{
    padding: 0;
    margin: 0;
}
.wrapper{
    padding: 0 0.18rem;
}
.search{
    margin: 0.16rem 0;
    display: flex;
    line-height: 0.32rem;
    .search__back{
        width: 0.3rem;
        line-height: 0.32rem;
        font-size: 0.25rem;
        color: #B6B6B6 ;
        padding: 0 .05rem 0 0;
        
    }
    .search__content{
        width: 100%;
        border-radius: 0.16rem;
        background-color: #F5F5F5;
        box-sizing: border-box;
        line-height: 0.32rem;
        .search__content__icon{
            padding: 0 0.1rem;
        }
        .search__content__input{
            width: 80%;
            height: 0.2rem;
            background-color:#F5F5F5 ;
            font-size: 0.14rem;
            color: #333333;  
                   
        }
    }
}
</style>
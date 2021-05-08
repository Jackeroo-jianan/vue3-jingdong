<template>
<div class="wrapper">
  <TopPart/>
  <ProductPart/>
</div>
  <OrderPart/>
</template>

<script>

import TopPart from './TopPart'
import ProductPart from './ProductPart'
import OrderPart from './OrderPart'
import { AddressListMoudle } from '../../commonMoudel/commonAddressMoudle'

export default {
  name: "OrderConfirm",
   components:{ TopPart,ProductPart,OrderPart },
   setup(){
     const { getExistAddressList } = AddressListMoudle()
      getExistAddressList()
   }
};
</script>

<style lang="scss" scoped>
@import '../../style/mixins.scss';
* {
  margin: 0;
  padding: 0;
}
.wrapper{
    background-color:#F5F5F5 ;
    position: absolute;
    top:0;
    right: 0;
    left: 0;
    bottom: 0.5rem;
}



</style>
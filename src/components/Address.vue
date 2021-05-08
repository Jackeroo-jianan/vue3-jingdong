<template>
  <div class="address">
      
      <div class="address__person">
        <div class="address__person__name">{{ address.name }}</div>
        <div class="address__person__phone">{{ address.phone }}</div>
      </div>
      <div class="address__info">
        {{address.city}} {{address.area}} {{address.houseNumber}}
      </div>
      
      <router-link :to="{path:`/editAddress/${address._id}`}">
      <div class="iconfont to">&#xe60c;</div>
      </router-link>
      
    </div>
</template>

<script>

export default {
  name: 'Address',
  props: ['address'],
  
}
</script>

<style lang="scss" scoped>
.address {
  margin: 0 0.18rem 0.16rem 0.18rem;
  background-color: #fff;
  height: 1.04rem;
  padding: 0.18rem 0.16rem;
  box-sizing: border-box;
  position: relative;
}
.address__person {
  display: flex;
  color: #999999;
  margin-bottom: 0.08rem;
  .address__person__name {
    flex: 0 0 1.2rem;
    font-size: 0.16rem;
  }
  .address__person__phone {
    flex: 1;
    font-size: 0.14rem;
  }
}
.address__info {
  font-size: 0.14rem;
  color: #333333;
  width: 90%;
  line-height: 0.2rem;
}
.to {
  position: absolute;
  right: 0.2rem;
  top: 50%;
}

</style>
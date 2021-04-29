<template>
  <div class='wrapper'>
      <StaticPart/>
        <Nearby/>
  </div>
   <Docker/>
</template>
<script>
import StaticPart from './staticPart'
import Nearby from './Nearby'
import Docker from './docker'
export default {
  name: 'Home',
  components: { StaticPart, Nearby, Docker }

}
</script>
<style lang="scss" scoped>

.wrapper{
  overflow-y:auto;
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
  bottom:.49rem;
  right: 0;
  padding: 0 .18rem;}

</style>

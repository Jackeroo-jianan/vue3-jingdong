<template>
  <MyTopPart/>
  <MyData/>
  <Docker :pageIndex="3" />
</template>

<script>

import Docker from "../../components/Docker";
import MyTopPart from "./MyTopPart"
import MyData from "./MyData"

export default {
  name: "Myself",
  components: { Docker,MyTopPart ,MyData },
  setup() {
  },
};
</script>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
}
</style>
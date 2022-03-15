<template >
  <div>
    <common_group :lnk_type="lnk_type"></common_group>
  </div>
</template >

<script >
import common_group from "./common_group";

export default {
  name: "life",
  components: { common_group },
  data(){
    return{
      lnk_type:"life",
    }
  },
}
</script >

<style scoped >

</style >
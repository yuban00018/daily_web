<template >
  <v-container>
    <common_group :lnk_type="lnk_type"></common_group>
  </v-container>
</template >

<script >
import common_group from "../common_group";

export default {
  name: "careful",
  components: { common_group },
  data(){
    return{
      lnk_type:"careful",
    }
  },
}
</script >

<style scoped >

</style >